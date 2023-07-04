import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import styled from 'styled-components';

import BlueSpeaker from '../../assets/images/blue_speaker.png';
import Heart from '../../assets/images/heart.png';
import LessonDetailsIcon from '../../assets/images/lesson_details2.png';

function Lesson2() {
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
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
            // width: "42rem",
          }}>
          <Col
            style={{
              fontWeight: '600'
            }}>
            30%
          </Col>
          <Col>
            <div className="progressBar2">
              <ProgressBar now={30} />
            </div>
          </Col>
          <Col>
            <img
              className="heartimage"
              style={{
                width: '1.5rem',
                height: '1.5rem',
                marginLeft: '3rem'
              }}
              src={Heart}
            />
          </Col>
        </Row>
        {/* Statement */}
        <Row>
          <p className="tasktodo">Translate this sentence</p>
        </Row>
        {/* Lesson picture */}
        <Row className="lessondiv">
          <Col>
            <img className="taskimage" src={LessonDetailsIcon} alt="img" />
          </Col>
          <Col>
            <img
              className="bluespeaker2"
              style={{
                height: '2rem',
                width: '3rem',
                marginLeft: '2rem'
              }}
              src={BlueSpeaker}
            />
          </Col>
          {/* <Col>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                // background: `white`,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <img
                className="nextimage2"
                style={{
                  height: '3rem',
                  width: '3rem',
                  marginBottom: '4rem',
                  marginLeft: '5rem'
                }}
                src={Next}
              />
            </div>
          </Col> */}
        </Row>
        {/* Boxes */}
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            alignItems: 'flex-start'
            // width: "52rem",
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around'
              // width: "52rem",
            }}>
            {['Hello', 'I', 'am', 'Emrah'].map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    color: 'black',
                    background: '#E1E1E1',
                    paddingRight: '1rem',
                    paddingLeft: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginRight: '1rem'
                  }}>
                  {item}
                </p>
              );
            })}

            {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              // background: `white`,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >


            <img
              style={{
                height: "3rem",
                width: "3rem",
                marginBottom: "4rem",
              }}
              src={Next}
            />
          </div> */}
          </div>
          <hr
            style={{
              border: 'none',
              borderTop: '1px dotted #707070',
              color: '#fff',
              backgroundColor: '#fff',
              height: '1px'
              // width: "25rem",
            }}
          />
          <hr
            style={{
              border: 'none',
              borderTop: '1px solid #707070',
              color: '#fff',
              backgroundColor: '#fff',
              height: '1px'
              // width: "25rem",
            }}
          />

          <div
            className="testinf"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start'
              // width: "52rem",
            }}>
            {['run', 'Communication'].map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    color: 'black',
                    background: '#E1E1E1',
                    paddingRight: '1rem',
                    paddingLeft: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginRight: '1rem'
                  }}>
                  {item}
                </p>
              );
            })}
          </div>
        </Row>
        {/* submit button */}
        <div>
          <Button
            style={{
              marginTop: '6rem',
              background: '#F19C00',
              border: '0',
              paddingRight: '6rem',
              paddingLeft: '6rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}>
            Submit
          </Button>
        </div>
      </Container>
    </StyledLayout>
  );
}

export default Lesson2;

const StyledLayout = styled.div`
  .progressBar2 {
    margin-top: 0.2rem;
    width: 32rem;
  }
  .boxarea2 {
    display: flex;
    align-items: center;
  }
  .progress-bar {
    background-color: #a1d363 !important;
  }
  .question2 {
    font-weight: 700;
  }
  .question_no2 {
    font-weight: 800;
    text-transform: uppercase;
  }
  .contentbox2 {
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
  .tasktodo {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1rem;
  }
  .taskimage {
    height: 229px;
    width: 267px;
  }
  .lessondiv {
    display: flex;
    flex-direction: row;
    margin-bottom: 4rem;
    margin-top: 2rem;
    margin-left: 6rem;
  }

  @media screen and (max-width: 1333px) {
    .progressBar2 {
      width: 28rem;
    }
  }
  @media screen and (max-width: 1272px) {
    .lessondiv {
      margin-left: 6rem;
    }
  }
  @media screen and (max-width: 1176px) {
    .lessondiv {
      margin-left: 6rem;
    }
  }
  @media screen and (max-width: 1144px) {
    .progressBar2 {
      width: 18rem;
    }
    .lessondiv {
      margin-left: 4rem;
    }
  }
  @media screen and (max-width: 1086px) {
    .progressBar2 {
      width: 16rem;
    }
    .tasktodo {
      font-size: 1.5rem;
    }
    .nextimage2 {
      margin-left: 0rem;
    }
    .bluespeaker2 {
      margin-left: 1rem;
    }
    .taskimage {
      height: 183.2px;
      width: 213.6px;
    }
  }
  @media screen and (max-width: 1026px) {
    .progressBar2 {
      width: 20rem;
    }
    .bluespeaker2 {
      margin-left: 0rem;
    }
    .lessondiv {
      margin-left: 2rem;
    }
    .col {
      padding-left: 0rem !important;
    }
  }
  /* @media screen and (max-width: 888px) {
  .lessondiv {
    margin-left: rem;
  }
} */

  @media screen and (max-width: 770px) {
    .progressBar2 {
      width: 16rem;
    }

    .col {
      padding-left: 0rem !important;
    }
    .heartimage {
      margin-left: 1rem;
    }
  }

  @media screen and (max-width: 704px) {
    .progressBar2 {
      width: 12rem;
    }
    .col {
      padding-left: 0rem !important;
    }
    .heartimage {
      margin-left: 1rem;
    }
    .bluespeaker2 {
      margin-left: 0rem;
    }
    .taskimage {
      height: 137.4px;
      width: 160.2px;
    }
  }

  @media screen and (max-width: 563px) {
    .progressBar2 {
      width: 12rem;
    }
    .taskimage {
      height: 137.4px;
      width: 160.2px;
    }
  }

  @media screen and (max-width: 540px) {
    .progressBar2 {
      width: 12rem;
    }
    .taskimage {
      height: 109.92px;
      width: 128.16px;
    }
    .tasktodo {
      font-size: 1rem;
    }
    .col {
      padding-right: 0rem !important;
    }
  }
`;
