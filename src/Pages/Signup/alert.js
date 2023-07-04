import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../../url';
import './alert.css';
import { Braintree } from './braintree';
export const Alert = ({
  bankAskPopup,
  setBankAskPopup,
  reqBodyFromSlots,
  userIds,
  selectedSession,
  ts_ids,
  koboos,
  bkId,
  getBookings,
  payStatus
}) => {
  const [braintreePopup, setbraintreePopup] = useState(false);
  const [koboosPopup, setKoboosPopup] = useState(false);
  const [loginUserData, setLoginUserData] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [kobooValue, setKobooValue] = useState('');
  const [learnersId, setLearnersId] = useState('');

  useEffect(() => {
    setToken();
    loginUser();
  }, []);
  async function setToken() {
    const response = await axios.post(`${api}/set_token`, {
      client_token: ''
    });
    // const clientToken = await response.json(); // If returned as JSON string
    if (response.data.status == 'success') {
      // console.log(response.data.client_token, "jhkjjh");
      localStorage.setItem('braintreeToken', response.data.client_token);
    }
  }
  function loginUser() {
    axios
      .get(
        `${api}/ViewUserProfile?email_id=${localStorage.getItem(
          'email_id'
        )}&profile_id=${localStorage.getItem('email_id')}`
      )
      .then((res) => {
        // console.log((res.data.data[0].total_koobo))
        setLoginUserData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }
  const addClass = () => {
    if (bankAskPopup) {
      document.body.classList.add('remove-h');
    } else {
      document.body.classList.remove('remove-h');
    }
  };
  useEffect(() => {
    addClass();
  }, [bankAskPopup]);
  function noHandler(e, typeCheck) {
    e.preventDefault();
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
      } else if (
        reqBodyFromSlots.item == 'One seat in a Group Class' &&
        selectedSession == 'month'
      ) {
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
      } else if (
        reqBodyFromSlots.item == 'One seat in a Group Class' &&
        selectedSession == 'month'
      ) {
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
    function reqBody() {
      var data = {
        timeslot_id: timeSlotId(),
        member_count: memberCount(), // 1
        timespan: timeSpan(), // 1
        perhead: reqBodyFromSlots.price, // rate$
        starting_date: reqBodyFromSlots.todayDate, //calender date
        tutor_id: reqBodyFromSlots.tutor_id, // tutor email
        booking_type: bookingType(), // single
        totalamount: reqBodyFromSlots.price, // rate $
        learner_id: learnerId(), // loign user email
        payment_method: 'nil', // nil
        package: packageHandle(), // 1on1  5hour group trial
        invited_by: localStorage.getItem('email_id'), // loign user email
        invited_by_name: JSON.parse(localStorage.getItem('all_data'))[0].name, // loign user name
        timestamp: new Date().toLocaleTimeString() // current time (format)
      };
      return data;
    }
    setLearnersId(learnerId());
    switch (typeCheck) {
      case 'no':
        if (payStatus == 'paying' || payStatus == 'refund') {
          setBookingId(bkId);
          setBankAskPopup(false);
          setbraintreePopup(true);
          setKobooValue(koboos);
        } else {
          let body = reqBody();
          axios
            .post(`${api}/AddBookingMembers`, body)
            .then((res) => {
              if (res.data.status == 'success') {
                setBookingId(res.data.bk_id);
                setBankAskPopup(false);
                setbraintreePopup(true);
                setKobooValue(koboos);
                if (payStatus == 'reschadule') {
                  axios
                    .get(`${api}/BookingReschedule?bk_id=${bkId}`)
                    .then((res) => {
                      console.log(res.data, 'BookingReschedule');
                    })
                    .catch((err) => console.log(err));
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div className={bankAskPopup ? 'bg-blur' : ''}></div>
      <div className={bankAskPopup ? 'popup center active' : 'popup center'}>
        <div className="title">Are you using Nigerian Bank Card?</div>
        <div className="dismiss-btn align-items-center d-flex justify-content-between">
          <div onClick={(e) => noHandler(e, 'no')}>No</div>
          <div onClick={(e) => noHandler(e, 'yes')}> Yes</div>
        </div>
      </div>
      <Braintree
        braintreePopup={braintreePopup}
        setbraintreePopup={setbraintreePopup}
        reqBodyFromSlots={reqBodyFromSlots}
        bookingId={bookingId}
        kobooValue={kobooValue}
        getBookings={getBookings}
        payStatus={payStatus}
      />
    </>
  );
};
