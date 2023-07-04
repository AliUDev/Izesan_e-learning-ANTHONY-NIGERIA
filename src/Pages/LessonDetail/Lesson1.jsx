import { useEffect, useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import Abati from '../../assets/images/abati.png';
import Aso from '../../assets/images/aso.png';
import Ese from '../../assets/images/ese.png';
import Heart from '../../assets/images/heart.png';
import Nsa from '../../assets/images/nsa.png';

function Lesson1() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(1);
  const [boxes, setBoxes] = useState();
  useEffect(() => {
    setBoxes([
      {
        id: 1,
        name: 'Abati',
        image: Abati
      },
      {
        id: 2,
        name: 'Nsa',
        image: Nsa
      },
      {
        id: 3,
        name: 'Ese',
        image: Ese
      },
      {
        id: 4,
        name: 'Aso',
        image: Aso
      }
    ]);
  }, []);
  return (
    <StyledLayout>
      <Container
        className="mx-auto"
        style={{
          display: 'flex',
          background: '#F9F9F9',
          //   height: "100%",
          alignItems: 'center',
          flexDirection: 'column',
          margin: '1rem',
          padding: '1rem',
          justifyContent: 'center'
        }}>
        {/* progress bar */}
        <Row
          className="mx-auto justify-content-center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
            // width: "42",
          }}>
          <Col>
            <p
              style={{
                fontWeight: '600'
              }}>
              30%
            </p>
          </Col>
          <Col>
            {' '}
            <div className="progressBar">
              <ProgressBar now={30} />
            </div>
          </Col>
          <Col>
            <img
              style={{
                width: '1.5rem',
                height: '1.5rem',
                marginLeft: '3rem'
              }}
              src={Heart}
            />
          </Col>
        </Row>
        {/* Question number */}
        <Row className="question_no">
          <p>Question No 1</p>
        </Row>
        {/* Question */}
        <Row className="question">
          <p>Teeth ?</p>
        </Row>
        {/* Boxes */}
        <Row className="boxarea">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 1
            }}>
            {boxes?.map((box) => {
              return (
                <Col
                  key={box.id}
                  className="contentbox"
                  style={{
                    boxShadow: `${box.id === selected
                        ? 'rgb(255 202 0) 0rem -0.05rem 0.3rem 0rem'
                        : '0rem -0.05rem 0.3rem 0rem #888888'
                      }`
                  }}
                // style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   background: `white`,
                //   justifyContent: "flex-end",
                //   height: "10rem",
                //   minWidth: "9rem",
                //   alignItems: "center",
                //   marginLeft: "1rem",
                // }}
                >
                  {/* box */}
                  <img
                    style={{
                      height: '5rem',
                      width: '5rem',
                      marginBottom: '2.5rem'
                    }}
                    src={box.image}
                  />
                  <p
                    style={{
                      // borderTop: "1px solid #ddd7d7",
                      width: '100%',
                      textAlign: 'center',
                      // paddingBottom: "1rem",
                      height: '2.4rem',
                      margin: '0rem',
                      // marginTop: "20px",

                      background: `${box.id === selected ? '#F19C00' : 'white'}`,
                      boxShadow: `${box.id === selected
                          ? '#0rem -0.05rem 0.06rem 0rem #F19C00'
                          : '0rem -0.05rem 0.06rem 0rem #888888'
                        }`,
                      color: `${box.id === selected ? 'white' : 'black'}`,
                      fontWeight: `${box.id === selected ? '700' : '400'}`,

                      // fontWeight: "700",

                      // boxShadow: "0rem -0.05rem 0.06rem 0rem #888888",
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelected(box.id);
                    }}>
                    <p
                      style={{
                        marginTop: '6px'
                      }}>
                      {box.name}
                    </p>
                  </p>
                </Col>
              );
            })}
          </div>
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              // background: `white`,
              justifyContent: 'flex-end',
              height: '12rem',
              width: '10rem',
              alignItems: 'center',
              flexShrink: 1
            }}>
            <img
              style={{
                height: '3rem',
                width: '3rem',
                marginBottom: '4rem'
              }}
              onClick={() => {
                navigate('/lessons/2');
              }}
              src={Next}
            />
          </div> */}
        </Row>

        {/* submit button */}
        <div>
          <Button
            style={{
              marginTop: '10rem',
              background: '#F19C00',
              border: '0',
              paddingRight: '6rem',
              paddingLeft: '6rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
            onClick={() => {
              navigate('/lessons/2');
            }}>
            Submit
          </Button>
        </div>
      </Container>
    </StyledLayout>
  );
}

export default Lesson1;

const StyledLayout = styled.div`
  .progressBar {
    margin-top: 0.2rem;
    width: 32rem;
    margin-bottom: 2rem;
  }
  .boxarea {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .boxarea .row {
    /* flex-shrink: 1 !important;
  width: auto;
  max-width: auto; */
  }
  .progress-bar {
    background-color: #a1d363 !important;
  }
  .question {
    font-weight: 700;
    margin-bottom: 4rem;
  }
  .question_no {
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  .contentbox {
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: flex-end;
    min-height: 12rem;
    min-width: 10rem;
    max-height: 12rem;
    max-width: 10rem;
    padding: 0 !important;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

    /* padding-bottom: 1rem; */
  }
  @media screen and (max-width: 1333px) {
    .progressBar {
      width: 28rem;
    }
  }
  @media screen and (max-width: 1086px) {
    .progressBar {
      width: 24rem;
    }
  }
  @media screen and (max-width: 1022px) {
    .progressBar {
      width: 21rem;
    }
  }
  @media screen and (max-width: 768px) {
    .progressBar {
      width: 18rem;
    }
  }
  @media screen and (max-width: 560px) {
    .progressBar {
      width: 12rem;
    }
  }
`;
