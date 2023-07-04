import styled from 'styled-components';

function ProgressBar({ value = 50 }) {
  return (
    <VerticalBar value={value}>
      <div className="loadbar">
        <strong className="bar"></strong>
      </div>
    </VerticalBar>
  );
}

const VerticalBar = styled.div`
  height: 100%;
  .loadbar {
    width: 16px;
    height: 375px;
    background-color: #d4d7e6;
    border-radius: 5px;
    position: relative;
  }
  .bar {
    height: ${(props) => props.value}%;
    width: 100%;
    display: block;
    font-family: arial;
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 0;
    background: linear-gradient(90deg, #6c7989 50%, #586470 0) !important;
    border-radius: 5px;
  }
  @media (min-width: 768px) {
    .loadbar {
      width: 20px;
      height: 488px;
      background-color: #d4d7e6;
      border-radius: 5px;
      position: relative;
    }
    .bar {
      height: ${(props) => props.value}%;
      width: 100%;
      display: block;
      font-family: arial;
      font-size: 12px;
      color: #fff;
      position: absolute;
      bottom: 0;
      background: linear-gradient(90deg, #6c7989 50%, #586470 0) !important;
      border-radius: 5px;
    }
  }
  @media (min-width: 992px) {
    .loadbar {
      width: 20px;
      height: 488px;
      background-color: #d4d7e6;
      border-radius: 5px;
      position: relative;
    }
    .bar {
      height: ${(props) => props.value}%;
      width: 100%;
      display: block;
      font-family: arial;
      font-size: 12px;
      color: #fff;
      position: absolute;
      bottom: 0;
      background: linear-gradient(90deg, #6c7989 50%, #586470 0) !important;
      border-radius: 5px;
    }
  }
  @media (min-width: 1200px) {
    .loadbar {
      width: 20px;
      height: 600px;
      background-color: #d4d7e6;
      border-radius: 5px;
      position: relative;
    }
    .bar {
      height: ${(props) => props.value}%;
      width: 100%;
      display: block;
      font-family: arial;
      font-size: 12px;
      color: #fff;
      position: absolute;
      bottom: 0;
      background: linear-gradient(90deg, #6c7989 50%, #586470 0) !important;
      border-radius: 5px;
    }
  }
  @media (min-width: 1400px) {
    .loadbar {
      width: 25px;
      height: 750px;
      background-color: #d4d7e6;
      border-radius: 5px;
      position: relative;
    }
    .bar {
      height: ${(props) => props.value}%;
      width: 100%;
      display: block;
      font-family: arial;
      font-size: 12px;
      color: #fff;
      position: absolute;
      bottom: 0;
      background: linear-gradient(90deg, #6c7989 50%, #586470 0) !important;
      border-radius: 5px;
    }
  }
`;

export default ProgressBar;
