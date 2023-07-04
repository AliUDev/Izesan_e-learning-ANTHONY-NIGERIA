import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';
import ProductPopup from './ProductPopup';

const DwekiProducts = (props) => {

    const category_Id = props?.category;
    const [urlId, seturlId] = useState('');
    const [productsData, setproductsData] = useState([]);
    console.log(productsData)
    const [productpopup, setproductpopup] = useState(false);
    const [productIndex, setproductIndex] = useState(0);
    const [pagination, setpagination] = useState({});
    const [loading, setloading] = useState(false);



    useEffect(() => {
        setloading(true)
        props.category === 'All' ? seturlId('') : seturlId(props.category)
        axios.post(`${api}list-product`, {
            category_id: urlId
        })
            .then((res) => {
                setpagination(res?.data.data)
                setproductsData(res?.data.data.data)
                setloading(false)

            }).catch((err) => {
                console.log(err)
            })
    }, [category_Id, props.category, urlId])

    const handlePopupState = (key) => {
        setproductpopup(key)
    }




    return (
        <div>
            {
                loading ?
                    <Loader />
                    : <></>
            }
            <DwekiProductsParent>
                <div className="row m-0">
                    {
                        productsData?.map((data, key) => (
                            <div key={key} className="col-xl-4 col-md-4 col-sm-6 col-12 mb-3">
                                <Card className='card_body' onClick={() => setproductpopup(true) + setproductIndex(key)} >
                                    <LazyLoadImage
                                        effect="blur"
                                        height={200}
                                        width="100%"
                                        src={`${storage_api}${data?.images[0].image}`}
                                        // placeholderSrc={`${storage_api}${data?.images[0].image}`}
                                        alt="..." />
                                    <Card.Body className="text-center">{data.name}</Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </DwekiProductsParent>
            {
                productpopup &&
                <ProductPopup
                    show={productpopup}
                    handlePopupState={handlePopupState}
                    productIndex={productIndex}
                    urlId={urlId}
                />
            }
        </div>
    )
}

export default DwekiProducts

const DwekiProductsParent = styled.div`
 .card_body{
    cursor: pointer;
    box-shadow: 0 0 5px 2px rgb(0,0,0, 0.2);
    border: 1px solid orange;
    transition-duration: 140ms;
}
 .card_body:hover{
    transform: scale(1.02);
    transition-duration: 140ms;
}
`