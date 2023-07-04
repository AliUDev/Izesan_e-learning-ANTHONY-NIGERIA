import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


const AgeVerification = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState('');
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('all_data'));
        const year = data[0].age;
        const calculateAge = date => {
            const currentYear = new Date().getFullYear();
            const birthYear = new Date(date).getFullYear();
            const age = currentYear - birthYear;
            age < 18 ? setShow(true) : setShow(false)
        };
        calculateAge(year);
    }, [])
    return (
        <div>
            <>
                <Modal show={show} >
                    <Modal.Header >
                        <Modal.Title>Age Restriction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are under 18+ you can't access this page!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default AgeVerification