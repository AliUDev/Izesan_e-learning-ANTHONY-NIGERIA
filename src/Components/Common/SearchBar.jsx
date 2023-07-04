import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';

function SearchBar({ placeholder, className = '' }) {
  return (
    <StyledSearchBar className={className}>
      <AiOutlineSearch />
      <input placeholder={placeholder} />
    </StyledSearchBar>
  );
}

export default SearchBar;

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.bg};
  border-radius: 5px;
  padding: 1rem 1.4rem;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: ${(props) => props.theme.primary};
    outline: none;
    padding-left: 1.5rem;
    &::placeholder {
      color: ${(props) => props.theme.text_secondary};
    }
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    font-size: 26px;
    color: ${(props) => props.theme.text_secondary};
  }
`;
