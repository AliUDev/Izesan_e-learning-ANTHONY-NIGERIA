import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';
const MyOrder = () => {

    const [myorders, setmyorders] = useState([]);
    const [loading, setloading] = useState(false);

    const getOrders = () => {
        setloading(true);
        const email = localStorage.getItem('email_id')
        axios.post(`${api}order-list`, {
            email_id: email
        })
            .then((res) => {
                setmyorders(res.data.data);
                setloading(false);
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => { getOrders() }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const [pagedItems, setPagedItems] = useState([]);
    const pageSize = 6;
    useEffect(() => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        setPagedItems(myorders.slice(startIndex, endIndex));
    }, [currentPage, myorders, pageSize]);

    const pageCount = Math.ceil(myorders.length / pageSize);
    const pages = Array.from(Array(pageCount).keys());

    const handleClick = page => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    return (
        <div>
            {loading && <Loader />}
            <div className='p-4'>
                {
                    pagedItems?.map((data, key) => (
                        <div key={key} className="d-flex justify-content-between rounded shadow-sm p-4 mb-2">
                            <div>
                                <img style={{ width: "180px" }} src={storage_api + data.selected_image} />
                            </div>
                            <div>
                                <p className='fs-5'>{data.product_name}</p>
                                <p>Quantity: {data.quantity}</p>
                                <p className='text-uppercase'>{data.selected_size}</p>
                                <button className='btn border shadow-sm' style={{ backgroundColor: `${data.selected_color}` }}></button>
                            </div>
                            <div className='align-self-center'>
                                <p className='fs-5'>Amount: <span className='text-success fw-bold'>${data.total_price}</span></p>
                            </div>
                        </div>
                    ))
                }
                <div className='d-flex justify-content-center p-3'>
                    <ul className="pagination">
                        {pages.map(page => (
                            <li
                                key={page}
                                className={page === currentPage ? 'page-item active ' : 'page-item '}
                            >
                                <button onClick={() => handleClick(page)} className="page-link">
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyOrder