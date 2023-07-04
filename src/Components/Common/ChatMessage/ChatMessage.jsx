import styled from 'styled-components';
import GreyPic from '../../../assets/images/gray_pic.png';

function ChatMessage({ otherMessage, userImage, time, message }) {
  return (
    <StyledChatMessage otherMessage={otherMessage}>
      <div className="chatmessage-container">
        <div className="d-flex flex-column">
          <div className="chatUserImageContainer">
            <div className="chatUserImage">
              <img
                className="userImage"
                style={{ objectFit: 'cover' }}
                src={userImage}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = GreyPic;
                }}
              />
            </div>
            {/* <Container */}
            <div className="inboxusrmsg d-flex">
              <p className="msg d-flex">{message}</p>
            </div>
          </div>
          {/* message and time */}
        </div>
      </div>
      <div className="time-section d-flex justify-content-center">
        <div className="time">{time}</div>
      </div>
    </StyledChatMessage>
  );
}

export default ChatMessage;

const StyledChatMessage = styled.div`
  .chatmessage-container {
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.otherMessage ? 'left' : 'right')};

    .chatUserImageContainer {
      display: flex;
      flex-direction: ${(props) => (props.otherMessage ? 'row' : 'row-reverse')};
      gap: 0.2rem;
      align-items: center;
      .chatUserImage {
        height: 1.8rem;
        width: 1.8rem;
        border-radius: 50%;
        .userImage {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .inboxusrmsg {
        font-size: 0.7rem;
        padding: 0;
        width: 18rem;
        min-height: 3rem;
        max-width: 30rem;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: ${(props) => (props.otherMessage ? '#CBCBCB' : props.theme.secondary)};
        border-radius: 20px;
        margin: ${(props) => (props.otherMessage ? '0 2rem 0 0' : '0 0 0 2rem ')};
      }
      .msg {
        color: ${(props) => (props.otherMessage ? 'black' : 'white')};
        margin: 0.2rem 0.2rem 0.2rem 1rem;
        flex-wrap: wrap;
        word-break: break-all;
        max-width: 220px;
        font-size: 0.9rem;
      }
    }

    .chatUserTime {
      margin-top: 0.7rem;
      font-size: 0.6rem;
      font-weight: 400;
      color: #838383;
    }
  }
  .time {
    font-size: 0.8rem;
    margin: 5px 0;
    color: #b3acac;
  }
  /* 850 */
  @media screen and (max-width: 1100px) {
    .chatmessage-container .chatUserImageContainer .inboxusrmsg {
      width: 11rem;
    }
  }
  @media screen and (max-width: 991px) {
    .chatmessage-container.chatUserImageContainer .inboxusrmsg {
      width: 16rem;
    }
  }
  @media screen and (max-width: 540px) and (min-width: 390px) {
    .chatUserImageContainer.chatUserImageContainer .inboxusrmsg {
      width: 16rem;
    }
  }
  @media screen and (max-width: 390px) {
    .chatUserImageContainer.chatUserImageContainer.inboxusrmsg {
      width: 10rem !important;
    }
    .chatmessage-container {
      width: fit-content;
    }
  }
`;
