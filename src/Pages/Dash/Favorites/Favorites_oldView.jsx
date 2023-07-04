import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import styled from 'styled-components';
import Corner from '../../../assets/images/corner_fvrt.png';
import Doctor from '../../../assets/images/doctor.png';
import DropDownIcon from '../../../assets/images/dropdown_icon_2.png';
import Guitar from '../../../assets/images/guitarboy.png';
import Heading from '../../../Components/Common/Heading';
function Favorites() {
  const [items, setItems] = useState();

  useEffect(() => {
    setItems([
      {
        id: 1,
        name: 'Play the guitar',
        avatar: Guitar
      },
      {
        id: 2,
        name: 'A Doctor',
        avatar: Doctor
      },
      {
        id: 3,
        name: 'Play the guitar',
        avatar: Guitar
      },
      {
        id: 4,
        name: 'A Doctor',
        avatar: Doctor
      }
    ]);
  }, []);
  return (
    <StyledFavorites>
      
      <Heading title="Favorites" />
      <div style={{ width: '100%' }}>
        <div className="mt-5">
          <select className="form-select" aria-label="Filter select">
            <option selected>Esan</option>
            <option value="1">Esan</option>
            <option value="2">Esan</option>
            <option value="3">Esan</option>
          </select>
          {/* <InputGroup
            className="mb-3"
            style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #B7B7B7',
              marginTop: '1rem',
              marginRight: '1rem',
              height: '4rem'
            }}>
            <FormControl
              className="customsearch"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text>
              <img src={DropDown} width="10px" />
            </InputGroup.Text>
          </InputGroup> */}
        </div>
        <Row className="mt-5 gy-5 justify-content-center">
          {items?.map((item) => {
            return (
              <Col
                key={item.id}
                className="col col-sm-6 col-md-4 col-lg-4 col-xl-3 lessoncards mx-auto">
                <Card
                  style={{
                    width: 'auto',
                    marginBottom: '1rem',
                    marginTop: '1rem',
                    borderRadius: '0.5rem',
                    border: '2px solid #F94848'
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'right'
                    }}>
                    <Card.Img
                      variant="top"
                      style={{
                        height: 'auto',
                        width: 'auto',
                        margin: '-1px'
                      }}
                      src={Corner}
                    />
                  </div>
                  <Card.Img
                    variant="top"
                    style={{
                      height: 'auto',
                      width: 'auto',
                      padding: '1rem'
                    }}
                    src={item.avatar}
                  />
                  <Card.Body
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '40px',
                      color: 'white',
                      backgroundColor: '#F94848'
                    }}>
                    <Card.Text>
                      <p style={{ margin: '2px' }}>{item.name}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </StyledFavorites>
  );
}

export default Favorites;

const StyledFavorites = styled.div`
  padding: 2rem 1rem;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent url(${DropDownIcon}) no-repeat 99% center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .form-select {
    font-weight: 600 !important;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
