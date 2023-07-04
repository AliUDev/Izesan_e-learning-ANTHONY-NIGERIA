import styled from 'styled-components';
import UserEsan from '../../../assets/images/useresan.png';
const chatData = [
  {
    id: 1,
    name: 'Paul Walker',
    image: UserEsan,
    message: 'Hi sir how are you'
  },
  {
    id: 1,
    name: 'Paul Walker',
    image: UserEsan,
    message: 'Hi sir how are you'
  },
  {
    id: 1,
    name: 'Paul Walker',
    image: UserEsan,
    message: 'Hi sir how are you'
  }
];

function VideoChats() {
  return (
    <StyledVideoChats>
      {chatData.map((chat, index) => {
        return (
          <StyledVideoChat key={chat.id} active={index === 0}>
            <img className="userimage" src={chat.image} />
            <div className="usertexts font-poppins">
              <div className="username">{chat.name}</div>
              <div className="usermessage">{chat.message}</div>
            </div>
          </StyledVideoChat>
        );
      })}
    </StyledVideoChats>
  );
}

export default VideoChats;

const StyledVideoChats = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 0.2rem 0.5rem;

  @media (min-width: 576px) {
    padding: 1rem 2rem;
  }
`;

const StyledVideoChat = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  .userimage {
    width: 2.4rem;
    height: 2.4rem;
    object-fit: contain;
    border-radius: 50%;
  }
  .usertexts {
    margin-left: 0.6rem;
    color: white;
    .username {
      font-size: 0.6rem;
      font-weight: 600;
    }
    .usermessage {
      font-size: 0.5rem;
    }
  }
  @media (min-width: 576px) {
    margin-bottom: 1rem;
  }
`;
