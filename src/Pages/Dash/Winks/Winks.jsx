import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ProfileImage from '../../../assets/images/gray_pic.png';
import GreyPic from '../../../assets/images/Profile-Icon.png';
import winkPic from '../../../assets/images/wink.png';
import { api, img } from '../../../url';
import Loader from '../../Loader/Loader';

function Winks() {
  const [data, setdata] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setisLoader(true);
    axios
      .get(`${api}ViewWinksReceived?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setdata(res.data.data);
          if (res.data.data.length < 1) {
            NotificationManager.info("You don't have any wink!", 'Info', 3000);
          } else {
            NotificationManager.info(`You have ${res.data.data.length} ${res.data.data.length > 1 ? "Winks" : "Wink"}`, 'Info', 3000);
          }
          setisLoader(false);
        } else setisLoader(false);
      })
      .catch((err) => {
        console.log(err);
        if (err) setisLoader(false);
        NotificationManager.error('Firewall or network error!!', 'Error', 3000);
      });
  }

  function winkHandler(e, re) {
    e.preventDefault();
    if (data.winked != 1) {
      axios
        .post(`${api}UserWink`, {
          receiver: re,
          sender: localStorage.getItem('email_id')
        })
        .then((res) => {
          if (res.data.status == 'success') {
            NotificationManager.success(`you winked back!`);

            getData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      NotificationManager.info(`you have already winked!`);
    }
  }


  return (
    <StyledWinks>
      {isLoader && <Loader />}
      <div className='row w-100'>
        <div className='col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 arrow' style={{ cursor: "pointer" }}>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12'>
          {/* <Heading title="Profile Details" className='bg-danger' /> */}
          <h4 className='w-100 heading m-1 fw-bold'>My Winks</h4>
        </div>
      </div>


      {/* <span className="heading-title fw-bold d-block mt-5 my-3">New? Pending Winks</span> */}
      <div>
        {data ? (
          <>
            {data
              ? data.map((item, index) => {
                if (item.winked == 0) {
                  return (
                    <WinkBar
                      key={index}
                      className="d-flex flex-row justify-content-between align-items-center bg-white my-2">
                      <div className="d-flex flex-row align-items-center">
                        {item.senderdp ? (
                          <img
                            className="wink-user"
                            src={`${img}${item.senderdp}`}
                            alt="sender_dp"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = GreyPic;
                            }}
                          />
                        ) : (
                          <img className="wink-user" src={`${ProfileImage}`} alt="no-profile" />
                        )}

                        <div className="d-flex flex-column mx-2 align-items-start">
                          <span className="title">
                            {item.sendername ? item.sendername : 'null'} winked at you!
                          </span>
                          {/*<span className="label">{item.label}</span>*/}
                        </div>
                      </div>

                      <button
                        className=" px-3 my-wink-btn text-white"
                        onClick={(e) => winkHandler(e, item.sender)}>
                        Wink Back
                      </button>
                    </WinkBar>
                  );
                }
              })
              : null}
          </>
        ) : (
          ''
        )}
      </div>
      <div>
        <span className="heading-title my-3 d-block fw-bold">Previous Winks</span>
        {data ? (
          <>
            {data
              ? data.map((item, index) => {
                if (item.winked == 1) {
                  return (
                    <WinkBar
                      key={index}
                      className="d-flex flex-row justify-content-between align-items-center bg-white my-2">
                      <div className="d-flex flex-row align-items-center li_item">
                        {item.senderdp ? (
                          <img
                            className="wink-user"
                            src={`${img}/${item.senderdp}`}
                            alt="sender_dp"
                          />
                        ) : (
                          <img
                            className="wink-user"
                            src="assets/img/no-profile.png"
                            alt="no-profile"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = GreyPic;
                            }}
                          />
                        )}

                        <div className="d-flex flex-column mx-3 align-items-start">
                          <span className="title text-capitalize">
                            {item.sendername ? item.sendername : 'null'} winked at you!
                          </span>
                        </div>
                      </div>
                      <img src={winkPic} />
                    </WinkBar>
                  );
                }
              })
              : null}
          </>
        ) : null}

      </div>
    </StyledWinks>
  );
}

const StyledWinks = styled.div`
  padding: 2rem 1rem;
  img{
    border-radius: 50px;
  }
  .heading-title {
    text-align: left;
    font-size: 20px;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }

  .wink-user {
    width: 81px;
    height: 81px;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const WinkBar = styled.div`
border-radius: 10px;
box-shadow: 0 0 4px 2px rgb(0,0,0,0.1);
  padding: 0.5rem;
  .title {
    color: #8f8f8f;
    font-weight: 500;
  }
  .label {
    color: #8f8f8f;
    font-size: 14px;
  }

  .my-wink-btn {
    background: #489a6b;
    border-radius: 12px;
    border: 0;
    padding: 0.5rem;
    color: black;
  }
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export default Winks;
