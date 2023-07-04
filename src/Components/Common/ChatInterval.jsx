import styled from 'styled-components';

function ChatInterval({ interval }) {
  return (
    <StyledChatInterval>
      <span className="interval">{interval}</span>
    </StyledChatInterval>
  );
}

export default ChatInterval;

const StyledChatInterval = styled.div`
  text-align: center;
  border-bottom: 2px solid #d3d3d3;
  line-height: 0.1em;
  margin: 2rem 3rem;

  .interval {
    background: #f9f9f9;
    padding: 0 1rem;
    font-weight: 600;
    font-size: 0.7rem;
    color: #838383;
  }
`;
