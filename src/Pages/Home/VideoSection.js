import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import laptopImage from '../../assets/images/VideoPlayer.png';
import './videoSection.css';
export default function VideoSection() {
  const [selectedSubject, setSelectedSubject] = useState(1);
  const [items, setItems] = useState();
  useEffect(() => {
    setItems([
      {
        id: 1,
        name: 'English'
      },
      {
        id: 2,
        name: 'Esan'
      },
      {
        id: 3,
        name: 'Yoruba'
      },
      {
        id: 4,
        name: 'Hausa'
      },
      {
        id: 5,
        name: 'Sawahili'
      },
      {
        id: 6,
        name: 'Twi'
      },
      {
        id: 7,
        name: 'OsoZulu'
      },
      {
        id: 8,
        name: 'IsiXhosa'
      },
      {
        id: 9,
        name: 'Other'
      }
    ]);
  }, []);
  return (
    <>
      <div className="main">
        <div className="videolayout">
          <div id="container">
            <div className="green"></div>
            <div className="red"></div>
            <div className="box">
              <img className="laptop" src={laptopImage} alt="" width="50%" />
              <br />
              <br />
              <Row
                className="subjects"
                style={{
                  width: '90%'
                  // marginRight: 'auto',
                  // marginLeft: 'auto',
                }}>
                {items?.map((item, index) => {
                  if (index < 5) {
                    return (
                      <Col>
                        <button
                          style={{
                            border: '2px solid #FBAF41',
                            borderRadius: '9px',
                            background: 'none',
                            color: 'white',
                            fontWeight: 600,
                            boxShadow: '0px 13px 38px #00000029',
                            padding: `5px ${
                              item.name.length < 5 ? item.name.length * 15 : item.name.length * 10
                            }px`,
                            fontSize: '16px',
                            cursor: 'pointer'
                          }}>
                          {item.name}
                        </button>
                      </Col>
                    );
                  }
                })}
              </Row>
              <br />
              <Row
                className="g-1 subjects"
                style={{
                  width: '90%'
                  // marginRight: 'auto',
                  // marginLeft: 'auto',
                }}>
                {items?.map((item, index) => {
                  if (index > 4) {
                    return (
                      <Col>
                        <button
                          style={{
                            border: '2px solid #FBAF41',
                            borderRadius: '9px',
                            background: 'none',
                            color: 'white',
                            fontWeight: 600,

                            boxShadow: '0px 13px 38px #00000029',
                            padding: `5px ${
                              item.name.length < 5 ? item.name.length * 15 : item.name.length * 10
                            }px`,
                            fontSize: '16px',
                            cursor: 'pointer'
                          }}>
                          {item.name}
                        </button>
                      </Col>
                    );
                  }
                })}
              </Row>
              <div className="mob_subjects">
                {items?.map((item, index) => {
                  return index < 10 ? (
                    <div
                      className="s_subject_item"
                      style={{
                        background: `${selectedSubject === item.id ? '#499a6b' : '#e3eaf0'}`,
                        border: `${selectedSubject === item.id ? '2px solid #f19c01' : ''}`
                        // border: '2px solid #f19c01',
                      }}
                      onClick={() => {
                        setSelectedSubject(item.id);
                      }}>
                      {item.name}
                    </div>
                  ) : null;
                })}
              </div>
              {/* <Row className='mob_subjects'>
                {items?.map((item, index) => {
                  return index === 0 ? (
                    <Col className='s_subject_item'>{item.name}</Col>
                  ) : null;
                })}
              </Row> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
