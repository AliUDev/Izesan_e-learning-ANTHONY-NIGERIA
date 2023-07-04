import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PaystackButton } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api, paystackPublicKey } from '../../../url';

const Paystack = ({
  setPaymentPopup,
  reqBodyFromSlots,
  userIds,
  selectedSession,
  ts_ids,
  kobooValue,
  bookingId,
  type,
  getBookings,
  setRefundPopup
}) => {
  //console.log('kobooValue' + kobooValue);
  const [err, setErr] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(bookingId);
  const navigate = useNavigate();
  const is_tuitor = JSON.parse(localStorage.getItem('all_data'))[0].tutor_st;

  useEffect(() => {
    console.log('Booking Type' + type);
    if (type != 'paying' && type != 'reschadule' && type != 'refund') {
      //  onlyBooking();
    }
  }, []);

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    submitHandler();
    // if (type == 'refund') {
    //   submitHandler();
    // } else {
    //   submitHandler();
    // axios
    //   .post(`${api}MembersPayment`, {
    //     learner_id: localStorage.getItem('email_id'),
    //     booking_id: currentBookingId,
    //     nonce: 'nil',
    //     amount:
    //       kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price * 360,
    //     booking_type: packageHandle(),
    //     payment_method: 'paystack',
    //     complete_st: '1'
    //   })
    //   .then((res) => {
    //     if (res.data.status == 'success') {
    //       setPaymentPopup(false);
    //       setisLoader(false);
    //       if (getBookings) {
    //         getBookings();
    //       }
    //       if (is_tuitor == 0) {
    //         navigate('/user-booking');
    //       } else {
    //         navigate('/booking');
    //       }
    //     }
    //   })
    //   .catch((err) => console.log(err));
    // }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

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

  const config = {
    reference: new Date().getTime().toString(),
    email: localStorage.getItem('email_id'),
    amount: getAmount(),
    publicKey: paystackPublicKey
  };

  const componentProps = {
    ...config,
    text: 'Pay with Paystack',
    className: 'payButton btn btn-succss',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction
  };

  function closePopup(e) {
    e.preventDefault();
    setPaymentPopup(false);
    if (is_tuitor == 0) {
      navigate('/user-booking');
    } else {
      navigate('/booking');
    }
  }
  function submitHandler() {
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
      nonce: 'nil',
      amount: getAmount(),
      booking_type: packageHandle(),
      payment_method: 'paystack',
      complete_st: kobooValue > 0 ? '0' : '1'
    };

    if (type == 'refund') {
      console.log('HHHER CONTROL');
      var abc = {
        email_id: localStorage.getItem('email_id'),
        bk_id: bookingId,
        nonce: 'nil',
        amount: getAmount(),
        payment_method: 'paystack',
        complete_st: kobooValue > 0 ? '0' : '1'
      };
      console.log('abc');
      console.log(abc);
      axios
        .post(`${api}PaymoreBooking`, {
          email_id: localStorage.getItem('email_id'),
          bk_id: bookingId,
          nonce: 'nil',
          amount: getAmount(),
          payment_method: 'paystack',
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
                    setPaymentPopup(false);
                    setRefundPopup(false);
                    setisLoader(false);
                    loadBookings();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setPaymentPopup(false);
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

                      setPaymentPopup(false);
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
                      setPaymentPopup(false);
                      setisLoader(false);
                      if (is_tuitor == 0) {
                        navigate('/user-booking');
                      } else {
                        navigate('/booking');
                      }
                    } else {
                      setPaymentPopup(false);
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
                setPaymentPopup(false);
                setisLoader(false);
                loadBookings();
              } else if (type == 'paying') {
                setPaymentPopup(false);
                setisLoader(false);
                loadBookings();
              } else {
                setPaymentPopup(false);
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
  }
  // function submitHandler() {
  //   setisLoader(true);
  //   if (type == 'paying') {
  //     axios
  //       .post(`${api}MembersPayment`, {
  //         learner_id: localStorage.getItem('email_id'),
  //         booking_id: bkId,
  //         nonce: 'nil',
  //         amount: reqBodyFromSlots.price * 360,
  //         booking_type: packageHandle(),
  //         payment_method: 'paystack',
  //         complete_st: '1'
  //       })
  //       .then((res) => {
  //         if (res.data.status == 'success') {
  //           setPaymentPopup(false);
  //           setisLoader(false);
  //           if (is_tuitor == 0) {
  //             navigate('/user-booking');
  //           } else {
  //             navigate('/booking');
  //           }
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (type == 'refund') {
  //     axios
  //       .post(`${api}PaymoreBooking`, {
  //         bk_id: bkId,
  //         nonce: 'nil',
  //         amount: reqBodyFromSlots.price * 360,
  //         email_id: localStorage.getItem('email_id'),
  //         payment_method: 'koobo',
  //         complete_st: '1'
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data.status == 'success') {
  //           setPaymentPopup(false);
  //           setRefundPopup(false);
  //           setisLoader(false);
  //           if (is_tuitor == 0) {
  //             navigate('/user-booking');
  //           } else {
  //             navigate('/booking');
  //           }
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     let paymentStatus = localStorage.getItem('payment_status');
  //     if (paymentStatus == 0) {
  //       onlyBooking();
  //     } else {
  //       bookingMembers();
  //     }
  //   }
  // }
  function packageHandle() {
    var pkg;
    if (reqBodyFromSlots.item == 'Private 1-on-1 class') {
      pkg = '1on1';
    } else if (reqBodyFromSlots.item == '5-hours Package') {
      pkg = '5hour';
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
      pkg = 'group';
    } else if (reqBodyFromSlots.item == '30 minute trial lesson') {
      pkg = 'trial';
    }
    return pkg;
  }

  function learnerId() {
    var Id;
    if (
      reqBodyFromSlots.item == 'Private 1-on-1 class' ||
      reqBodyFromSlots.item == '5-hours Package' ||
      reqBodyFromSlots.item == '30 minute trial lesson'
    ) {
      Id = localStorage.getItem('email_id');
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
      Id = localStorage.getItem('email_id') + ',' + userIds;
    }
    return Id;
  }
  function memberCount() {
    var count;
    if (
      reqBodyFromSlots.item == 'Private 1-on-1 class' ||
      reqBodyFromSlots.item == '5-hours Package' ||
      reqBodyFromSlots.item == '30 minute trial lesson'
    ) {
      count = '1';
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
      count = userIds.split(',').length;
    }
    return count;
  }
  function timeSpan() {
    var span;
    if (
      reqBodyFromSlots.item == 'Private 1-on-1 class' ||
      reqBodyFromSlots.item == '30 minute trial lesson' ||
      selectedSession == 'session'
    ) {
      span = '1';
    } else if (reqBodyFromSlots.item == '5-hours Package') {
      span = '5';
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class' && selectedSession == 'month') {
      span = '30';
    }
    return span;
  }
  function timeSlotId() {
    var ts_id;
    if (
      reqBodyFromSlots.item == 'Private 1-on-1 class' ||
      reqBodyFromSlots.item == '30 minute trial lesson' ||
      selectedSession == 'session'
    ) {
      ts_id = reqBodyFromSlots.ts_id;
    } else if (reqBodyFromSlots.item == '5-hours Package') {
      ts_id = ts_ids;
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class' && selectedSession == 'month') {
      ts_id = ts_ids;
    }
    return ts_id;
  }
  function bookingType() {
    var type;
    if (
      reqBodyFromSlots.item == 'Private 1-on-1 class' ||
      reqBodyFromSlots.item == '5-hours Package' ||
      reqBodyFromSlots.item == '30 minute trial lesson'
    ) {
      type = 'single';
    } else if (reqBodyFromSlots.item == 'One seat in a Group Class') {
      type = 'group';
    }
    return type;
  }
  // function reqBody() {
  //   var data = {
  //     timeslot_id: timeSlotId(),
  //     member_count: memberCount(), // 1
  //     timespan: timeSpan(), // 1
  //     perhead: kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price * 360, // rate$
  //     starting_date: reqBodyFromSlots.todayDate, //calender date
  //     tutor_id: reqBodyFromSlots.tutor_id, // tutor email
  //     booking_type: bookingType(), // single
  //     totalamount:
  //       kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price * 360, // rate $
  //     learner_id: learnerId(), // loign user email
  //     payment_method: 'nil', // nil
  //     package: packageHandle(), // 1on1  5hour group trial
  //     invited_by: localStorage.getItem('email_id'), // loign user email
  //     invited_by_name: JSON.parse(localStorage.getItem('all_data'))[0].name, // loign user name
  //     timestamp: new Date().toLocaleTimeString() // current time (format)
  //   };
  //   return data;
  // }

  // function onlyBooking() {
  //   let body = reqBody();
  //   axios
  //     .post(`${api}AddBookingMembers`, body)
  //     .then((res) => {
  //       if (res.data.status == 'success') {
  //         setCurrentBookingId(res.data.bk_id);
  //         let paymentStatus = localStorage.getItem('payment_status');
  //         if (type && type == 'reschadule' && paymentStatus == 0) {
  //           if (type == 'reschadule') {
  //             axios
  //               .get(`${api}BookingReschedule?bk_id=${bkId}`)
  //               .then((res) => {
  //                 console.log(res.data, 'BookingReschedule');
  //                 if (res.data.status == 'success') {
  //                   if (is_tuitor == 0) {
  //                     navigate('/user-booking');
  //                   } else {
  //                     navigate('/booking');
  //                   }
  //                 } else if (res.data.status == 'failed') {
  //                   alert(res.data.error);
  //                 }
  //               })
  //               .catch((err) => console.log(err));
  //           }
  //         }
  //       } else if (res.data.status == 'failed') {
  //         alert(res.data.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // function bookingMembers() {
  //   // setLearnersId(learnerId())
  //   let body = reqBody();
  //   axios
  //     .post(`${api}AddBookingMembers`, body)
  //     .then((res) => {
  //       if (res.data.status == 'success') {
  //         axios
  //           .post(`${api}MembersPayment`, {
  //             learner_id: localStorage.getItem('email_id'),
  //             booking_id: res.data.bk_id,
  //             nonce: 'nil',
  //             amount:
  //               kobooValue > 0 ? reqBodyFromSlots.price - kobooValue : reqBodyFromSlots.price * 360,
  //             booking_type: packageHandle(),
  //             payment_method: 'paystack',
  //             complete_st: '1'
  //           })
  //           .then((res) => {
  //             // console.log(res.data);
  //             if (res.data.status == 'success') {
  //               if (type == 'reschadule') {
  //                 axios
  //                   .get(`${api}BookingReschedule?bk_id=${bkId}`)
  //                   .then((res) => {
  //                     console.log(res.data, 'BookingReschedule');
  //                     if (res.data.status == 'success') {
  //                       setPaymentPopup(false);
  //                       setisLoader(false);
  //                       if (is_tuitor == 0) {
  //                         navigate('/user-booking');
  //                       } else {
  //                         navigate('/booking');
  //                       }
  //                     }
  //                   })
  //                   .catch((err) => console.log(err));
  //               } else {
  //                 setPaymentPopup(false);
  //                 setisLoader(false);
  //                 if (is_tuitor == 0) {
  //                   navigate('/user-booking');
  //                 } else {
  //                   navigate('/booking');
  //                 }
  //               }
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  return (
    <>
      <Modal.Body>
        {err ? (
          <div className="text-danger" style={{ padding: '10px' }}>
            {err}
          </div>
        ) : null}
        {currentBookingId &&
          bookingId != '' &&
          type != 'paying' &&
          type != 'refund' &&
          type != 'reschadule' && (
            <div className="alert alert-success" role="alert">
              Booking has been placed.
            </div>
          )}
        {type && type == 'reschadule'
          ? 'Please reschedule your slot.'
          : 'Place your booking with paystack'}
      </Modal.Body>
      <Modal.Footer>
        {type && type == 'reschadule' ? (
          ''
        ) : (
          <Button variant="warning" onClick={(e) => closePopup(e)}>
            Not Now
          </Button>
        )}

        {type && type == 'reschadule' ? (
          <Button variant="warning" onClick={(e) => submitHandler(e)}>
            Reschedule
          </Button>
        ) : (
          <PaystackDiv>
            <PaystackButton {...componentProps} />
          </PaystackDiv>
        )}
      </Modal.Footer>
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
    </>
  );
};

export default Paystack;

const PaystackDiv = styled.div`
  .payButton {
    color: 'white';
    background-color: #04aa6d !important;
    border-color: #04aa6d !important;
    padding: 5px;
    border-radius: 10px !important;
  }
`;
