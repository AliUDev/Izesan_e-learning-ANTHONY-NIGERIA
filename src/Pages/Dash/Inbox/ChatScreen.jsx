import styled from 'styled-components';
import ChatInput from './ChatInput';

function ChatScreen() {
  return (
    <StyledChatScreen>
      <div className="message-container d-none d-md-block">
        <p className="text-muted text-center" style={{ marginTop: '30%' }}>
          No Chat Available
        </p>
      </div>
      <ChatInput />
    </StyledChatScreen>
  );
}

export default ChatScreen;

const StyledChatScreen = styled.div`
  flex: 1;
  .message-container {
    overflow-y: scroll;
    :hover {
      overflow-y: auto;
    }
    height: calc(100vh - 155px);

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
    height: calc(100vh - 215px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mobile-chat-area {
    padding: 1rem 1rem 0;

    height: calc(100vh - 215px);
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
`;
