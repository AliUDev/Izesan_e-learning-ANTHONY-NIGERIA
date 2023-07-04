import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';


const ProductPopup = (props) => {

    const navigate = useNavigate();

    const [pop, setpop] = useState(true);
    const [itemData, setitemData] = useState({});
    const [loading, setloading] = useState(true);
    const [productIndex, setproductIndex] = useState(0);
    const [radioValue, setRadioValue] = useState('s');
    const [productsAdded, setproductsAdded] = useState(1);
    const [colorSelected, setcolorSelected] = useState('');
    console.log(colorSelected);

    useEffect(() => {
        axios.post(`${api}list-product`, {
            category_id: props?.urlId
        })
            .then((res) => {
                setitemData(res?.data.data.data[props.productIndex])
                setcolorSelected(res?.data.data.data[props.productIndex]?.images[0].color);
                setloading(false)
            }).catch((err) => {
                console.log(err)
            })

    }, [props.productIndex])


    const productVarient = (key) => {
        setproductIndex(key)
    }


    const radios = [
        { name: 'S', value: 's' },
        { name: 'L', value: 'l' },
        { name: 'XL', value: 'xl' },
    ];



    const addToCart = () => {
        if (radioValue === '') {
            alert("Please select shirt size")
        } else if (colorSelected === '') {
            alert("Please select shirt color")
        } else if (productsAdded === 0) {
            alert("Please add atleast 1 product in cart")
        } else {
            const userInfo = JSON.parse(localStorage.getItem('all_data'))
            const user_email = userInfo[0].email_id;
            axios.post(`${api}add-cart`, {
                'selected_image': itemData?.images[productIndex]?.image,
                'product_id': itemData.id,
                'quantity': productsAdded,
                'email_id': user_email,
                'selected_color': colorSelected,
                'selected_size': radioValue,

            })
                .then((res) => {
                    console.log(res)
                    navigate('/dweki/cart');
                }).catch((err) => {
                    console.log(err)
                })

        }
    }
    // console.log(itemData?.images[productIndex]?.image)

    return (
        <div>
            <Modal show={pop} fullscreen onHide={() => props.handlePopupState(false) + setpop(false)}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <div style={{ overflowY: "scroll" }}>
                            <Modal.Header closeButton >
                                <Modal.Title>{itemData?.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "rgb(0,0,0,0.1)", overflowY: "scroll" }}>
                                <ModalWrapperParent >
                                    <div className='row p-3' >
                                        <div className='col-xl-5 col-md-12'>
                                            <img width="100%" src={`${storage_api + itemData?.images[productIndex]?.image}`} alt='...' />
                                        </div>
                                        <div className='col-xl-7 col-md-12 p-4 ' >
                                            <h3>Price: <span className='text-success'>${itemData.price}</span></h3>
                                            <h3 className='mt-3'>Select size:</h3>
                                            {radios.map((radio, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant='outline-warning'
                                                    name="radio"
                                                    className='mx-1 mt-3'
                                                    value={radio.value}
                                                    checked={radioValue === radio.value}
                                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                            <h4 className='mt-3'>Select Color:</h4>
                                            {
                                                itemData?.images.map((data, key) => (
                                                    <div>
                                                        <span>
                                                            {
                                                                productIndex === key &&
                                                                <i className="bi bi-check2 mx-2 " style={{ fontSize: "20px" }}></i>
                                                            }
                                                        </span><button onClick={() => productVarient(key) + setcolorSelected(data.color)} className='btn btn-lg shadow-sm' style={{ backgroundColor: `${data.color}` }}></button>
                                                    </div>
                                                ))
                                            }
                                            <br />
                                            <div className='row'>
                                                <button className='btn btn-outline-success product_add_removing_btn' onClick={() => setproductsAdded(productsAdded > 1 ? productsAdded - 1 : 1)} >-</button>
                                                <button className='btn w-25' >{productsAdded}</button>
                                                <button className='btn btn-outline-success product_add_removing_btn' onClick={() => setproductsAdded(productsAdded + 1)} >+</button>
                                            </div>
                                            <button onClick={addToCart} className='btn btn-warning mt-4 w-50 btn-lg'><i className="bi bi-cart px-3"></i>Add to Cart</button>
                                        </div>
                                    </div>
                                </ModalWrapperParent>
                            </Modal.Body>
                        </div>
                    )
                }
            </Modal>
        </div>
    )
}

export default ProductPopup

const ModalWrapperParent = styled.div`
    .product_add_removing_btn{
        width:40px;
    }
    img{
        border: 4px solid orange;
        border-radius: 15px;
    }
`