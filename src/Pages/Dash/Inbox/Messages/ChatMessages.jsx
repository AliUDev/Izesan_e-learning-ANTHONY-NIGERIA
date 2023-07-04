import { useState } from 'react';
import styled from 'styled-components';

import ChatScreen from './MobileChatMessages';

import Heading from '../../../../Components/Common/Heading';
import InboxList from '../InboxList';

import SearchBox from '../SearchBox';


function ChatMessages() {
  const [isInboxListShown, setIsInboxListShown] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInboxShowChange = (value) => {
    setIsInboxListShown(value);
  };
  const [inboxes, setInboxes] = useState();


  function handleSearch(value) {
    setSearchValue(value);
  }


  return (
    <StyledInbox>
      <div className="heading text-center my-2 text-decoration-underline">
        <Heading title="Inbox" />
      </div>
      <StyledLayout>
        <div className="sidebarmessages d-none d-md-block">
          <SearchBox handleSearch={handleSearch} />
          <InboxList
            inboxes={inboxes}
            isInboxListShown={isInboxListShown}
            handleInboxShowChange={handleInboxShowChange}
            searchUser={searchValue}
          />
        </div>
        <ChatScreen
          inboxes={inboxes}
          isInboxListShown={isInboxListShown}
          handleInboxShowChange={handleInboxShowChange}
        />
      </StyledLayout>
    </StyledInbox>
  );
}

export default ChatMessages;

const StyledInbox = styled.div`
 margin: 20px 0px;
  position: sticky;
  top: 0px;
  .heading {
    @media (min-width: 768px) {
      padding: 1.5rem 1.5rem 0 1.5rem;
    }
    @media (min-width: 992px) {
      padding: 0 0 7px 0;
    }
  }
`;
const StyledLayout = styled.div`
margin-top: 25 hupx;
  padding: 0;
  ${'' /* margin: 1rem 0; */}
  display: flex;
  flex-direction: row;
  .mb-1 {
    display: flex;
    background: white;
    border-radius: 8px;
    align-items: center;
    margin-right: 1rem;
    margin-top: 1rem;
    flex-wrap: nowrap !important;
  }
  .mobileSearch {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  ${''
  /* @media screen and (max-width: 850px) {
  .mb-1 {
    background: rgb(247, 247, 247);
    justify-content: center;
    margin-top: 1rem;
  }
} */
  }
  @media (min-width: 992px) {
    padding: 0rem 0rem 0 1rem;
  }
  @media (min-width: 320px) {
    .sidebarmessages {
      width: 100%;
    }
  }
  @media (min-width: 720px) {
    .sidebarmessages {
      width: fit-content;
    }
  }
  .linkstyle {
    text-decoration: none;
    color: #343434;
  }
`;
