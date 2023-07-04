import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import { NotificationManager } from 'react-notifications'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import countryList from 'react-select-country-list'
import styled from 'styled-components'
import cartoon_img from '../../assets/images/auth/cartoon.png'
import team_img from '../../assets/images/auth/image.png'
import form_bg from '../../assets/images/auth/signup_bkg.png'
import SignupImage from '../../assets/images/auth/upload.png'
import logo from '../../assets/images/web_logo@2x.png'
import background from '../../assets/splashassets/bkg.png'
import backgroundfull from '../../assets/splashassets/bkgfull.png'
import '../../assets/Styles/Styles.css'
import { api } from '../../url'
import AddNew from './add-new-ethnicity-signup'
const Signup2 = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email_id, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [community, setCommunity] = useState('');
    const [age, setAge] = useState(new Date());

    const [relationshipstats, setRelationshipstats] = useState('');
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [dp, setDp] = useState('');
    const [getEhnicity, setgetEhnicity] = useState(false);
    const [previewDp, setPreviewDp] = useState(false);
    const [dropdownItem, setdropdownItem] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [addNewEthPopup, setAddNewEthPopup] = useState(false);
    const [EthnicityPopup, setEthnicityPopup] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    const [country, setCountry] = useState('');
    const [deletedAccountPopup, setDeletedAccountPopup] = useState(false);
    const [verificationPopup, setVerificationPopup] = useState(false);
    const [verificationToken, setVerificationToken] = useState('');
    const [search, setSearch] = useState(0);

    useEffect(() => {
        getEthnicgroups();
    }, []);

    function getEthnicgroups() {
        console.log(dropdownItem);
        axios
            .get(`${api}ViewEthnicGroup`)
            .then((res) => {
                setgetEhnicity(res.data.data);
                setEthnicityPopup(false);
                if (getEhnicity && getEhnicity.length > 0) {
                    setSearch('');
                }
            })
            .catch((err) => console.log(err));
    }

    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() - 1;
    var year = dtToday.getFullYear();

    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();

    if (month < 10) month = '0' + month.toString();
    if (dtToday.getDate() == 1) {
        day = 30;
        month = month - 1;
    }

    // var maxDate = year + '-' + month.slice(1, 3) + '-' + day;
    // var minDate = year - 100 + '-' + month.slice(1, 3) + '-' + day;



    function recoverAccount() {
        setDeletedAccountPopup(false);
        signupUser(0);
    }
    function deleteAccount() {
        signupUser(1);
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function validateForm() {
        if (name == '') {
            NotificationManager.error('Name filed cannot be empty!', 'Alert!', 3000);
            handleFocus1()
            return 0;
        } else if (name.length < 4) {
            NotificationManager.error('Name minimum required 3 characters!', 'Alert!', 3000);
            handleFocus1()
            return 0;
        } else if (name.length > 30) {
            NotificationManager.error('Name not accepting more than 30 characters length!', 'Alert!', 3000);
            handleFocus1()
            return 0;
        } else if (email_id == '') {
            handleFocus2()
            NotificationManager.error('Email field cannot be empty!', 'Alert!', 3000);
            return 0;
        } else if (!validateEmail(email_id)) {
            NotificationManager.error('Email format is invalid', 'Alert!', 3000);
            handleFocus2()
            return 0;
        } else if (password == '') {
            handleFocus3()
            NotificationManager.error('Password field cannot be empty!', 'Alert!', 3000);
            return 0;
        } else if (password.length < 8) {
            handleFocus3()
            NotificationManager.error('Password required minimum 8 character!', 'Alert!', 3000);
            return 0;
        } else if (password.length > 30) {
            handleFocus3()
            NotificationManager.error('Password not accepting more than 30 character length', 'Alert!', 3000);
            return 0;
        } else if (confirm_password == '') {
            handleFocus4()
            NotificationManager.error('Confirm Password field cannot be empty!', 'Alert!', 3000);
            return 0;
        } else if (confirm_password.length > 30) {
            handleFocus4()
            NotificationManager.error('Confirm Password not accepting more than 30 character length', 'Alert!', 3000);
            return 0;
        } else if (password != confirm_password) {
            handleFocus4()
            NotificationManager.error('Password and confirm password should be same!', 'Alert!', 3000);
            return 0;
        } else if (nationality == '') {
            handleFocus5()
            NotificationManager.error('Nationality cannot be empty!', 'Alert!', 3000);
            return 0;
        }
        else if (nationality.length > 30) {
            handleFocus5()
            NotificationManager.error('Nationality not accepting more than 30 character length', 'Alert!', 3000);
            return 0;
        } else if (age == '') {
            NotificationManager.error('Age cannot be empty!', 'Alert!', 3000);
            return 0;
        }
        else if (relationshipstats == '') {
            handleFocus6()
            NotificationManager.error('Marital Status cannot be empty!', 'Alert!', 3000);
            return 0;
        } else if (country == '') {
            handleFocus7()
            NotificationManager.error('Country cannot be empty!', 'Alert!', 3000);
            return 0;
        } else if (dropdownItem == '') {
            handleFocus8()
            NotificationManager.error('Ethnicity cannot be empty!', 'Alert!', 3000);
            return 0;
        }
        else if (gender == '') {
            handleFocus9()
            NotificationManager.error('Gender cannot be empty!', 'Alert!', 3000);
            return 0;
        }
        else if (selectedValue === '') {
            handleFocus10()
            NotificationManager.error('Please enter who did you hear about us?', 'Alert!', 3000);
            return 0;
        } else if (selectedValue === 'Other') {
            handleFocus10()
            NotificationManager.error('Please enter who did you hear about us?', 'Alert!', 3000);
            return 0;
        }

        else {
            return 1;
        }


    }





    function signupUser(delete_account = '', deleteToken = '') {

        var isValidateForm = validateForm();
        if (isValidateForm) {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('email_id', email_id);
            formData.append('password', password);
            formData.append('confirm_password', confirm_password);
            formData.append('age', age);
            formData.append('nationality', nationality);
            formData.append('community', community);
            formData.append('relationshipstats', relationshipstats);
            formData.append('hear_about_us', selectedValue);
            formData.append('country', country);
            formData.append('gender', gender);
            formData.append('dp', dp);

            if (deleteToken != '') {
                formData.append('deleteToken', deleteToken);
            }
            if (delete_account === 0 || delete_account === 1) {
                formData.append('delete_account', delete_account);
            }

            for (let i = 0; i < dp.length; i++) {
                formData.append(`dp[${i}]`, dp[i]);
            }
            console.log(formData);
            axios
                .post(`${api}sign_up`, formData)
                .then((res) => {
                    if (res.data.status == 'success') {
                        navigate('#/languages');
                        if (delete_account === 1 && res.data.error) {
                            setDeletedAccountPopup(false);
                            setVerificationPopup(true);
                        } else {
                            if (res.data.error) {
                                alert(res.data.error);
                            } else {
                                // navigate('/login');
                                let email_id = res.data.data.map((list) => {
                                    return list.email_id;
                                });
                                localStorage.setItem('email_id', email_id);
                                localStorage.setItem('all_data', JSON.stringify(res.data.data));
                                localStorage.setItem('count', 0);
                                localStorage.setItem('attempt', 0);
                                localStorage.setItem('q_incr', 1);
                                localStorage.setItem('newuser', true);
                                window.location.href = '#/languages';
                            }

                        }
                    } else {
                        if (res.data.status == 'failed' && res.data.is_partially_deleted == 1) {
                            if (deleteToken != '') {
                                setDeletedAccountPopup(false);
                                setVerificationPopup(false);
                            } else {
                                setDeletedAccountPopup(true);
                            }
                        } else {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((err) => console.log(err));
        }
    }
    function accountVerification() {
        if (verificationToken == '') {
            alert('Verification token is required!');
        } else {
            signupUser('', verificationToken);
        }
    }

    const filteredUsers = useMemo(() => {
        if (search != 0) {
            return (
                getEhnicity &&
                getEhnicity.length > 0 &&
                getEhnicity.filter(
                    (item) => item.ethnic_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
                )
            );
        }
        //setgetEhnicity(getEhnicity);
        return getEhnicity;
    }, [search]);

    function showSearchHandler(e) {
        console.log(e.target.value);
    }

    function hideEthPopup(value) {
        setdropdownItem(value);
        setCommunity(value);
        setEthnicityPopup(false);
    }




    const [selectedValue, setSelectedValue] = useState('');
    const [howdoyouknwoaboutusinput, sethowdoyouknwoaboutusinput] = useState(false);
    function handleChange(event) {
        const e = event.target.value
        if (e === 'Referral By Friend' || e === 'Facebook' || e === 'Instagram' || e === 'Youtube') {
            setSelectedValue(e)
            sethowdoyouknwoaboutusinput(false)
        } else if (e === 'Other') {
            sethowdoyouknwoaboutusinput(true)
            setSelectedValue(e)
        } else {
            setSelectedValue(e)
        }
    }
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);
    const inputRef7 = useRef(null);
    const inputRef8 = useRef(null);
    const inputRef9 = useRef(null);
    const inputRef10 = useRef(null);


    const handleFocus1 = () => {
        inputRef1.current.focus();
    };
    const handleFocus2 = () => {
        inputRef2.current.focus();
    };
    const handleFocus3 = () => {
        inputRef3.current.focus();
    };
    const handleFocus4 = () => {
        inputRef4.current.focus();
    };
    const handleFocus5 = () => {
        inputRef5.current.focus();
    };
    const handleFocus6 = () => {
        inputRef6.current.focus();
    };
    const handleFocus7 = () => {
        inputRef7.current.focus();
    };
    const handleFocus8 = () => {
        inputRef8.current.focus();
    };
    const handleFocus9 = () => {
        inputRef9.current.focus();
    };
    const handleFocus10 = () => {
        inputRef10.current.focus();
    };

    return (
        <StyledSignup>
            <div className='bkg_img' style={{ backgroundImage: width > 767 ? `url(${background})` : `url(${backgroundfull})`, height: "100vh" }}>
                <div className='row m-0' style={{ height: "100vh", overflowY: "scroll" }}>
                    <div className='col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12 m-0 p-0' style={{ backgroundImage: width > 991 ? `url(${team_img})` : `url(${''})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                        {width < 992 && width > 767 &&
                            <img src={cartoon_img} width="100%" style={{ marginTop: "50%" }} />
                        }
                    </div>
                    <div className='col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 m-0 p-xl-5 p-lg-5 p-md-3 p-sm-1 p-1' >
                        <div className='text-center position-relative'  >
                            <div className='position-absolute w-100 p-1' style={{ transform: "translate(0%, -28%)", top: "25%", left: "0%" }}>
                                <img src={logo} width="26%" className='cursor-pointer mt-5' onClick={() => navigate('/')} />
                                <h2 className='text-light'>Sign Up</h2>
                                <div className='form_body'>
                                    <Modal
                                        dialogClassName="modal-90w"
                                        aria-labelledby="example-custom-modal-styling-title"
                                        show={EthnicityPopup}
                                        onHide={() => setEthnicityPopup(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title style={{ color: 'darkgoldenrod' }}>Choose Ethnicity</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body
                                            style={{ height: '750px', overflowY: 'auto', overflowX: 'clip', marginRight: '20px' }}>
                                            <div className="position-relative">
                                                <div>
                                                    <a
                                                        href="javascript:;"
                                                        className="btn btn-outline-warning addEthnicityBtn"
                                                        onClick={() => {
                                                            // setEthnicityPopup(false);
                                                            setAddNewEthPopup(true);
                                                        }}
                                                        style={{ float: 'right', marginBottom: '10px' }}>
                                                        Add New Ethnicity
                                                    </a>
                                                    <div>
                                                        <div className="search-bar mb-3">
                                                            <input
                                                                type="search"
                                                                placeholder="Search Member"
                                                                // onChange={(e) => showSearchHandler(e)}
                                                                onChange={(e) => setSearch(e.target.value)}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row gx-5">
                                                        <ul className="list-group groupPopup" style={{ padding: '25px' }}>
                                                            {filteredUsers && filteredUsers.length > 0 ? (
                                                                filteredUsers.map((et) => {
                                                                    return (
                                                                        <>
                                                                            <li
                                                                                style={{ wordBreak: 'break-all' }}
                                                                                key={et.eg_id}
                                                                                onClick={() => hideEthPopup(et.ethnic_name)}
                                                                                className="list-group-item">
                                                                                <label style={{ paddingLeft: '20px' }}>{et.ethnic_name}</label>
                                                                            </li>
                                                                        </>
                                                                    );
                                                                })
                                                            ) : (
                                                                <div>
                                                                    <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
                                                                        <img src="assets/loader/loader.gif" alt="" className="loader" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </ul>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal show={deletedAccountPopup} onHide={deletedAccountPopup}>
                                        <Modal.Header>
                                            <Modal.Title style={{ color: 'darkgoldenrod' }}>Reminder</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div>
                                                <div className="ask-session-body">
                                                    You deleted this account, remember? Please create a new account!
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="btn btn-warning" onClick={() => recoverAccount()}>
                                                Recover Account
                                            </Button>
                                            <Button variant="btn btn-success" onClick={() => deleteAccount()}>
                                                Delete Account
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal show={verificationPopup} onHide={verificationPopup}>
                                        <Modal.Header>
                                            <Modal.Title
                                                style={{ color: 'darkgoldenrod', margin: 'auto', width: '50%', paddingLeft: '10%' }}>
                                                <label style={{ margin: 'auto', width: '50%' }}>Verification</label>
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div className="ask-session-body justify-content-center">
                                                <div style={{ margin: 'auto', width: '50%', marginLeft: '33%' }}>
                                                    <label htmlFor="dp text-center">
                                                        <img src={SignupImage} alt="" />
                                                    </label>
                                                </div>
                                                <br />
                                                <h4 style={{ textAlign: 'center' }}>Verification for deleting your account</h4>
                                                <br />
                                                <p style={{ textAlign: 'center' }}>
                                                    Verification code has been sent via email. Please use that code to verify and delete
                                                    you account.
                                                </p>
                                                <br />
                                                <br />
                                                <input
                                                    type="text"
                                                    style={{ textAlign: 'center' }}
                                                    placeholder="Enter code here"
                                                    className="p-3 w-100  rounded-pill loginInput"
                                                    onChange={(e) => setVerificationToken(e.target.value)}
                                                />
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                style={{ width: '100%', borderRadius: '1rem', height: '50px' }}
                                                variant="btn btn-success"
                                                onClick={() => accountVerification()}>
                                                VERIFY
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <form className="signup-form" >
                                        <Container className="mw-100 mh-100 mainLogin">
                                            <Row className="justify-content-center mainLogin">
                                                <div>
                                                    <Col className="mh-100 mt-xl-0">
                                                        <div className="text-center">
                                                            {previewDp ? (
                                                                <span
                                                                    className="cros display-6 text-light fw-bolder"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setPreviewDp(false);
                                                                        setDp('');
                                                                    }}
                                                                    style={{ cursor: 'Pointer' }}>
                                                                    &times;
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {previewDp ? (
                                                                <div className="profile_dp p-0  cursor-pointer">
                                                                    <img
                                                                        height="150px"
                                                                        width="150px"
                                                                        src={previewDp}
                                                                        alt="preview DP"
                                                                        className="preview"
                                                                        style={{ borderRadius: "100px" }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="profile_dp ">
                                                                    <label className="dp" htmlFor="dp">
                                                                        <img src={SignupImage} className="cursor-pointer" alt="" />
                                                                    </label>
                                                                    <input
                                                                        className='cursor-pointer'
                                                                        id="dp"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        onChange={(e) => {
                                                                            const image = e.target.files[0];
                                                                            if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                                                                                alert('Please select valid image.');
                                                                                return false;
                                                                            }
                                                                            setPreviewDp(URL.createObjectURL(e.target.files[0]));
                                                                            setDp(e.target.files[0]);
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {props.msg ? (
                                                            <div
                                                                className="alert alert-danger"
                                                                style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                                                                {props.msg}
                                                            </div>
                                                        ) : null}
                                                        <div className="flex-column d-flex align-items-center mt-2">
                                                            <input
                                                                ref={inputRef1}
                                                                type="text"
                                                                placeholder="Name"
                                                                required
                                                                min="3"
                                                                autoFocus
                                                                className="p-3 w-75  rounded-pill loginInput"
                                                                onChange={(e) => setName(e.target.value)}
                                                            />

                                                            <input
                                                                ref={inputRef2}
                                                                type="email"
                                                                required
                                                                placeholder="Email"
                                                                className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                                onChange={(e) => setEmailId(e.target.value)}
                                                            />
                                                            <input
                                                                ref={inputRef3}
                                                                type="password"
                                                                required
                                                                placeholder="Password"
                                                                className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <input
                                                                ref={inputRef4}
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                name="confirm_password"
                                                                required
                                                                className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                            />

                                                            <input
                                                                ref={inputRef5}
                                                                placeholder="Nationality"
                                                                type="text"
                                                                name="name"
                                                                required
                                                                onChange={(e) => setNationality(e.target.value)}
                                                                className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                            />

                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DesktopDatePicker
                                                                    // label="Date desktop"
                                                                    inputFormat="MM/DD/YYYY"
                                                                    maxDate={new Date()}
                                                                    name="age"
                                                                    value={age}


                                                                    className="w-75 mt-2 rounded-pill styled_date_input"
                                                                    onChange={(e) => setAge(e)}
                                                                    renderInput={(params) =>
                                                                        <TextField variant='standard' {...params} />}
                                                                />
                                                            </LocalizationProvider>

                                                            {/* <DatePicker
                                                                maxDate={new Date()}
                                                                // type="date"
                                                                name="age"
                                                                className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                                selected={age}
                                                                onChange={(date) => setAge(date)}
                                                            /> */}
                                                            <div className='styled-select'>

                                                                <select
                                                                    ref={inputRef6}
                                                                    required
                                                                    className="p-3 w-75  mt-2 select_dropdown rounded-pill loginInput text-dark"
                                                                    name="relationshipstats"
                                                                    onChange={(e) => setRelationshipstats(e.target.value)}>
                                                                    <option defaultChecked value="0">Marital Status</option>
                                                                    <option value="Single">Single</option>
                                                                    <option value="Married">Married</option>
                                                                    <option value="Custom">Custom</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                            </div>
                                                            <div className='styled-select'>
                                                                <select
                                                                    ref={inputRef7}
                                                                    required
                                                                    className="p-3 w-75 mt-2 select_dropdown rounded-pill loginInput text-dark"
                                                                    name="country"
                                                                    onChange={(e) => setCountry(e.target.value)}>
                                                                    <option value="0">Country</option>
                                                                    {options
                                                                        ? options.map((country, i) => {
                                                                            return (
                                                                                <option key={i} value={country.label}>
                                                                                    {country.label}
                                                                                </option>
                                                                            );
                                                                        })
                                                                        : null}
                                                                </select>
                                                            </div>

                                                            <div className='styled-select'>
                                                                <input
                                                                    ref={inputRef8}
                                                                    required
                                                                    placeholder="Ethnicity"
                                                                    type="text"
                                                                    name="name"
                                                                    value={dropdownItem}
                                                                    onClick={() => {
                                                                        setEthnicityPopup(true);
                                                                        if (getEhnicity && getEhnicity.length > 0) {
                                                                            setSearch('');
                                                                        }
                                                                        // setSearch('');
                                                                    }}
                                                                    className="p-3 w-75 mt-2 rounded-pill loginInput"
                                                                />
                                                            </div>
                                                            <div className='m-3 w-75 px-2' style={{ textAlign: "left" }} >
                                                                <h5 className='fs-5  text-light' style={{ marginRight: "67px" }}>Choose Your Gender</h5>
                                                                <label htmlFor="male" className='text-light' >
                                                                    <input
                                                                        ref={inputRef9}
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Male"
                                                                        id="male"
                                                                        className="form-check-input mx-2"
                                                                        checked={gender === 'Male'}
                                                                        onChange={(e) => setGender(e.target.value)}
                                                                    />
                                                                    Male
                                                                </label>
                                                                <br />
                                                                <label htmlFor="female" className='text-light' >
                                                                    <input
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="Female"
                                                                        className="form-check-input mx-2"
                                                                        id="female"
                                                                        checked={gender === 'Female'}
                                                                        onChange={(e) => setGender(e.target.value)}
                                                                    />
                                                                    Female
                                                                </label>
                                                            </div>

                                                            <div className='m-0 mb-3 w-75 px-2 ' style={{ textAlign: "left" }} >
                                                                <h5 className='fs-5  text-light'>How did you hear about us?</h5>
                                                                <label className=' text-light'>
                                                                    <input
                                                                        ref={inputRef10}
                                                                        type="radio"
                                                                        name="radioGroup"
                                                                        value="Facebook"
                                                                        checked={selectedValue === 'Facebook'}
                                                                        onChange={handleChange}
                                                                        className="form-check-input mx-2"
                                                                    />
                                                                    Facebook
                                                                </label>
                                                                <br />
                                                                <label className=' text-light'>
                                                                    <input
                                                                        type="radio"
                                                                        name="radioGroup"
                                                                        value="Instagram"
                                                                        checked={selectedValue === 'Instagram'}
                                                                        onChange={handleChange}
                                                                        className="form-check-input mx-2 "
                                                                    />
                                                                    Instagram
                                                                </label>
                                                                <br />
                                                                <label className=' text-light'>
                                                                    <input
                                                                        type="radio"
                                                                        name="radioGroup"
                                                                        value="Youtube"
                                                                        checked={selectedValue === 'Youtube'}
                                                                        onChange={handleChange}
                                                                        className="form-check-input mx-2"
                                                                    />
                                                                    Youtube
                                                                </label>
                                                                <br />
                                                                <label className=' text-light'>
                                                                    <input
                                                                        type="radio"
                                                                        name="radioGroup"
                                                                        value="Referral By Friend"
                                                                        checked={selectedValue === 'Referral By Friend'}
                                                                        onChange={handleChange}
                                                                        className="form-check-input mx-2"
                                                                    />
                                                                    Referral By Friend
                                                                </label>
                                                                <br />
                                                                <label className=' text-light'>
                                                                    <input
                                                                        type="radio"
                                                                        name="radioGroup"
                                                                        value="Other"
                                                                        checked={selectedValue === 'Other'}
                                                                        onChange={handleChange}
                                                                        className="form-check-input mx-2"
                                                                    />
                                                                    Other
                                                                </label>
                                                                <br />
                                                            </div>
                                                            {
                                                                howdoyouknwoaboutusinput &&
                                                                <input placeholder='Write here...' className="p-3 w-75 mt-2  rounded-pill loginInput" onChange={handleChange} />
                                                            }


                                                        </div>

                                                    </Col>
                                                </div>

                                            </Row>
                                            <AddNew
                                                addNewEthPopup={addNewEthPopup}
                                                setAddNewEthPopup={setAddNewEthPopup}
                                                setdropdownItem={setdropdownItem}
                                                setCommunity={setCommunity}
                                                type="signUp"
                                                getEthnicgroups={getEthnicgroups}
                                            />
                                        </Container>
                                    </form >
                                </div>
                                <div className="mt-2 text-center mt-xl-2">
                                    <button
                                        className="loginButton p-3 w-75 rounded-pill text-light fw-bold"
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            signupUser();
                                        }}>
                                        Sign Up
                                    </button>
                                </div>
                                <p className="loginPara mt-1 text-center text-light mt-2 ">
                                    Already has account?
                                    <a
                                        className='text-light mx-1'
                                        href="javascript:void(0)"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate('/login')}>
                                        Sign In
                                    </a>
                                </p>
                            </div>
                            <img src={form_bg} className="form_bg" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        </StyledSignup>
    )
}


const StyledSignup = styled.div`

.styled-select {
  height: auto;
  overflow: hidden;
  overflow: -moz-hidden-unscrollable;
 width: 100%;
 justify-content: center;
 align-items: center;
  display: flex;
  position: relative;
}

.styled-select select, .styled-select input {
 background: transparent;
  -webkit-appearance: none; 
  padding: 50%;
  
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right 1rem center #fff;
}

.select_dropdown{
    /* -webkit-appearance: none;
  -moz-appearance: none; */
  /* appearance: none; */
}
.bkg_img{
      width: 100%;
      background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 100em;
  
  }
.form_body{
    height: 1000px;
    overflow-y: scroll;
    width: 100%;
    /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 10px;
}
}
.signup_input{
    border-radius: 25px;
    height:47px;
}



@media (max-width : 2400px){
    .form_body{
    height: 1000px;
    }
}
@media (max-width : 2300px){
    .form_body{
    height: 940px;
    }
}
@media (max-width : 2200px){
    .form_body{
    height: 850px;
    }
}
@media (max-width : 2100px){
    .form_body{
    height: 785px;
    }
}
@media (max-width : 1900px){
    .form_body{
    height: 700px;
    }
}
@media (max-width : 1800px){
    .form_body{
    height: 640px;
    }
}
@media (max-width : 1700px){
    .form_body{
    height: 580px;
    }
}
@media (max-width : 1600px){
    .form_body{
    height: 530px;
    }
}
@media (max-width : 1500px){
    .form_body{
    height: 470px;
    }
}
@media (max-width : 1400px){
    .form_body{
    height: 420px;
    }
}
@media (max-width : 1300px){
    .form_body{
    height: 400px;
    }
}
@media (max-width : 1230px){
    .form_body{
    height: 370px;
    }
}
@media (max-width : 1200px){
    .form_body{
    height: 320px;
    }
}
@media (max-width : 1100px){
    .form_body{
    height: 280px;
    }
}

@media (max-width : 1017px){
    .form_body{
    height: 230px;
    }
}
@media (max-width : 991px){
    .form_body{
    height: 390px;
    }
}
@media (max-width : 897px){
    .form_body{
    height: 350px;
    }
}
@media (max-width : 833px){
    .form_body{
    height: 300px;
    }
}
@media (max-width : 767px){
    .form_body{
    height: 800px;
    }
}
@media (max-width : 721px){
    .form_body{
    height: 730px;
    }
}
@media (max-width : 667px){
    .form_body{
    height: 680px;
    }
}
@media (max-width : 633px){
    .form_body{
    height: 620px;
    }
}
@media (max-width : 585px){
    .form_body{
    height: 570px;
    }
}
@media (max-width : 550px){
    .form_body{
    height: 520px;
    }
}
@media (max-width : 519px){
    .form_body{
    height: 450px;
    }
}
@media (max-width : 467px){
    .form_body{
    height: 400px;
    }
}
@media (max-width : 427px){
    .form_body{
    height: 340px;
    }
}
@media (max-width : 383px){
    .form_body{
    height: 300px;
    }
}
@media (max-width : 355px){
    .form_body{
    height: 240px;
    }
}
@media (max-width : 390px){
    .form_body{
    height: 430px;
    }
    .form_bg{
        height: 700px;
    }
}
@media (max-width : 338px){
    .form_body{
    height: 400px;
    }
    .form_bg{
        height: 700px;
    }
}

@media (max-width : 304px){
    .form_body{
    height: 370px;
    }
    .form_bg{
        height: 700px;
    }
}

@media (max-width : 294px){
    .form_body{
    height: 310px;
    
    }
    .form_bg{
        height: 600px;
    }
}



`

const mapStatetoProps = (state) => {
    return {
        name: state.user.name,
        email_id: state.user.email_id,
        password: state.user.password,
        confirm_password: state.user.confirm_password,
        age: state.user.age,
        nationality: state.user.nationality,
        community: state.user.community,
        relationshipstats: state.user.relationshipstats,
        country: state.user.country,
        gender: state.user.gender,
        dp: state.user.dp,
        msg: state.user.msg,
        success: state.user.success
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        signupUser: function (
            name,
            email_id,
            password,
            confirm_password,
            age,
            nationality,
            community,
            relationshipstats,
            country,
            gender,
            dp,
            e
        ) {
            dispatch(
                signupUser(
                    name,
                    email_id,
                    password,
                    confirm_password,
                    age,
                    nationality,
                    community,
                    relationshipstats,
                    country,
                    gender,
                    dp,
                    e
                )
            );
        }
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Signup2);