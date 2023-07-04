import styled from 'styled-components';
import LoaderIMG from '../../assets/images/NewLoader.gif';

function Loader() {
  return (
    <>
      <LoaderDiv className="position-fixed top-50 start-50 translate-middle">
        <img className="position-fixed top-50 start-50 translate-middle" src={LoaderIMG} />
      </LoaderDiv>
    </>
  );
}
export default Loader;

const LoaderDiv = styled.div`
  opacity: 0.9;
  background-color: rgb(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  z-index: 1000;
  img {
    opacity: 0.5;
  }
`;
