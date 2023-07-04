import { useEffect, useState } from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Crafty from '../../../assets/images//q@2x/q.png';
import Attachement from '../../../assets/images/atteched.png';
import Cross from '../../../assets/images/cross.png';
import Minus from '../../../assets/images/minus.png';
import Plus from '../../../assets/images/plus.png';
import ChatUser from '../../../assets/images/s2_chat_user.png';
import Send from '../../../assets/images/send.png';

function ChatPopUp() {
  const [user] = useState('Dacosta Wereko');

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'Dacosta Wereko',
        image: ChatUser,
        message: 'Hello',
        time: 'DOC 28 min ago'
      },
      {
        id: 2,
        sender: 'Paul Walker',
        image: Crafty,
        message: 'Hi',
        time: 'ME 28 min ago'
      }
    ]);
  }, []);

  const [showChatPopUp, setShowChatPopUp] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  return (
    <StyledChatPopUp className="d-none d-lg-block">
      <button onClick={() => setShowChatPopUp(!showChatPopUp)} className="d-none">
        {' '}
        C{' '}
      </button>
      {showChatPopUp && (
        <div
          style={{
            position: 'fixed',
            zIndex: '10',
            right: '5rem',
            bottom: '0rem',
            display: `${chatOpen ? 'block' : 'none'}`
          }}>
          <StyledCard
            style={{
              width: '22rem',
              height: '28rem',
              background: 'white',
              borderRadius: '12px 12px 0px 0px'
            }}>
            <div
              style={{
                paddingBottom: '0.3rem'
              }}>
              <div
                className="header"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  background: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  boxShadow: '#dbdbdb 0px 2px 3px 0px',
                  cursor: `${chatMinimized ? 'pointer' : 'default'}`
                }}
                onClick={() => {
                  if (chatMinimized) {
                    setChatMinimized(false);
                  }
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <div>
                    <Card.Img
                      style={{
                        height: '2.5rem',
                        width: '2.5rem',
                        borderRadius: '8px',
                        marginRight: '0.5rem'
                      }}
                      src={ChatUser}
                    />
                  </div>
                  <div>
                    <Card.Text
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}>
                      Paul Walker
                    </Card.Text>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <div
                    onClick={() => {
                      setChatMinimized(true);
                    }}>
                    {!chatMinimized ? (
                      <Card.Img
                        style={{
                          width: '15px',
                          cursor: 'pointer'
                        }}
                        src={Minus}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginLeft: '1rem'
                    }}>
                    <Card.Img
                      style={{
                        height: '15px',
                        width: '15px',

                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setChatOpen(false);
                      }}
                      src={Cross}
                    />
                  </div>
                </div>
              </div>
            </div>
            {!chatMinimized ? (
              <StyledCard.Body
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0px'
                }}>
                <div
                  className="chatdiv"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    marginBottom: '0.2rem',
                    width: '100%',
                    padding: '1rem 1rem 0'
                  }}>
                  {messages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',

                          justifyContent: `${item.sender !== user ? 'right' : 'left'}`
                        }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                          {/* image and name */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: `${item.sender !== user ? 'row-reverse' : 'row'}`,
                              alignItems: 'center',
                              marginBottom: '0.2rem'
                            }}>
                            <div className="chatUserImage">
                              <img
                                style={{
                                  height: '2.5rem',
                                  width: '2.5rem',
                                  borderRadius: '8px',
                                  margin: `${
                                    item.sender === user ? '0 0.4rem 0 0' : '0 0 0 0.4rem'
                                  }`
                                }}
                                src={ChatUser}
                              />
                            </div>
                            <div
                              className="chatUserName"
                              style={{
                                fontSize: '0.8rem',
                                fontWeight: '600'
                              }}>
                              {item.sender}
                            </div>
                          </div>
                          {/* message and time */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: `${item.sender !== user ? 'row-reverse' : 'row'}`,
                              justifyContent: 'center'
                            }}>
                            <div
                              className="chatUserMessage"
                              style={{
                                backgroundColor: `${item.sender !== user ? '#F19C00' : '#CBCBCB'}`,
                                color: `${item.sender !== user ? '#fff' : '#8F8F8F'}`,
                                borderRadius: `${
                                  item.sender !== user ? '16px 16px 16px 0px' : '16px 16px 0px 16px'
                                }`,
                                fontSize: '0.5rem',
                                width: '6rem',
                                height: '34px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: `${item.sender !== user ? '0 3rem 0 0' : '0 0 0 3rem'}`
                              }}>
                              <p
                                style={{
                                  fontSize: '0.8rem',
                                  margin: 0
                                }}>
                                {item.message}
                              </p>
                            </div>
                            <div
                              className="chatUserTime font-roboto"
                              style={{
                                fontSize: '0.7rem',
                                margin: `${item.sender !== user ? '0 1.2rem 0 0' : '0 0 0 1.2rem'}`,
                                color: 'rgb(30, 40, 67)',
                                opacity: 0.3,
                                display: 'flex',
                                alignItems: 'end'
                              }}>
                              12:00 PM
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="chatInput"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '3rem',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    zIndex: '2',
                    backgroundColor: 'white'
                  }}>
                  <Card.Img
                    style={{
                      height: '35px',
                      width: '35px'
                    }}
                    src={Plus}
                  />
                  <InputGroup>
                    <FormControl
                      style={{ margin: '0 6px', borderRadius: '16px', backgroundColor: '#F0F2F5' }}
                      className="mini_message"
                      placeholder="Aa"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  {/* <Card.Img src={Crafty} /> */}

                  <img
                    style={{
                      width: '28px',
                      height: '28px',
                      margin: '0 5px'
                    }}
                    src={Attachement}
                  />
                  <Card.Img
                    style={{
                      width: '35px',
                      height: '35px'
                    }}
                    src={Send}
                  />
                </div>
              </StyledCard.Body>
            ) : null}
          </StyledCard>
        </div>
      )}
    </StyledChatPopUp>
  );
}

export default ChatPopUp;

const StyledChatPopUp = styled.div`
  z-index: 10;
`;

const StyledCard = styled(Card)`
  .card-body {
    .chatdiv {
      height: calc(26rem - 82px);
    }
  }
`;
