import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../url';

export const Braintree = ({
  braintreePopup,
  setbraintreePopup,
  reqBodyFromSlots,
  bookingId,
  kobooValue,
  getBookings,
  type,
  setRefundPopup
}) => {
  const [instance, setInstance] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [err, setErr] = useState(false);
  const is_tuitor = JSON.parse(localStorage.getItem('all_data'))[0].tutor_st;
  const navigate = useNavigate();
  function getAmount() {
    var amount = kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price;
    return amount * 360;
    // return amount;
  }

  function loadBookings() {
    if (getBookings) {
      getBookings();
    }
    if (is_tuitor == 0) {
      navigate('/user-booking');
    } else {
      navigate('/booking');
    }
  }

  async function buy(e) {
    e.preventDefault();
    setisLoader(true);
    // Send the nonce to your server
    const { nonce } = await instance.requestPaymentMethod();
    console.log(nonce);
    if (nonce) {
      function packageHandle() {
        var pkg;
        if (
          reqBodyFromSlots.item == 'Private 1-on-1 class' ||
          reqBodyFromSlots.item == '5-hours Package' ||
          reqBodyFromSlots.item == '30 minute trial lesson'
        ) {
          pkg = 'single';
        } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
          pkg = 'group';
        }
        return pkg;
      }

      let body = {
        learner_id: localStorage.getItem('email_id'),
        booking_id: bookingId,
        nonce: nonce,
        amount: getAmount(),
        booking_type: packageHandle(),
        payment_method: 'braintree',
        complete_st: kobooValue > 0 ? '0' : '1'
      };

      if (type == 'refund') {
        console.log('HHHER CONTROL');
        var abc = {
          email_id: localStorage.getItem('email_id'),
          bk_id: bookingId,
          nonce: nonce,
          amount: getAmount(),
          payment_method: 'braintree',
          complete_st: kobooValue > 0 ? '0' : '1'
        };
        console.log('abc');
        console.log(abc);
        axios
          .post(`${api}PaymoreBooking`, {
            email_id: localStorage.getItem('email_id'),
            bk_id: bookingId,
            nonce: nonce,
            amount: getAmount(),
            payment_method: 'braintree',
            complete_st: kobooValue > 0 ? '0' : '1'
          })
          .then((res) => {
            console.log('HHerere IMM');
            // console.log(res.data);
            if (res.data.status == 'success') {
              if (kobooValue > 0) {
                axios
                  .post(`${api}PaymoreBooking`, {
                    email_id: localStorage.getItem('email_id'),
                    bk_id: bookingId,
                    nonce: 'nil',
                    amount: kobooValue,
                    payment_method: 'koobo',
                    complete_st: '1'
                  })
                  .then((res) => {
                    if (res.data.status == 'success') {
                      setbraintreePopup(false);
                      setRefundPopup(false);
                      setisLoader(false);
                      loadBookings();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                setbraintreePopup(false);
                setisLoader(false);
                loadBookings();
              }
            } else {
              setisLoader(false);
              setErr('request failed!!');
            }
          })
          .catch((err) => {
            console.log(err);
            if (err) {
              setErr('network error');
            }
          });
      } else {
        axios
          .post(`${api}MembersPayment`, body)
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == 'success') {
              if (kobooValue > 0) {
                axios
                  .post(`${api}MembersPayment`, {
                    learner_id: localStorage.getItem('email_id'),
                    booking_id: bookingId,
                    nonce: 'nil',
                    amount: kobooValue,
                    booking_type: packageHandle(),
                    payment_method: 'koobo',
                    complete_st: '1'
                  })
                  .then((res) => {
                    if (res.data.status == 'success') {
                      if (type == 'reschadule') {
                        if (getBookings) {
                          getBookings();
                        }
                        setbraintreePopup(false);
                        setisLoader(false);
                        if (is_tuitor == 0) {
                          navigate('/user-booking');
                        } else {
                          navigate('/booking');
                        }
                      } else if (type == 'paying') {
                        if (getBookings) {
                          getBookings();
                        }
                        setbraintreePopup(false);
                        setisLoader(false);
                        if (is_tuitor == 0) {
                          navigate('/user-booking');
                        } else {
                          navigate('/booking');
                        }
                      } else {
                        setbraintreePopup(false);
                        setisLoader(false);
                        if (is_tuitor == 0) {
                          navigate('/user-booking');
                        } else {
                          navigate('/booking');
                        }
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                if (type == 'reschadule') {
                  setbraintreePopup(false);
                  setisLoader(false);
                  loadBookings();
                } else if (type == 'paying') {
                  setbraintreePopup(false);
                  setisLoader(false);
                  loadBookings();
                } else {
                  setbraintreePopup(false);
                  setisLoader(false);
                  loadBookings();
                }
              }
            } else {
              setisLoader(false);
              setErr('request failed!!');
            }
          })
          .catch((err) => {
            console.log(err);
            if (err) {
              setErr('network error');
            }
          });
      }

      /*
      function packageHandle() {
        var pkg;
        if (
          reqBodyFromSlots.item == 'Private 1-on-1 class' ||
          reqBodyFromSlots.item == '5-hours Package' ||
          reqBodyFromSlots.item == '30 minute trial lesson'
        ) {
          pkg = 'single ';
        } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
          pkg = 'group';
        }
        return pkg;
      }
      let body = {
        learner_id: localStorage.getItem('email_id'),
        booking_id: bookingId,
        nonce: nonce,
        amount: kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price,
        booking_type: packageHandle(),
        payment_method: 'braintree',
        complete_st: kobooValue > 0 ? '0' : '1'
      };
      if (payStatus == 'refund') {
        await axios
          .post(`${api}/PaymoreBooking`, {
            email_id: localStorage.getItem('email_id'),
            bk_id: bookingId,
            nonce: nonce,
            amount: kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price,
            payment_method: 'braintree',
            complete_st: kobooValue > 0 ? '0' : '1'
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == 'success') {
              if (kobooValue > 0) {
                axios
                  .post(`${api}/PaymoreBooking`, {
                    email_id: localStorage.getItem('email_id'),
                    bk_id: bookingId,
                    nonce: 'nil',
                    amount: kobooValue,
                    payment_method: 'koobo',
                    complete_st: '1'
                  })
                  .then((res) => {
                    if (res.data.status == 'success') {
                      getBookings();
                      setbraintreePopup(false);
                      setisLoader(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                getBookings();
                setbraintreePopup(false);
                setisLoader(false);
              }
            } else {
              setisLoader(false);
              setErr('request failed!!');
            }
          })
          .catch((err) => {
            console.log(err);
            if (err) {
              setErr('network error');
            }
          });
      }
      else {
        await axios
          .post(`${api}/MembersPayment`, body)
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == 'success') {
              if (kobooValue > 0) {
                axios
                  .post(`${api}/MembersPayment`, {
                    learner_id: localStorage.getItem('email_id'),
                    booking_id: bookingId,
                    nonce: 'nil',
                    amount: kobooValue,
                    booking_type: packageHandle(),
                    payment_method: 'koobo',
                    complete_st: '1'
                  })
                  .then((res) => {
                    if (res.data.status == 'success') {
                      if (payStatus == 'reschadule') {
                        getBookings();
                        setbraintreePopup(false);
                        setisLoader(false);
                      } else if (payStatus == 'paying') {
                        getBookings();
                        setbraintreePopup(false);
                        setisLoader(false);
                      } else {
                        setbraintreePopup(false);
                        setisLoader(false);
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                if (payStatus == 'reschadule') {
                  getBookings();
                  setbraintreePopup(false);
                  setisLoader(false);
                } else if (payStatus == 'paying') {
                  getBookings();
                  setbraintreePopup(false);
                  setisLoader(false);
                } else {
                  setbraintreePopup(false);
                  setisLoader(false);
                }
              }
            } else {
              setisLoader(false);
              setErr('request failed!!');
            }
          })
          .catch((err) => {
            console.log(err);
            if (err) {
              setErr('network error');
            }
          });
      }

      */
    } else {
      setErr('payment not done!!');
    }
  }
  return (
    <div>
      <div className={braintreePopup ? 'bg-blur' : ''}></div>
      {err ? <div className="text-danger">{err}</div> : null}
      <div
        class={
          braintreePopup
            ? ' braninTree popup center braintreePopup active'
            : 'braninTree popup center braintreePopup'
        }
        style={{ height: '50%' }}>
        <div class="title">
          <DropIn
            options={{ authorization: localStorage.getItem('braintreeToken') }}
            onInstance={(instance) => setInstance(instance)}
          />
          <button className="btn btn-success" onClick={(e) => buy(e)}>
            Add Card
          </button>
        </div>
      </div>
      {isLoader ? (
        <div className="container">
          <div className="row">
            <div>
              <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
                <div className="loader-div">
                  <img src="assets/loader/loader.gif" alt="" className="loader" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
