import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// import Send from "../../../assets/images/send.png";

import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useParams } from 'react-router-dom';
import ChatMessage from '../../../../Components/Common/ChatMessage/ChatMessage';
import { api, img } from '../../../../url';
import ChatInput from '../ChatInput';
import ChatLoader from './ChatLoader';

function MobileChatMessages() {
  const [isLoader, setisLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [offset, setOffset] = useState(1);
  const containerRef = useRef(null);

  const params = useParams();
  let id = params.chatid;
  let c_m_id = params.c_m_id;
  var messageSendCase = 0;

  useEffect(() => {
    getChatHistory(1);
  }, [id, c_m_id]);

  function getChatHistory(offset) {
    setisLoader(true);
    axios
      .get(
        `${api}ChatHistory?email_id=${localStorage.getItem('email_id')}&chat_id=${id}&page=` +
        offset
      )
      .then((res) => {
        // console.log(res.data.data.data)
        setReceiverEmail(res.data.data.data[0].sender == localStorage.getItem('email_id') ? res.data.data.data[0].receiver : res.data.data.data[0].sender);
        // console.log(res.data.data.data[0].sender)
        var myoldArr = res.data.data.data;
        var currentArr = res.data.data.data.reverse();
        for (var i = 0; i < currentArr.length; i++) {
          var index = myoldArr.map((o) => o.c_m_id).indexOf(currentArr[i]['c_m_id']);
          if (index === -1) {
            myoldArr.push(currentArr[i]);
          }
        }
        myoldArr.sort((a, b) => a.c_m_id - b.c_m_id);
        setData(myoldArr);
        if (senderEmail == '') {
          setSenderEmail(JSON.parse(localStorage.getItem('all_data'))[0].email_id);
        }
        // if (receiverEmail == '') {
        //   if (
        //     res.data.data.data.length > 0 &&
        //     res.data.data.data[0].receiver ==
        //     JSON.parse(localStorage.getItem('all_data'))[0].email_id
        //   ) {
        //     setReceiverEmail(res.data.data.data.length > 0 && res.data.data.data[0].sender);
        //   } else {
        //     setReceiverEmail(res.data.data.data.length > 0 && res.data.data.data[0].receiver);
        //   }
        // }
        setTotalPages(res.data.data.last_page);
        setisLoader(false);
      })
      .catch((err) => {
        setisLoader(false);
        console.log(err);
      });
  }
  function sendMessageDetail() {
    messageSendCase = 1;
    getChatHistory(1);
    NotificationManager.success('Your message has been sent', 'Success', 3000);
  }
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  function scrollToBottom() {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }

  return (
    <StyledChatScreen>
      {isLoader && <ChatLoader />}
      <div
        className="message-container"
        id="message-container"
        style={{ height: '400px' }}
        // onScroll={handleScroll}
        ref={containerRef}>
        <div className=" d-md-block inbox-message-area">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 'auto',
              padding: '0 1rem',
              width: '100%'
            }}>
            <div
              className="chatdiv"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                width: '100%',
                marginBottom: '0.2rem'
              }}>
              {data &&
                data.length > 0 &&
                data?.map((item, index) => {
                  return (
                    <ChatMessage
                      key={index}
                      otherMessage={item.sender != localStorage.getItem('email_id')}
                      message={item.message}
                      time={item.timestamp}
                      userImage={
                        item.sender != localStorage.getItem('email_id')
                          ? img + '' + localStorage.getItem('current_img')
                          : img + '' + JSON.parse(localStorage.getItem('all_data'))[0].dp
                      }
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <ChatInput
        sendMessageDetail={sendMessageDetail}
        senderEmail={senderEmail}
        receiverEmail={receiverEmail}
      />
    </StyledChatScreen>
  );
}

export default MobileChatMessages;

const StyledChatScreen = styled.div`
  background-color: rgb(0, 0, 0, 0.03);
  border-radius: 15px;
  flex: 1;
  .message-container {
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.secondary};
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #b30000;
    }
    overflow-y: auto;
    // :hover {
    //   overflow-y: auto;
    // }
    /* height: calc(100vh - 155px); */
    height: 550px;

    .inboxheader {
      padding: 0.5rem 1rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .header-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .receiver-user {
          font-size: 1.4rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 0;
        }
        .active_section {
          font-size: 0.4rem;
          font-weight: 400;
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .header-right {
        .options_btn {
          font-weight: bold;
        }
      }
    }
  }
  .inbox-message-area {
    padding-top: 1rem;
    width: 100%;
    height: calc(100vh - 15px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mobile-chat-area {
    padding: 1rem 1rem 0;
    // height: calc(100vh - 215px);
    overflow-y: auto;
    .mobile-message {
      width: 140px;
      text-align: center;
      padding: 0.6rem 0;
      border-radius: 3px;
    }
  }

  @media screen and (min-width: 768px) {
    .message-container {
      height: calc(100vh - 260px);
      .inbox-message-area {
        height: calc(100vh - 310px);
      }
    }
  }

  @media screen and (min-width: 992px) {
    .message-container {
      .inboxheader {
        border-bottom: 2px solid #ddd7d7;
        .header-left {
          .receiver-user {
            font-size: 1rem;
          }
          .active_section {
            font-size: 0.6rem;
          }
        }
      }
      height: calc(100vh - 305px);
      .inbox-message-area {
        height: calc(100vh - 260px);
      }
    }
  }
  @media (max-width: 450px) and (min-width: 425px) {
    .message-container {
      /* width: 300px; */
      height: 900px;
    }
  }
  @media (max-width: 424px) and (min-width: 400px) {
    .message-container {
      /* width: 300px; */
      height: 700px;
    }
  }
  @media (max-width: 350px) {
    .message-container {
      width: 320px;
      height: 800px;
    }
  }
`;
