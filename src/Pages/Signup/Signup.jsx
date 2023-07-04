import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import LoginCorner from '../../assets/images/loginCorner.png';
import LoginImage from '../../assets/images/loginImage01_1_915x1000.png';
import SignupImage from '../../assets/images/sign_up_pic_160x150.png';
import '../../assets/Styles/Styles.css';
import { signupUser } from '../../redux';
import { api } from '../../url';
import AddNew from './add-new-ethnicity-signup';


const Signup = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email_id, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [community, setCommunity] = useState('');
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
        // setgetEhnicity(res.data.data.filter((t) => t.approved == 1));
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

  var maxDate = year + '-' + month + '-' + day;
  // console.log('succsess props' + props.success);
  // if (props.success == 1) {
  //   console.log('inside...');
  //   navigate('/login');
  // }

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
      alert('Name filed cannot be empty!');
      return 0;
    } else if (name.length > 30) {
      alert('Name not accepting more than 30 character length');
      return 0;
    } else if (email_id == '') {
      alert('Email field cannot be empty!');
      return 0;
    } else if (!validateEmail(email_id)) {
      alert('Email format is invalid');
      return 0;
    } else if (password == '') {
      alert('Password field cannot be empty!');
      return 0;
    } else if (password.length > 30) {
      alert('Password not accepting more than 30 character length');
      return 0;
    } else if (confirm_password == '') {
      alert('Confirm Password field cannot be empty!');
      return 0;
    } else if (confirm_password.length > 30) {
      alert('Confirm Password not accepting more than 30 character length');
      return 0;
    } else if (password != confirm_password) {
      alert('Password and confirm password should be same!');
      return 0;
    } else if (gender == '') {
      alert('Gender cannot be empty!');
      return 0;
    } else if (nationality == '') {
      alert('Nationality cannot be empty!');
      return 0;
    } else if (nationality.length > 30) {
      alert('Nationality not accepting more than 30 character length');
      return 0;
    } else if (age == '') {
      alert('Age cannot be empty!');
      return 0;
    } else if (selectedValue === '') {
      alert('Please enter who did you hear about us?');
      return 0;
    } else if (selectedValue === 'Other') {
      alert('Please enter who did you hear about us?');
      return 0;
    }
    else if (relationshipstats == '') {
      alert('Marital Status cannot be empty!');
      return 0;
    } else if (country == '') {
      alert('Country cannot be empty!');
      return 0;
    } else if (dropdownItem == '') {
      alert('Ethnicity cannot be empty!');
      return 0;
    } else {
      return 1;
    }

    // if (
    //   name == '' ||
    //   email_id == '' ||
    //   !validateEmail(email_id) ||
    //   password == '' ||
    //   confirm_password == '' ||
    //   password != confirm_password ||
    //   age == '' ||
    //   nationality == '' ||
    //   community == '' ||
    //   relationshipstats == '' ||
    //   country == '' ||
    //   gender == ''
    // ) {
    //   alert('Please fill your all form fields correctly');
    //   return 0;
    // } else {
    //   return 1;
    // }
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

              // const data = res.data.data;
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


  return (
    <>
      <div className="loginCorner">
        <img src={LoginCorner} alt="logo" className="loginCornerImg" />
      </div>

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
              {/*<div className="title mt-5">Add New Ethnicity</div>*/}
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

      <form className="signup-form">
        <Container className="mw-100 mh-100 mainLogin">
          <Row className="justify-content-center mainLogin">
            <div className="col-lg-6">
              <Col className="mh-100 mt-xl-0">
                <div className="text-center">
                  {previewDp ? (
                    <span
                      className="cros"
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
                    <div className="profile_dp">
                      <img
                        height="150px"
                        width="160px"
                        src={previewDp}
                        alt="preview DP"
                        className="preview"
                      />
                    </div>
                  ) : (
                    <div className="profile_dp">
                      <label className="dp" htmlFor="dp" style={{ marginTop: '10px' }}>
                        <img src={SignupImage} alt="" />
                      </label>
                      {/*<div>Add Profile Photo</div>*/}
                      <input
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
                <h1 className="loginName text-center">Sign Up</h1>
                {props.msg ? (
                  <div
                    className="alert alert-danger"
                    style={{ width: '50%', textAlign: 'center', marginLeft: '25%' }}>
                    {props.msg}
                  </div>
                ) : null}
                <div className="flex-column d-flex align-items-center mt-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-3 w-50  rounded-pill loginInput"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="d-flex align-items-center justify-content-start mt-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      id="male"
                      checked={gender === 'Male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="male" style={{ marginLeft: '20px' }}>
                      Male
                    </label>
                    <input
                      style={{ marginLeft: '20px' }}
                      type="radio"
                      name="gender"
                      value="Female"
                      id="female"
                      checked={gender === 'Female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="female" style={{ marginLeft: '20px' }}>
                      Female
                    </label>
                  </div>
                  <input
                    placeholder="Nationality"
                    type="text"
                    name="name"
                    onChange={(e) => setNationality(e.target.value)}
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                  />
                  <input
                    max={maxDate}
                    placeholder="Date of Birth"
                    type="date"
                    name="age"
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <select
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                    name="relationshipstats"
                    onChange={(e) => setRelationshipstats(e.target.value)}>
                    <option defaultChecked value="0">Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Custom">Custom</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
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

                  <input
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
                    className="p-3 w-50 mt-2 rounded-pill loginInput"
                  />



                  <div className='m-3'>
                    <h5 className='fs-5 text-center'>How did you hear about us?</h5>
                    <label>
                      <input
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
                    <label>
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
                    <label>
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
                    <label>
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
                    <label>
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
                    <input className="p-3 w-50 mt-2 rounded-pill loginInput" onChange={handleChange} />
                  }


                </div>
                <div className="mt-2 text-center mt-xl-2">
                  <button
                    className="loginButton p-3 w-50 rounded-pill text-light fw-bold"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      signupUser();
                      // props.signupUser(
                      //   name,
                      //   email_id,
                      //   password,
                      //   confirm_password,
                      //   age,
                      //   nationality,
                      //   community,
                      //   relationshipstats,
                      //   country,
                      //   gender,
                      //   dp,
                      //   e
                      // );
                    }}>
                    Sign Up
                  </button>

                  {/*{confirm_password != password ? (*/}
                  {/*  <button className="loginButton p-3 w-50 rounded-pill" disabled>*/}
                  {/*    Sign Up*/}
                  {/*  </button>*/}
                  {/*) : (*/}
                  {/*  <>*/}
                  {/*    /!*loginButton p-3 w-50 rounded-pill*!/*/}
                  {/*    {dropdownItem == 'Ethnicity' ? (*/}
                  {/*      <button className="loginButton p-3 w-50 rounded-pill" disabled>*/}
                  {/*        Sign Up*/}
                  {/*      </button>*/}
                  {/*    ) : (*/}
                  {/*      <button*/}
                  {/*        className="loginButton p-3 w-50 rounded-pill"*/}
                  {/*        type="submit"*/}
                  {/*        onClick={(e) => {*/}
                  {/*          e.preventDefault();*/}
                  {/*          signupUser();*/}
                  {/*          // props.signupUser(*/}
                  {/*          //   name,*/}
                  {/*          //   email_id,*/}
                  {/*          //   password,*/}
                  {/*          //   confirm_password,*/}
                  {/*          //   age,*/}
                  {/*          //   nationality,*/}
                  {/*          //   community,*/}
                  {/*          //   relationshipstats,*/}
                  {/*          //   country,*/}
                  {/*          //   gender,*/}
                  {/*          //   dp,*/}
                  {/*          //   e*/}
                  {/*          // );*/}
                  {/*        }}>*/}
                  {/*        Sign Up*/}
                  {/*      </button>*/}
                  {/*    )}*/}
                  {/*  </>*/}
                  {/*)}*/}
                </div>
                <p className="loginPara mt-1 text-center mt-2 ">
                  Already has account?
                  <a
                    href="javascript:void(0)"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}>
                    Sign In
                  </a>
                </p>
              </Col>
            </div>
            {/*<Col className="imageDiv mh-100 d-none d-lg-block d-md-block d-xl-block d-xxl-block"></Col>*/}
            <div className="col-lg-6 m-0">
              <div className="bg-danger imageDiv m-0 d-none d-lg-block  d-xl-block d-xxl-block overflow-hidden">
                <img
                  src={`${LoginImage}`}
                  alt="No Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
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
    </>
  );
};

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

export default connect(mapStatetoProps, mapDispatchtoProps)(Signup);
