import styled from 'styled-components';
import SendC from '../../../assets/images/send_c.png';

import axios from 'axios';
import { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { NotificationManager } from 'react-notifications';
import { api } from '../../../url';

function ChatInput({ sendMessageDetail, senderEmail, receiverEmail }) {
  console.log(sendMessageDetail, senderEmail, receiverEmail)
  const [msg, setMsg] = useState('');
  function sendMessage(text) {
    var currentTimestamp = new Date().toLocaleString();
    if (msg != '') {
      var body = {
        receiver: receiverEmail,
        sender: senderEmail,
        message: text,
        timestamp: currentTimestamp
      };

      axios.post(`${api}Chatting`, body).then((res) => {
        if (res.data.status == 'success') {
          setMsg('');
          sendMessageDetail();
          const selectAudio = new Audio('/assets/sounds/messageSend.wav');
          const volumeCheck = localStorage.getItem('Volume');
          volumeCheck === 'true' ? selectAudio.play() : console.log('');
          // location.reload();
        } else {
          NotificationManager.error(res.data.error, 'Error', 3000);
        }
      });
    } else {
      NotificationManager.error('Write your message first!', 'Error', 3000);
    }
  }

  return (
    <StyledChatInput>
      <InputEmoji
        value={msg}
        onChange={setMsg}
        cleanOnEnter
        onEnter={sendMessage}
        placeholder="Type a message"
        className="inpitFeild"
      />
      <div className="right-container">
        {/* <MdSend className="sendIconBtn d-md-none bg-dark" /> */}
        <img
          className="sendBtn d-md-block"
          style={{ cursor: 'pointer' }}
          onClick={() => sendMessage(msg)}
          src={SendC}
        />
      </div>
    </StyledChatInput>
  );
}

export default ChatInput;

const StyledChatInput = styled.div`
  background-color: white;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0.2rem 1.5rem;
  position: fixed;
  bottom: 0;
  .react-emoji {
    width: 100%;
  }
  .react-input-emoji--input {
    font-weight: 400;
    max-height: 50px;
    max-width: 380px;
    min-width: 100px;
    outline: none;
    /* overflow-x: scroll; */
    overflow-y: scroll;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 1;
    width: 100%;
    user-select: text;
    padding: 9px 12px 11px;
    text-align: left;
  }
  .react-input-emoji--input::-webkit-scrollbar {
    display: none;
  }
  .left-container {
    width: 80%;
    padding-right: 1rem;
  }
  .chatInput {
    margin-left: 0.5rem;
    border: none;
    outline: none;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    width: 100%;
    ::placeholder {
      font-weight: 600;
      font-size: 0.8rem;
      color: #bfbfbf;
    }
  }
  .emojiBtn {
    svg {
      font-size: 26px;
      color: #ffd486;
    }
  }
  .right-container {
    width: 20%;
    display: flex;
  }

  .attachmentBtn {
    color: #ffd486;
    font-size: 26px;
    margin-right: 0.5rem;
  }
  .sendBtn {
    height: 2.2rem;
    width: 2.6rem;
  }
  .sendIconBtn {
    font-size: 26px;
    color: #fff;
  }
  @media (max-width: 1024px) {
    .react-input-emoji--input {
      max-width: 130px;
    }
  }
  @media (max-width: 768px) {
    .react-input-emoji--input {
      max-width: 250px;
    }
  }
  @media (max-width: 415px) {
    .react-input-emoji--input {
      max-width: 200px;
    }
  }
  @media (min-width: 768px) {
    padding: 0 1.2rem;
    border-top: 1px solid #ddd7d7;
    background-color: #f7f7f7;
    height: 4.12rem;
    position: static;
    .emojiBtn {
      svg {
        font-size: 26px;
        color: #333333;
      }
    }
    .chatInput {
      background-color: #f7f7f7;
    }
    .right-container {
      flex: 0;
      border-left: 1px solid #ddd7d7;
      justify-content: flex-end;
      height: 100%;
      align-items: center;
      padding: 0 0 0 1rem;
    }
  }
`;
