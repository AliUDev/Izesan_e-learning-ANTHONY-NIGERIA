import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

export default function Acheivment() {
  const [items, setItems] = useState();
  useEffect(() => {
    setItems([
      {
        id: 1,
        name: 'Online Course',
        number: '2400+',
        style: 'colorclass-blue'
      },
      {
        id: 2,
        name: 'Enroll Student',
        number: '99,854+',
        style: 'colorclass-green'
      },
      {
        id: 3,
        name: 'Expert Instructor',
        number: '650+',
        style: 'colorclass-yellow'
      },
      {
        id: 4,
        name: 'Profile Review',
        number: '1820+',
        style: 'colorclass-red'
      }
    ]);
  }, []);
  return (
    <StyledAcheivement>
      <div className="achievelayout">
        <div>
          <p className="title fw-bold h3">Our Achievements</p>
        </div>
        <div>
          <p className="contents">
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour
          </p>
        </div>
        <div>
          <Container fluid="md">
            <Row className="jsutify-content-around">
              {items?.map((item) => {
                return (
                  <Col xs={12} sm={6} md={4} lg={3} key={item.id} className="testclass">
                    <div className={`itemnumber ${item.style}`}>{item.number}</div>
                    <div className="itemname">{item.name}</div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    </StyledAcheivement>
  );
}

const StyledAcheivement = styled.div`
  margin-top: 5rem;

  .achievelayout {
    width: 100%;
    min-height: 490px;
    text-align: center;
    color: rgb(0, 0, 0);
    background: #eff7ff 0% 0% no-repeat padding-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5rem 1rem;
  }

  .title {
    text-align: center;
    font-family: poppins, sans-serif;
    font-size: 26px;
    letter-spacing: 0px;
    color: #475677;
    opacity: 1;
  }

  .contents {
    width: 80%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    font: normal normal normal 15px/26px Rubik;
    letter-spacing: 0px;
    color: #7d8597;
    opacity: 1;
  }
  .testclass {
    margin-top: 2rem;
  }

  .itemname {
    text-align: center;
    font: normal normal normal 15px/26px Rubik;
    letter-spacing: 0px;
    color: #7d8597;
    opacity: 1;
    margin-top: 0.5rem;
  }

  .itemnumber {
    text-align: center;
    font: normal normal normal 40px/26px Poppins;
    letter-spacing: 0px;
    text-transform: uppercase;
    opacity: 1;
  }

  .colorclass-red {
    color: #e0474e;
  }

  .colorclass-green {
    color: #00b592;
  }

  .colorclass-yellow {
    color: #ffbe58;
  }

  .colorclass-blue {
    color: #2680eb;
  }

  @media screen and (min-width: 576px) {
    .achievelayout {
      padding: 5rem 2rem;
    }

    .title {
      font-size: normal normal bold 48px/60px Poppins;
    }
  }
  @media screen and (min-width: 768px) {
    .achievelayout {
      padding: 5rem;
    }
  }
  @media screen and (min-width: 992px) {
    .achievelayout {
      padding: 5rem 7rem;
    }
  }
  @media screen and (min-width: 1200px) {
    .achievelayout {
      padding: 5rem 8rem;
    }
  }
`;
