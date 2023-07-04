import codes from 'country-calling-code';
import React, { useEffect, useState } from 'react';
import { BriefcaseFill, HouseDoorFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { NotificationManager } from 'react-notifications';
import styled from 'styled-components';

const CheckOutPopUp = (props) => {

  const radios = [
    { value: 'Office', Icon: <BriefcaseFill className=' m-2 object-fit-cover ' /> },
    { value: 'Home', Icon: <HouseDoorFill className=' m-2 object-fit-cover ' /> },
  ];

  useEffect(() => {
    if (localStorage.getItem('checkoutInfo')) {
      setEditValues(JSON.parse(localStorage.getItem('checkoutInfo')));
    }
  }, [])

  const [editValues, setEditValues] = useState({
    name: '',
    phoneNum: '',
    province: '',
    city: '',
    countryCode: '',
    country: '',
    address: '',
    delivery: '',
  });


  const updateLocalStorageData = () => {
    localStorage.setItem('checkoutInfo', JSON.stringify(editValues));
    NotificationManager.success('Your delivery information is updated successfully!', 'Success!', 3000)
    props.setEditBtn(false)
    props.getDeliveryInfoProp(JSON.parse(localStorage.getItem('checkoutInfo')));
  }

  function submit() {
    editValues.name === '' ? NotificationManager.error('Please fill name field!', 'Alert!', 3000) :
      editValues.countryCode === '' ? NotificationManager.error('Please fill country code field!', 'Alert!', 3000) :
        editValues.phoneNum === '' ? NotificationManager.error('Please fill phone number code field!', 'Alert!', 3000) :
          editValues.province === '' ? NotificationManager.error('Please fill province field!', 'Alert!', 3000) :
            editValues.city === '' ? NotificationManager.error('Please fill city field!', 'Alert!', 3000) :
              editValues.country === '' ? NotificationManager.error('Please fill country field!', 'Alert!', 3000) :
                editValues.address === '' ? NotificationManager.error('Please fill address field!', 'Alert!', 3000) :
                  editValues.delivery === '' ? NotificationManager.error('Please fill delivery field!', 'Alert!', 3000) :
                    updateLocalStorageData();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditValues({ ...editValues, [name]: value });
  }


  return (
    <CheckOutPopUpContainer>
      {
        props.editBtn ? (<Modal size='lg' show={props.editBtn}>
          <Modal.Header closeButton onClick={() => props.setEditBtn(false)}>
            <Modal.Title>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type="text"
                  placeholder="Name"
                  value={editValues.name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
                <br />
                <select className='w-25 form-select' name="countryCode" onChange={handleChange} value={editValues.countryCode}  >
                  {
                    codes.map((data, key) => (

                      <option key={key} value={data.countryCodes[0]} > +{data.countryCodes[0]} ({data.country})</option>
                    ))
                  }
                </select>
                <Form.Control
                  type="tel"
                  name="phoneNum"
                  className='w-75'
                  placeholder="Enter Your Phone Number"
                  value={editValues.phoneNum}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
                  placeholder="Enter Your Province"
                  value={editValues.province}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter Your Province"
                  value={editValues.city}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter Your City"
                  value={editValues.country}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  value={editValues.address}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
            <div className='deliveryDiv w-100'>
              <p className='fw-light'> Select a label for effective delivery</p>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton className={`rounded-circle h-75 w-50 p-2 m-2 ${radio.value === editValues.delivery ? 'bg-success text-light' : 'bg-light text-dark'}`}
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="delivery"
                    value={radio.value}
                    checked={editValues.delivery === radio.value}
                    onChange={handleChange}
                  >
                    {radio.Icon}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => props.setEditBtn(false)}>
              Close
            </Button>
            <Button variant="success" onClick={submit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>) : ""
      }
    </CheckOutPopUpContainer>

  );
}
const CheckOutPopUpContainer = styled.div`
.deliveryDiv{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.deliveryDiv .Icon {
    font-size: 50px;
} 
`
export default CheckOutPopUp;