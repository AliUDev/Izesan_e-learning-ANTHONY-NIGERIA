import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import { api } from '../../../url';
const DwekiTabs = (props) => {

    const [data, setdata] = useState([]);
    const [key, setKey] = useState('All');
    const [numberofitems, setnumberofitems] = useState('');

    useEffect(() => {
        axios.get(`${api}list-category`)
            .then((res) => {
                setdata(res?.data.data)
            }).catch((err) => {
                console.log(err);
            })

        const userInfo = JSON.parse(localStorage.getItem('all_data'))
        const user_email = userInfo[0].email_id;

        axios.post(`${api}list-cart`, {
            email_id: user_email
        })
            .then((res) => {
                setnumberofitems(res.data.data.length)
            }).catch((err) => {
                console.log(err)
            })

    }, [])

    const handleValue = (key) => {
        setKey(key)
        props.data(key)
    }

    return (
        <div>

            <div className="d-flex justify-content-between px-4">
                <h4>Categories</h4>
                <Link to="/dweki/cart"><i className="bi bi-cart3 fs-2 text-warning"><sup className='text-dark fs-6 fw-bolder'>{numberofitems != 0 ? numberofitems : ''}</sup></i></Link>
            </div>
            <Tabs
                id="dweki_categories"
                activeKey={key}
                className="mb-3"
                onSelect={(key) => handleValue(key)}
            >
                <Tab value="" eventKey="" title="All" />
                {
                    data?.map((data, key) => (
                        <Tab key={key} value={data.id} eventKey={data.id} title={data.name} />
                    ))
                }
            </Tabs>
        </div>
    )
}

export default DwekiTabs