import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import LeftArrow from '../../assets/images/left_arrow.png';
import profilePicture from '../../assets/images/pic.png';
import RightArrow from '../../assets/images/right_arrow.png';
import Star from '../../assets/images/star.png';
import './liveSection.css';

export default function LiveSection() {
  const [items, setItems] = useState();
  // const contentWrapper = useRef(null);

  useEffect(() => {
    setItems([
      {
        id: 1,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      },
      {
        id: 2,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      },
      {
        id: 3,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      },
      {
        id: 4,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      },
      {
        id: 5,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      },
      {
        id: 6,
        name: 'Decosta Wereko',
        lessonsCount: 44,
        teaches: 'Twi',
        stars: 5,
        totalRates: 2,
        image: profilePicture
      }
    ]);
  }, []);
  // const scroll = (scrollOffset) => {
  //   scrollElement.current.scrollLeft += scrollOffset;
  // };
  function slide(direction) {
    var container = document.getElementById('my-row');
    let scrollCompleted = 0;
    var slideVar = setInterval(function () {
      if (direction === 'left') {
        container.scrollBy({
          top: 0,
          left: -10,
          behavior: 'smooth'
        });
        // container.scrollLeft -= 10;
      } else {
        container.scrollBy({
          top: 0,
          left: 10,
          behavior: 'smooth'
        });
      }
      scrollCompleted += 10;
      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 50);
  }
  return (
    <StyledLiveSection>
      <div className="lmain">
        <Container
          fluid="md"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}>
          <div className="LiveSection">
            <div>
              Live <span style={{ fontWeight: 'bold' }}>Classes</span>
            </div>

            <div className="ArrowSection">
              <img
                className="cursor-pointer"
                onClick={() => slide('left')}
                src={LeftArrow}
                width="35px"
              />
              <div className="ArrowSpacing">
                <img
                  onClick={() => slide('left')}
                  src={LeftArrow}
                  width="25px"
                  className="cursor-pointer ArrowSectionOpacity"
                />

                <img
                  className="cursor-pointer"
                  onClick={() => slide('right')}
                  src={RightArrow}
                  width="35px"
                />
              </div>
            </div>
          </div>
        </Container>
        <div>
          <Container fluid="md">
            <Row className="profile_row" id="my-row">
              {/* <ReactCardCarousel> */}

              {items?.map((item) => {
                return (
                  <Col key={item.id}>
                    <div className="profile" style={{ backgroundImage: `url(${item.image})` }}>
                      <div className="pcontent">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                          }}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '192px',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0px 10px'
                            }}>
                            <p
                              style={{
                                fontWeight: 'bold',
                                fontSize: '14px'
                              }}>
                              {item.name}
                            </p>
                            <p
                              style={{
                                fontWeight: '400',
                                fontSize: '10px'
                              }}>
                              {item.lessonsCount} lessons
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '192px',
                              justifyContent: 'space-between',
                              padding: '0px 10px'
                            }}>
                            <p
                              style={{
                                fontWeight: '400',
                                fontSize: '15px'
                              }}>
                              Teaches {item.teaches}
                            </p>
                            <p
                              style={{
                                fontWeight: '500',
                                fontSize: '16px'
                              }}>
                              {item.stars}
                              <span>
                                <img src={Star} />
                              </span>
                              {`(${item.totalRates})`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
              {/* </ReactCardCarousel> */}
            </Row>
          </Container>
        </div>
      </div>
    </StyledLiveSection>
  );
}

const StyledLiveSection = styled.div``;
