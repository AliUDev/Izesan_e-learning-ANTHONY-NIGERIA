import styled from 'styled-components';
import Bus from '../../assets/images/NewCycle.gif';

function BusImg() {
  return (
    <>
      <LoaderDiv className="position-fixed top-50 start-50 translate-middle">
        <img className="position-fixed top-50 start-50 translate-middle" src={Bus} />
        <div class="position-absolute bottom-0 start-50 translate-middle-x mb-5">
          <h3 className='mb-5'>Wow 5 in a row! Way to go!</h3>
        </div>
      </LoaderDiv>
    </>
  );
}
export default BusImg;

const LoaderDiv = styled.div`
overflow: hidden;
  opacity: 0.9;
  background-color: rgb(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  z-index: 1000;
  text-align: center;
  img {
    opacity: 0.5;
    margin-top: -30px;
  }
`;
