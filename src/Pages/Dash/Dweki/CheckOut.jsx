// import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CashCoin, Clipboard2Check, CreditCard, GeoAltFill, PencilFill, TelephoneFill } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api, paystackPublicKey } from '../../../url';
import CheckOutPopUp from './CheckOutPopUp';

const CheckOut = (props) => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [userInfo, setuserInfo] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const username = localStorage.getItem('all_data');
    const parsedUsername = JSON.parse(username);

    const getDeliveryInfoProp = (key) => {
        setuserInfo(key);
    }
    useEffect(() => {
        setuserInfo(JSON.parse(localStorage.getItem('checkoutInfo')));
        const cartItemsLocal = localStorage.getItem('cart_checkOut_items');
        setCartItems(JSON.parse(cartItemsLocal));
    }, [props.getDeliveryInfoProp])


    const deliveryCharges = 10;

    const subTotal = cartItems?.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.price);
    }, 0);

    const grandTotal = deliveryCharges + subTotal;


    const config = {
        reference: (new Date()).getTime().toString(),
        email: "a" + parsedUsername[0]?.email_id,
        amount: grandTotal, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: paystackPublicKey,
    };

    console.log(`User Info`, userInfo);


    const orderPlaceSuccessfully = () => {

        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;




        axios.post(`${api}order-place`, {
            first_name: userInfo.name,
            last_name: '...',
            phone: userInfo.phoneNum,
            address_line_1: userInfo.address,
            city: userInfo.city,
            state: userInfo.province,
            country: userInfo.country,
            notes: 'nill',
            order_time: formattedDate,
            email_id: parsedUsername[0].email_id,
        })
            .then((res) => {
                NotificationManager.success('Your order has been placed successfully!', 'Success!', 3000)
                console.log(res);
                navigate('/dweki/my-orders')
            }).catch((err) => {
                console.log(err)
            })
    }

    // you can call this function anything
    const onSuccess = (reference) => {
        console.log(reference);
        if (reference.status === 'success') {
            localStorage.removeItem('cart_checkOut_items');
            orderPlaceSuccessfully();
        }
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <div>
                <button className="btn btn-success w-100" onClick={() => {
                    userInfo ?
                        initializePayment(onSuccess, onClose)
                        : alert("Please add your Delivery Information")
                }}>Place Order</button>
            </div>
        );
    };


    return (
        <CheckOutComponent>
            <Container>
                <div className='checkoutwrapper m-1 shadow-sm border border-light bg-body-tertiary rounded p-3'>
                    <div className='nameContainer d-flex mb-3 '>
                        <div className="p-2">
                            <GeoAltFill className='fs-3 m-2 text-success' />
                        </div>
                        <div className="p-1 text-start">
                            <span className="fs-6 fw-semibold">{userInfo?.name ? userInfo.name : parsedUsername[0]?.name}</span>
                            <br /> <span className='fs-6 fw-lighter'>{userInfo?.address ? userInfo.address : "Delivery Address"}</span>
                        </div>
                        <div className="ms-auto m-2 p-2 fs-6 text-success" role="button" onClick={() => setEdit(true)}><PencilFill /></div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="p-2 flex-shrink-1 text-success fs-3 m-2"><TelephoneFill /></div>
                        <div className="w-100 h-80 bg-light text-center fs-6">{userInfo?.phoneNum ? userInfo.phoneNum : '+1(234)xxxxxxx'}</div>
                    </div>
                </div>
                <div className='checkoutwrapper m-1 shadow-sm border border-light bg-body-tertiary rounded p-3'>
                    <div className="d-flex align-items-center">
                        <div className="p-1 flex-shrink-1 text-success fs-3 m-2"><CreditCard /></div>
                        <div className="w-100 text-start fs-6">
                            <h3 className='fs-6 m-2'>Payment Method </h3>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-1 p-1 text-success fs-3 m-2"><CashCoin /></div>
                        <div className="w-100 text-start fs-6">
                            <h3 className='fs-6 m-2'>Credit Card </h3>
                        </div>
                    </div>
                </div>
                <div className='checkoutwrapper m-1 shadow-sm border border-light bg-body-tertiary rounded p-3'>
                    <div className="d-flex align-items-center">
                        <div className="p-2 flex-shrink-1 text-success fs-3 m-2"><Clipboard2Check /></div>
                        <div className="w-100 text-start fs-6">
                            <h3 className='fs-6 m-2'>Order Summary</h3>
                        </div>
                    </div>
                    {
                        cartItems?.map((data, key) => (
                            <div className="d-flex" key={key} >
                                <div className="  m-2 p-2 w-100 text-start text-warning fw-bold"><p><span className='text-dark text-muted'>{key + 1}) </span>{data.name}</p></div>
                                <div className="flex-shrink-1 m-2 fs-6 p-1">${data.price}x{data.quantity}</div>
                            </div>
                        ))
                    }
                    <div className='checkoutwrapper border border-light bg-body-tertiary rounded'>
                        <div className="d-flex">
                            <div className="  m-2 p-1 w-100 text-start "><h6 className='fs-6'>Subtotal</h6></div>
                            <div className="flex-shrink-1 m-2 fs-6 p-1">${subTotal && subTotal}</div>
                        </div>
                        <div className="d-flex">
                            <div className="  m-2 p-1 w-100 text-start "><h6 className='fs-6'>Delivery Fee</h6></div>
                            <div className="flex-shrink-1 m-2 fs-6 p-1">${deliveryCharges && deliveryCharges}</div>
                        </div>
                    </div>

                </div>
                <div className="d-flex fw-bold">
                    <div className="  m-2 p-1 w-100 text-start fs-5 "><h6 className='fs-6'>Total(incl.VAT)</h6></div>
                    <div className="flex-shrink-1 m-2 fs-5 p-1">${grandTotal && grandTotal}</div>
                </div>
                <PaystackHookExample />
            </Container>
            {edit &&
                <CheckOutPopUp editBtn={edit} setEditBtn={setEdit} getDeliveryInfoProp={getDeliveryInfoProp} />}
        </CheckOutComponent>
    );
}
export default CheckOut;

const CheckOutComponent = styled.div`
    
`