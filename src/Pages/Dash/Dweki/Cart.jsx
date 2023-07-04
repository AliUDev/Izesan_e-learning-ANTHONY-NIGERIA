import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';
import CartIcon from './CartIcon';
import ItemDeleteButton from './ItemDeleteButton';
const Cart = () => {


    const [loading, setloading] = useState(false);

    const [cartData, setcartData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('all_data'))
    const user_email = userInfo[0].email_id;

    const getDataFunc = () => {
        // setloading(true)
        axios.post(`${api}list-cart`, {
            email_id: user_email
        })
            .then((res) => {
                setcartData(res.data.data);
                // setloading(false);
                const items = JSON.stringify(res.data.data);
                localStorage.setItem('cart_checkOut_items', items)

            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getDataFunc()
    }, [])

    const reloadFunction = () => {
        getDataFunc()
    }

    const updateCart = (key, newQunaity) => {
        axios.post(`${api}edit-cart`, {
            id: key,
            quantity: newQunaity
        })
            .then((res) => {
                getDataFunc();
            }).catch((err) => {
                console.log(err);
            })
    }

    const removeOne = (key, quantity) => {
        const newQunaity = quantity - 1;
        updateCart(key, newQunaity)

    }
    const addOne = (key, quantity) => {
        const newQunaity = quantity + 1;
        updateCart(key, newQunaity)

    }

    const deliveryCharges = 10;

    const subTotal = cartData?.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.price);
    }, 0);

    const grandTotal = deliveryCharges + subTotal;





    return (
        <div className='p-3'>
            {
                loading ?
                    <Loader />
                    : <></>
            }
            <CartIcon />
            <h3 className='text-center p-2 text-decoration-underline pb-0 '>Cart</h3>
            {
                cartData.length > 0 ? (
                    <div>
                        {
                            cartData?.map((data, key) => (
                                <CartParent key={key}>
                                    <div className=' cart_items_list row p-3 my-4 rounded border border-warning' >
                                        <div className='col-xl-5 col-md-12'>
                                            <img width="100%" src={`${storage_api + data?.selected_image}`} alt='...' />
                                        </div>
                                        <div className='col-xl-7 col-md-12 p-4 ' >
                                            <div style={{ float: "right" }} className="fs-4 ">
                                                <ItemDeleteButton
                                                    itemKey={data.id}
                                                    handleReload={reloadFunction}
                                                />
                                            </div>
                                            <h2>{data.name}</h2>
                                            <button className='btn btn-lg shadow-sm border border-dark' style={{ backgroundColor: `${data.selected_color}` }}></button>
                                            <p className='fs-5 mt-2'>Size: <span className='text-success text-uppercase'>{data.selected_size}</span></p>
                                            <p className='fs-5'>Price: <span className='text-success'>${data.price}</span></p>
                                            <div className='row'>
                                                {
                                                    data.quantity === 1 ? (
                                                        <button className='btn btn-outline-danger product_add_removing_btn p-0'>
                                                            <ItemDeleteButton
                                                                itemKey={data.id}
                                                                handleReload={reloadFunction}
                                                            />
                                                        </button>

                                                    ) : (

                                                        <button className='btn btn-outline-success product_add_removing_btn' onClick={() => removeOne(data.id, data.quantity)} >-</button>
                                                    )
                                                }
                                                <button className='btn w-25' >{data.quantity}</button>
                                                <button className='btn btn-outline-success product_add_removing_btn' onClick={() => addOne(data.id, data.quantity)} >+</button>
                                            </div>
                                        </div>
                                    </div>

                                </CartParent>
                            ))
                        }

                        <div className='p-3'>
                            <div className='d-flex justify-content-between px-4'>
                                <h3>Subtotal</h3>
                                <h5>$ {subTotal}</h5>
                            </div>
                            <div className='d-flex justify-content-between px-4'>
                                <h3>Delivery</h3>
                                <h5>$ {deliveryCharges}</h5>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between px-4'>
                                <h3>Total</h3>
                                <h5>$ {grandTotal}</h5>
                            </div>
                            <Link to="/dweki/checkout"><button className='btn btn-success w-100 '>Checkout</button></Link>
                        </div>

                    </div>
                ) : (
                    <NocontentParent>

                        <div className='no_item'>

                            <div>No data in Cart</div>

                        </div>
                    </NocontentParent>
                )
            }
        </div >
    )
}

export default Cart

const NocontentParent = styled.div`
.no_item{
    display: grid;
    place-items: center;
}
`
const CartParent = styled.div`
padding: 0 50px;

.cart_items_list{
    transition-duration: 150ms;
}
.cart_items_list:hover{
    /* transform: scale(1.02); */
    transition-duration: 150ms;
    cursor: pointer;
    box-shadow: 0 0 4px 3px rgb(0,0,0,0.1);
}
.cart_items_list:hover img{
    transform: scale(1.1) ;
  transform-origin: 50% 55%;
    transition-duration: 450ms;
}


.product_add_removing_btn{
        width:40px;
    }
.no_item{
    display: grid;
    place-items: center;
}

`