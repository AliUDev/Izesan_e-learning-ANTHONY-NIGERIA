import { useEffect, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
import Accept from '../../assets/images/accept.png';
import Reject from '../../assets/images/reject.png';
import { api, img } from '../../url';

function Notification() {
  const navigate = useNavigate();
  const [data, setData] = useState(false);
  const [errmsg, setErrmsg] = useState(false);

  // const [items, setItems] = useState();
  useEffect(() => {
    getNotifications();
    // setItems([
    //   {
    //     id: 1,
    //     name: 'Paul Smith',
    //     notification: 'You have accepted this invitation',
    //     profilepicture: ProfileImage,
    //     date: '12-12-2020'
    //   },
    //   {
    //     id: 2,
    //     name: 'Paul Smith',
    //     notification: 'You have accepted this invitation',
    //     profilepicture: ProfileImage,
    //     date: '12-12-2020'
    //   },
    //   {
    //     id: 3,
    //     name: 'Paul Smith',
    //     notification: 'You have accepted this invitation',
    //     profilepicture: ProfileImage,
    //     date: '13-12-2020'
    //   },
    //   {
    //     id: 4,
    //     name: 'Paul Smith',
    //     notification: 'You have accepted this invitation',
    //     profilepicture: ProfileImage,
    //     date: '13-12-2020'
    //   }
    // ]);
  }, []);

  function getNotifications() {
    axios
      .get(`${api}ViewNotifs?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'success') {
          // setisLoader(false);
          var newdata = res.data.data;

          // this gives an object with dates as keys
          const groups = newdata.reduce((groups, game) => {
            const date = game.created_at.split(' ')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(game);
            return groups;
          }, {});

          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              items: groups[date]
            };
          });

          console.log(groupArrays);
          setData(groupArrays);
        } else {
          // setisLoader(false);
          setErrmsg('No content Found!!');
        }
      })
      .catch((err) => console.log(err));
  }

  function statusHandling(e, learner_id, booking_id, st) {
    e.preventDefault();
    let req = {
      learner_id,
      booking_id,
      status: st
    };
    // setisLoader1(true);
    axios
      .post(`${api}MembersBookingAccept`, req)
      .then((res) => {
        getNotifications();
        if (res.data.status == 'success') {
          setTimeout(() => {
            // setisLoader1(false);
            if (st == 'Rejected') {
              setErrmsg('you rejected this invitaion!!');
              setTimeout(() => {
                setErrmsg(false);
              }, 3000);
            } else if (st == 'Accepted') {
              history.push('/bookings');
            }
          }, 1000);
        } else {
          //setisLoader1(false);
          setErrmsg('Error!! your request not approving!!');
          setTimeout(() => {
            setErrmsg(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          //setisLoader1(false);
          setErrmsg('Firewall  or Interner Error!!');
        }
      });
  }


  return (
    <StyledNotificationLayout>
      <div className='row p-2'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <h3 className=' p-2'>Notifications</h3>
        </div>
      </div>
      <StyledNotification>
        <Row className="justify-content-end gy-3">
          {data &&
            data.length > 0 &&
            data?.map((item, index) => {
              return (
                <div
                  // onClick={() => {
                  //   navigate('/notification/stats');
                  // }}
                  className="cursor-pointer"
                  key={index}>
                  <div>
                    {/*{index % 2 === 0 || index === 0 ? (*/}
                    <div className="d-flex justify-content-end">
                      <h4
                        style={{
                          fontWeight: '700',
                          fontSize: '1.9rem'
                        }}>
                        {item.date}
                      </h4>
                    </div>
                    {/*) : null}*/}
                  </div>
                  {item.items &&
                    item.items.length > 0 &&
                    item.items?.map((eachItem, eachIndex) => {
                      return (
                        <Card key={eachIndex}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}>
                            <div className="section1">
                              <div>
                                <img
                                  src={`${img}${eachItem.invited_by_dp}`}
                                  style={{
                                    height: '14vh',
                                    width: '7vw',
                                    minWidth: '8rem',
                                    minHeight: '8rem',
                                    padding: '1rem'
                                  }}
                                />
                              </div>

                              <div className=" m-auto p-3">
                                <p
                                  style={{
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                  }}>
                                  {eachItem.invited_by_name}
                                </p>
                                <p
                                  style={{
                                    fontSize: '0.75rem'
                                  }}>
                                  {eachItem.status == 'pending'
                                    ? 'You have Pending Invitation'
                                    : 'You have accepted this invitation'}
                                </p>
                              </div>
                            </div>
                            <>
                              {eachItem.status == 'pending' ? (
                                <div className="section2">
                                  <div className=" m-auto d-flex justify-content-around accept_reject">
                                    <div className="m-auto">
                                      <button
                                        className="m-2"
                                        onClick={(e) => {
                                          if (
                                            window.confirm(
                                              'Are you sure you want to Accept this invitation!!'
                                            )
                                          )
                                            statusHandling(
                                              e,
                                              eachItem.learner_id,
                                              eachItem.bk_id,
                                              'Accepted'
                                            );
                                        }}
                                        style={{
                                          backgroundImage: `url(${Accept})`,
                                          padding: '1rem',
                                          backgroundRepeat: 'no-repeat',
                                          backgroundSize: '90%',
                                          backgroundColor: 'transparent',
                                          border: 'none'
                                        }}
                                      />
                                      <p
                                        className="d-none d-md-block mx-1"
                                        style={{
                                          fontSize: '0.75rem'
                                        }}>
                                        Accept
                                      </p>
                                    </div>
                                    <div className="m-auto">
                                      <button
                                        className="m-2"
                                        onClick={(e) => {
                                          if (
                                            window.confirm(
                                              'Are you sure you want to reject this invitation!!'
                                            )
                                          )
                                            statusHandling(
                                              e,
                                              eachItem.learner_id,
                                              eachItem.bk_id,
                                              'Rejected'
                                            );
                                        }}
                                        style={{
                                          backgroundImage: `url(${Reject})`,
                                          padding: '1rem',
                                          backgroundRepeat: 'no-repeat',
                                          backgroundSize: '30px',
                                          backgroundColor: 'transparent',
                                          border: 'none'
                                        }}
                                      />
                                      <p
                                        className="d-none d-md-block mx-1"
                                        style={{
                                          fontSize: '0.75rem'
                                        }}>
                                        Reject
                                      </p>
                                    </div>
                                  </div>
                                  {/*<div className=" m-auto d-flex justify-content-end">*/}
                                  {/*  <button*/}
                                  {/*    className="mx-2"*/}
                                  {/*    style={{*/}
                                  {/*      backgroundImage: `url(${Cross})`,*/}
                                  {/*      width: '20px',*/}
                                  {/*      height: '20px',*/}
                                  {/*      backgroundRepeat: 'no-repeat',*/}
                                  {/*      backgroundSize: '15px',*/}
                                  {/*      backgroundColor: 'transparent',*/}
                                  {/*      border: 'none'*/}
                                  {/*    }}*/}
                                  {/*  />*/}
                                  {/*</div>*/}
                                </div>
                              ) : (
                                ''
                              )}
                            </>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              );
            })}
        </Row>
      </StyledNotification>
    </StyledNotificationLayout>
  );
}

export default Notification;

const StyledNotificationLayout = styled.div`
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const StyledNotification = styled(Container)`
  .section1 {
    display: flex;
    align-items: center;
  }
  .section2 {
    display: flex;
    align-items: center;
  }
  @media (max-width: 576px) {
    .section2 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .accept_reject {
      flex-direction: column;
    }
  }
`;
