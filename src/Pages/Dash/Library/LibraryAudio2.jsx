import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { NotificationManager } from 'react-notifications';
import { api } from '../../../url';
const LibraryAudio2 = (props) => {

    const [data, setdata] = useState([]);
    const [show, setShow] = useState(false);
    const [translationstate, settranslationstate] = useState([]);
    const [match, setmatch] = useState(false);
    const [loading, setloading] = useState(false);
    const [newArr, setnewArr] = useState([]);

    const a = (e) => {
        const line = e.trim();
        let descriptions = [];
        data?.forEach(item => {
            let des = item.description;
            const repl = des.replace(line, `'<span id="top" style='background-color:orange'>${line}</span>'`);
            descriptions.push(repl);
        });
        setnewArr(descriptions);
    }
    useMemo(() => {
        a(props.activeLine)
    }, [props.activeLine])
    useEffect(() => {
        getData();
    }, [])
    const handleClose = () => {
        setShow(false);
        setmatch(false);
    }
    const handleShow = () => setShow(true);
    const getData = () => {
        const audioBookNumber = Number(props.id);
        axios.post(`${api}get/audio-book-details`, {
            audio_book_id: audioBookNumber
        })
            .then((res) => {
                setdata(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    const purchasedAudioBookDetail = (e) => {
        setloading(true)
        handleShow()
        settranslationstate(e)
        axios.post(`${api}get/purchased-audio-book-details`, {
            user_id: localStorage.getItem('email_id'),
            audio_book_id: e.audio_book_id
        })
            .then((res) => {
                res.data.data.forEach(item => {
                    if (item.id === e.id) {
                        setmatch(true);
                    }
                });
                setloading(false)

            }).catch((err) => {
                console.log(err)
            })
    }
    const purchaseParagrpah = () => {
        axios.post(`${api}buy/audio-book-detail`, {
            user_id: localStorage.getItem("email_id"),
            audio_book_detail_id: translationstate.id
        }).then((res) => {
            setShow(false);
            NotificationManager.success(res.data.message, 'Success', 3000);
        }).catch((err) => {
            console.log(err)
            NotificationManager.error('Failed To Purchase Translation', 'Error', 3000);
        })
    }




    return (
        <div className='p-5' style={{ height: "400px", overflow: 'auto' }}>
            {
                newArr.length > 0 ? (
                    <>
                        <style jsx>{`
                .paragraph:hover{
                    background-color:rgb(0,0,0,0.1);
                }
                #top{
                    color: white;
                    position: sticky;
                }
            `}
                        </style>
                        {
                            newArr.map((description, index) => (
                                <>
                                    <GTranslateIcon style={{ float: "right", marginTop: "6px" }} />
                                    <div className='cursor-pointer paragraph mb-3'
                                        key={index}
                                        onClick={() => purchasedAudioBookDetail(data[index])}
                                        dangerouslySetInnerHTML={{ __html: description }} />
                                </>
                            ))
                        }
                    </>
                ) : (
                    <>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7].map(() => (
                                <Skeleton />
                            ))
                        }
                    </>
                )
            }


            <>
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Translation</Modal.Title>
                    </Modal.Header>
                    {
                        !loading ? (
                            <Modal.Body>


                                {
                                    match ? (
                                        <>{translationstate.translation}</>
                                    ) : (
                                        <div>
                                            <h5>You need to buy this paragraph to see the translation. Do you want to buy the paragraph?</h5>
                                            <Modal.Footer>
                                                {
                                                    !match &&
                                                    <>
                                                        <Button variant="success" onClick={() => purchaseParagrpah()}>
                                                            Yes
                                                        </Button>
                                                    </>
                                                }
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </div>
                                    )
                                }
                            </Modal.Body>
                        ) : (
                            <div className='m-auto p-4'>
                                <Spinner animation="border" />
                            </div>
                        )
                    }

                </Modal>
            </>
        </div>
    )
}

export default LibraryAudio2