import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';
const Library = () => {
    const languageArr = [
        { language: "All" },
        { language: "Esan" },
        { language: "Yoruba" },
        { language: "Igbo" },
        { language: "Hausa" },
        { language: "Swahili" },
        { language: "Twi" },
        { language: "IsiZulu" },
        { language: "SeTswana" },
        { language: "IsiXhosa" },
        { language: "Fulfulde" },
        { language: "Jamaican" },
    ]

    const [filteredData, setfilteredData] = useState([]);
    const [pgData, setpgData] = useState([]);
    const [data, setdata] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);
    const selectRef = useRef(null);
    const [loading, setloading] = useState('');

    useEffect(() => {
        getData();
        if (page === 1) {
            localStorage.setItem('api_for_current_library', `${api}get/audio-book?page=1`)
        }
    }, [])

    const getData = (key) => {
        setloading(true)
        axios.post(key ? key : `${api}get/audio-book`)
            .then((res) => {
                setdata(res?.data.data.data);
                setpgData(res?.data.data)
                setfilteredData(res?.data.data.data);
                settotalPages(res?.data.data.last_page)
                setloading(false);
                console.log(res);
            }).catch((err) => {
                console.log(err)
            })
        key ? localStorage.setItem('api_for_current_library', key) :
            null
    }
    const handleChange = (event) => {
        const value = event.target.value;
        const filteredData = data.filter(item => item.type === value);
        value === 'All' ? setfilteredData(data) :
            setfilteredData(filteredData);
    };
    const handleReset = () => {
        selectRef.current.value = 'All';
    };
    const navigate = useNavigate();

    return (
        <div>
            {
                loading &&
                <Loader />
            }

            <div className='overflow-hidden mt-4'>
                <div className='row p-2'>
                    <div className='col-1'>
                        <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
                    </div>
                    <div className='col-10'>
                        <h3 className='text-center p-2'>Library</h3>
                    </div>
                </div>
                <LibraryParent>

                    <select ref={selectRef} onChange={handleChange} className="form-select form-select-md mb-3 cursor-pointer" aria-label=".form-select-lg example">
                        {
                            languageArr.map((data, key) => (
                                <option key={key} value={data.language} name="">{data.language}</option>
                            ))
                        }

                    </select>
                    {
                        filteredData.length === 0 && !loading ? (

                            <p className='text-center' >No Data Found</p>

                        ) : (
                            filteredData?.map((data, key) => (
                                <Link to={`/library/${data.id}`} key={key}>
                                    <div className='library_list row m-0 mt-3 p-2 w-100'>
                                        <div className='col-4 col-sm-4 col-md-3  m-0 p-0'>
                                            <img width="100%" src={`${storage_api + data.image}`} />
                                        </div>
                                        <div className='col-8 col-sm-8 col-md-9 '>
                                            <div className='p-2'>
                                                <p className='fs-4 fw-light'>Song: {data.name}</p>
                                                <p className='fs-5 text-secondary fw-light'>{data.description}</p>
                                                <p className='fs-6 text-secondary fw-light'>#{data.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    }

                    {
                        !loading &&
                        <div className='text-center pt-3'>
                            <div className="d-flex justify-content-between ">
                                <div><button className='btn btn-success' onClick={() => setPage(page - 1) + getData(pgData?.prev_page_url) + handleReset()} disabled={pgData?.prev_page_url === null} >Previous</button></div>
                                <div>
                                    <p>
                                        {pgData?.current_page} / {totalPages && totalPages}
                                    </p>
                                </div>
                                <div><button className='btn btn-success' onClick={() => setPage(page + 1) + getData(pgData?.next_page_url) + handleReset()} disabled={pgData?.next_page_url === null} >Next</button></div>
                            </div>
                        </div>
                    }


                </LibraryParent>
            </div>

        </div>
    )
}

export default Library

const LibraryParent = styled.div`
margin: 0px 30px;
padding: 20px 0px;
.library_list{
    height: auto;
    width: 100%;
    background-color: rgb(0,0,0,0.01);
    color: black;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgb(0,0,0,0.2);
    cursor: pointer;
    transition-duration: 100ms;
    // border: 1px solid orange;
    overflow: hidden;
  }
  .library_list:hover{
    transition-duration: 100ms;
    transform: scale(1.01);
    box-shadow: 0px 0px 5px rgb(0,0,0,0.4);

  }
  img{
    height:180px;
    border-radius: 25px;
  }
  a{
    text-decoration: none;
  }

`