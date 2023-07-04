import { FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
function SearchBox({ isInboxListShown, handleInboxShowChange, handleSearch }) {
  return (
    <StyledSearchBox>
      <div className="inboxSearchContainer">
        <div className="inboxSearch">
          <FaSearch onClick={() => handleInboxShowChange(!isInboxListShown)} />
          <FormControl
            placeholder="Search Username"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={(e) => handleSearch(e.target.value)}
          />

          {isInboxListShown && (
            <>
              <div className="mobileSearch">
                <FormControl
                  style={{
                    width: '5rem',
                    marginTop: '0.5rem',
                    display: 'initial',
                    lineHeight: '0.5',
                    border: '0.1px solid #ced4da',
                    backgroundColor: 'transparent'
                  }}
                  placeholder="User"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </StyledSearchBox>
  );
}

export default SearchBox;
const StyledSearchBox = styled.div`
  width: 100%;

  ${
    '' /* @media (max-width: 850px) {
    width: 94px;
  } */
  }
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
  .inboxListItemContainer {
    height: calc(100vh - 19.05rem);
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    @media (min-width: 320px) {
      height: calc(100vh - 11.5rem);
    }
    @media (min-width: 720px) {
      height: calc(100vh - 19.05rem);
    }
  }
  .inboxSearchContainer {
    width: 100%;
    height: 4.2rem;
    display: flex;
    align-items: center;
    .inboxSearch {
      width: 100%;
      margin: 10px;
      border: 1px solid #c5c5c5;
      border-radius: 5px;
      /* height: 2rem; */
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 2rem;
      background: #fff;
      svg {
        position: absolute;
        left: 5px;
        color: #adadad;
      }
      input {
        border: 0;
        box-shadow: none;
        padding-left: 5px;
      }
    }
  }
`;
