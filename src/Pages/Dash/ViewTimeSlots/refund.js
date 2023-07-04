import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../../url';
import Koboos from './koboos';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Refund = ({ refundPopup, setRefundPopup, dataSendToRefund, getBookings }) => {
  const [isLoader2, setisLoader2] = useState(false);
  const [loginUserData, setLoginUserData] = useState(false);
  const [reqBodyAlertComponent, setreqBodyAlertComponent] = useState({});
  const [koboosPopup, setKoboosPopup] = useState(false);

  const navigate = useNavigate();
  const is_tuitor = JSON.parse(localStorage.getItem('all_data'))[0].tutor_st;

  useEffect(() => {
    loginUser();
  }, []);
  function loginUser() {
    axios
      .get(
        `${api}ViewUserProfile?email_id=${localStorage.getItem(
          'email_id'
        )}&profile_id=${localStorage.getItem('email_id')}`
      )
      .then((res) => {
        setLoginUserData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }

  function submitHandler(e, type) {
    e.preventDefault();
    // setisLoader2(true)
    let data = {
      email_id: localStorage.getItem('email_id'),
      koobo: dataSendToRefund.t_slot.lenght > 1 ? '10000' : '1000',
      bk_id: dataSendToRefund.bk_id,
      type: 'refunded'
    };
    switch (type) {
      case 'refund':
        axios
          .post(`${api}AddKooboTransactions`, data)
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 'success') {
              setisLoader2(false);
              setRefundPopup(false);
              if (getBookings) {
                getBookings();
              }
              if (is_tuitor == 0) {
                navigate('/user-booking');
              } else {
                navigate('/booking');
              }
            }
          })
          .catch((err) => console.log(err));
        break;
      case 'one':
        //setRefundPopup(false);
        //setRefundPopup(false);
        setKoboosPopup(true);
        setreqBodyAlertComponent({ price: 15 * 100 });
        break;
      default:
        break;
    }
  }
  return (
    <>
      {isLoader2 ? (
        <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
          <div className="loader-not-click"></div>
          <img src="assets/loader/loader.gif" alt="" className="loader loader-div" />
        </div>
      ) : null}
      <div className={refundPopup ? 'bg-blur' : ''}></div>
      <div style={{ padding: '10px' }}>
        <div>
          <button
            style={{ float: 'right' }}
            className="btn btn-primary mr-3 mt-3"
            onClick={(e) => submitHandler(e, 'refund')}>
            Refund
          </button>
          {dataSendToRefund.time_span == 1 ? (
            <button
              className="btn btn-success mt-3"
              style={{ float: 'right', marginRight: '10px' }}
              onClick={(e) => submitHandler(e, 'one')}>
              private one-on one
            </button>
          ) : null}
        </div>
      </div>

      <Koboos
        koboosPopup={koboosPopup}
        setKoboosPopup={setKoboosPopup}
        total_koobo={loginUserData.total_koobo}
        reqBodyFromSlots={reqBodyAlertComponent}
        bkId={dataSendToRefund.bk_id}
        getBookings={getBookings}
        type="refund"
        setRefundPopup={setRefundPopup}
      />

      {/*<Modal show={paymentPopup} onHide={paymentPopup}>*/}
      {/*  <Modal.Header>*/}
      {/*    <Modal.Title>Refund Booking</Modal.Title>*/}
      {/*  </Modal.Header>*/}

      {/*  <Paystack*/}
      {/*    setPaymentPopup={setPaymentPopup}*/}
      {/*    reqBodyFromSlots={reqBodyAlertComponent}*/}
      {/*    bkId={dataSendToRefund.bk_id}*/}
      {/*    type="refund"*/}
      {/*    setRefundPopup={setRefundPopup}*/}
      {/*  />*/}
      {/*</Modal>*/}
    </>
  );
};

export default Refund;
