import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';
import AddNewEthnicityTutor from '../../Signup/add-new-ethnicity-tutor';
const Tutor = () => {
  const [data, setData] = useState(false);
  const [isLoader, setisLoader] = useState(true);
  // const [err, setErr] = useState(false);
  const [dropdownItem, setdropdownItem] = useState('Enter The language(s) you teach');
  const [showDropDown, setShowDropDown] = useState(false);
  const [addNewEthPopup, setAddNewEthPopup] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [allLang, setAllLang] = useState([]);
  const [computer, setComputer] = useState('');
  const [internet, setInternet] = useState('');
  const [country, setCountry] = useState('');
  const [states, setStates] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  useEffect(() => {
    getData();
    ViewLanguages();
  }, []);
  function getData(value = '') {
    if (value != '') {
      setNewLanguage(value);
    }
    axios
      .get(
        `${api}ViewUserProfile?email_id=${localStorage.getItem(
          'email_id'
        )}&profile_id=${localStorage.getItem('email_id')}`
      )
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          setData(res.data.data[0]);
          if (res.data.data[0].tutor_st_verified == 'Yes_pending') {
            setAllLang([res.data.data[0].lang_to_teach]);
          }
        } else {
          setisLoader(false);
          //setErr('No Content Found!!');
          NotificationManager.error('No Content Found!!', 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }
  function changeStatus(e, type = null) {
    e.preventDefault();
    if (states.length > 30) {
      alert('State not accepting more than 30 character length');
      return false;
    } else if (city.length > 30) {
      alert('City not accepting more than 30 character length');
      return false;
    } else if (experience.length > 30) {
      alert('Experience not accepting more than 30 character length');
      return false;
    } else if (phone.length > 30) {
      alert('Phone not accepting more than 30 character length');
      return false;
    }
    const all_Data = {
      email_id: localStorage.getItem('email_id'),
      spoken_language: 'nil',
      trial_rate: 'nil',
      hourly_rate: 'nil',
      time_slots: 'nil',
      zoom_link: 'nil',
      lang_to_teach: allLang.length > 0 ? allLang.toString() : newLanguage,
      have_laptop: computer,
      have_internet: internet,
      teaching_experience: experience,
      teach_state: states,
      teach_city: city,
      teach_country: country,
      phone: `92-${phone}`
    };
    axios
      .get(`${api}TutorToggle?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setAllLang([]);
          if (type == 'send') {
            axios
              .post(`${api}BecomeTutor`, all_Data)
              .then((res) => {
                if (res.data.status == 'success') {
                  axios
                    .post(`${api}AddLanguage `, {
                      language: dropdownItem
                    })
                    .then((res) => {
                      setCity('');
                      setExperience('');
                      setStates('');
                      setPhone('');
                      setCountry('');
                      getData();
                    })
                    .catch((err) => console.log(err));
                }
              })
              .catch((err) => console.log(err));
          }
        }
        getData();
      })
      .catch((err) => console.log(err));
  }
  function ViewLanguages() {
    axios
      .get(`${api}ViewLanguages`)
      .then((res) => {
        if (res.data.status == 'success') {
          setLanguages(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }
  function getLang(e, ln) {
    e.preventDefault();
    setAllLang([...allLang, ln]);
  }
  function deleteLang(e, i, val) {
    var array = [...allLang]; // make a separate copy of the array
    var index = array.indexOf(val);
    if (index !== -1) {
      array.splice(index, 1);
      setAllLang(array);
    }
    if (array.length == 0) {
      setdropdownItem('Enter The language(s) you teach');
    }
  }

  const navigate = useNavigate();
  return (
    <div>
      {/*{err ? (*/}
      {/*  <div className="container">*/}
      {/*    <div className="row">*/}
      {/*      <div className="col-md-6 col-sm-12 col-12 d-block m-auto">*/}
      {/*        <div className="alert alert-danger">{err}</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : null}*/}
      {isLoader && <Loader />}
      {data ? (
        <>
          {data.tutor_st == '0' ? (
            <div className="container-fluid">
              <div className="row mb-5">
                <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-12 d-block m-auto">
                  {data.tutor_st_verified == 'nil' ||
                  data.tutor_st_verified == null ||
                  data.tutor_st_verified == '0' ? (
                    <>
                      <div className="row m-3 mt-4">
                        <div className="col-1 p-1">
                          <ArrowLeftShort
                            className="fs-1 text-warning"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                          />
                        </div>
                        <div className="col-10">
                          <h1 className="text-center m-2">Select To Become a Tutor</h1>
                        </div>
                      </div>
                      <div className="all_form col-md-6 offset-md-3">
                        <div className="custom-select ethnicity position-relative">
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            Which language(s) do you want to teach?
                          </label>
                          <div
                            className="main-select"
                            onClick={() => setShowDropDown(!showDropDown)}>
                            {/*<span className="main-select-item">{dropdownItem}</span>*/}
                          </div>

                          <div>
                            <select
                              onChange={(e) => getData(e.target.value)}
                              className="form-select"
                              style={{ borderRadius: '50rem', padding: '1rem' }}
                              aria-label="Filter select">
                              <option value="">Select Language</option>
                              {languages &&
                                languages.map((ln, i) => {
                                  return (
                                    <option key={i} value={ln.language}>
                                      {ln.language}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          {/*<span className="add-icon" onClick={() => setAddNewEthPopup(true)}>*/}
                          {/*  {' '}*/}
                          {/*  <i class="fa fa-plus-square"></i>*/}
                          {/*</span>*/}

                          <div className="d-flex justify-content-between w-100 mt-2">
                            <p className="m-1 fw-light" style={{ color: 'green' }}>
                              Add more language *
                            </p>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setAddNewEthPopup(true)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-plus"
                                viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        {allLang != ''
                          ? allLang.map((it, i) => {
                              return (
                                <div className="show_lang d-flex justify-content-around align-items-center mx-2 my-3">
                                  <div className="bar">
                                    <a className="has-bars" key={i}>
                                      <div style={{ paddingBottom: '5px', color: '#707070' }}>
                                        <span>{it}</span>
                                        <span className="bar" />
                                        <span className="bar" />
                                        <span className="bar" />
                                        <span className="bar" />
                                      </div>
                                    </a>
                                  </div>
                                  <div className="cros_icon" onClick={(e) => deleteLang(e, i, it)}>
                                    <i className="fa fa-times-circle"></i>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                        {/* <div className="form-group">
                                                        <input type="text" className="form-control" />
                                                    </div> */}
                        <div className="ask_yes_no mt-3">
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            Do you have a laptop or Computer?
                          </label>
                          <div className="ask_btns mt-2 ml-3" style={{ padding: '10px' }}>
                            <button
                              style={{ marginRight: '10px', color: 'white' }}
                              className={
                                computer == 'yes' ? 'btn btn-success active' : 'btn btn-warning'
                              }
                              onClick={() => setComputer('yes')}>
                              Yes
                            </button>
                            <button
                              className={
                                computer == 'no'
                                  ? 'btn btn-danger text-light active ml-3'
                                  : 'btn btn-warning text-light ml-3'
                              }
                              onClick={() => setComputer('no')}>
                              No
                            </button>
                          </div>
                        </div>
                        <div className="ask_yes_no mt-3">
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            Do you have a strong internet connection?
                          </label>
                          <div className="ask_btns mt-2 ml-3" style={{ padding: '10px' }}>
                            <button
                              style={{ marginRight: '10px' }}
                              className={
                                internet == 'yes'
                                  ? 'btn btn-success text-light active'
                                  : 'btn text-light btn-warning'
                              }
                              onClick={() => setInternet('yes')}>
                              Yes
                            </button>
                            <button
                              className={
                                internet == 'no'
                                  ? 'btn btn-danger text-light active ml-3'
                                  : 'btn btn-warning text-light ml-3'
                              }
                              onClick={() => setInternet('no')}>
                              No
                            </button>
                          </div>
                        </div>
                        <div className="state_city mt-3">
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            Where are you currently located (City, State and Conutry)?
                          </label>
                          <div className="form-group">
                            <select
                              className="form-control mt-2"
                              name="country"
                              style={{ borderRadius: '50rem', padding: '1rem' }}
                              onChange={(e) => setCountry(e.target.value)}>
                              <option value="0">Select Country</option>
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
                          <div className="form-group" style={{ paddingTop: '10px' }}>
                            <input
                              type="text"
                              onChange={(e) => setStates(e.target.value)}
                              value={states}
                              className="p-3 w-100 rounded-pill form-control"
                              placeholder="Add State"
                            />
                          </div>
                          <div className="form-group" style={{ paddingTop: '10px' }}>
                            <input
                              type="text"
                              onChange={(e) => setCity(e.target.value)}
                              className="p-3 w-100 rounded-pill form-control"
                              placeholder="Add City"
                              value={city}
                            />
                          </div>
                        </div>
                        <div className="form-group" style={{ paddingTop: '10px' }}>
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            How many years of teaching experience do you have?
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setExperience(e.target.value)}
                            className="p-3 w-100 rounded-pill form-control"
                            value={experience}
                            placeholder="Enter years of teaching experience"
                          />
                        </div>
                        <div className="form-group" style={{ paddingTop: '10px' }}>
                          <label
                            className="fw-light fs-6 m-2"
                            style={{
                              paddingBottom: '5px',
                              paddingTop: '10px'
                            }}>
                            What is your phone number?
                          </label>
                          <input
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="p-3 w-100 rounded-pill form-control tutor_input_arrow_control"
                            placeholder="Enter Phone"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center" style={{ padding: '15px' }}>
                        {computer != '' &&
                        internet != '' &&
                        phone != '' &&
                        experience != '' &&
                        city != '' &&
                        states != '' &&
                        country != '' ? (
                          <button
                            className="btn btn-danger px-5 py-3 text-light cs-btn"
                            style={{ borderRadius: '20px' }}
                            onClick={(e) => changeStatus(e, 'send')}>
                            Send Request
                          </button>
                        ) : (
                          <button
                            style={{ backgroundColor: '#bb2d3b9e', borderRadius: '20px' }}
                            className="btn btn-danger px-5 py-3 text-light cs-btn"
                            disabled>
                            Send Request
                          </button>
                        )}
                      </div>
                    </>
                  ) : null}
                  {data.tutor_st_verified == 'Yes_pending' ? (
                    <>
                      <h1 className="text-center pb-5 mt-5">Cancelled Tutor Request</h1>
                      <>
                        <div
                          className="all_form col-md-6 offset-md-3"
                          style={{ pointerEvents: 'none', opacity: '0.4' }}>
                          <div className="custom-select ethnicity position-relative">
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              Which language(s) do you want to teach?
                            </label>
                            <div
                              className="main-select"
                              onClick={() => setShowDropDown(!showDropDown)}>
                              {/*<span className="main-select-item">{dropdownItem}</span>*/}
                            </div>

                            <div>
                              <select
                                onChange={(e) => getData(e.target.value)}
                                className="form-select"
                                style={{ borderRadius: '50rem', padding: '1rem' }}
                                aria-label="Filter select"
                                defaultValue={data.current_target_lang}
                                value={data.current_target_lang}>
                                <option value="">Select Language</option>
                                {languages &&
                                  languages.map((ln, i) => {
                                    return (
                                      <option key={i} value={ln.language}>
                                        {ln.language}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            {/*<span className="add-icon" onClick={() => setAddNewEthPopup(true)}>*/}
                            {/*  {' '}*/}
                            {/*  <i class="fa fa-plus-square"></i>*/}
                            {/*</span>*/}

                            <div className="d-flex justify-content-between w-100 mt-2">
                              <p></p>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setAddNewEthPopup(true)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-plus"
                                  viewBox="0 0 16 16">
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          {allLang != ''
                            ? allLang.map((it, i) => {
                                return (
                                  <div className="show_lang d-flex justify-content-around align-items-center mx-2 my-3">
                                    <div className="bar">
                                      <a className="has-bars" key={i}>
                                        <div style={{ paddingBottom: '5px', color: '#707070' }}>
                                          <span>{it}</span>
                                          <span className="bar" />
                                          <span className="bar" />
                                          <span className="bar" />
                                          <span className="bar" />
                                        </div>
                                      </a>
                                    </div>
                                    <div
                                      className="cros_icon"
                                      onClick={(e) => deleteLang(e, i, it)}>
                                      <i className="fa fa-times-circle"></i>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                          <div className="ask_yes_no mt-3">
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              Do you have a laptop or Computer?
                            </label>
                            <div className="ask_btns mt-2 ml-3" style={{ padding: '10px' }}>
                              <button
                                style={{ marginRight: '10px' }}
                                className={
                                  data.have_laptop == 'yes'
                                    ? 'btn btn-success active'
                                    : 'btn btn-warning'
                                }
                                onClick={() => setComputer('yes')}>
                                Yes
                              </button>
                              <button
                                className={
                                  data.have_laptop == 'no'
                                    ? 'btn btn-success active ml-3'
                                    : 'btn btn-warning ml-3'
                                }
                                onClick={() => setComputer('no')}>
                                No
                              </button>
                            </div>
                          </div>
                          <div className="ask_yes_no mt-3">
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              Do you have a strong internet connection?
                            </label>
                            <div className="ask_btns mt-2 ml-3" style={{ padding: '10px' }}>
                              <button
                                style={{ marginRight: '10px' }}
                                className={
                                  data.have_internet == 'yes'
                                    ? 'btn btn-success active'
                                    : 'btn btn-warning'
                                }
                                onClick={() => setInternet('yes')}>
                                Yes
                              </button>
                              <button
                                className={
                                  data.have_internet == 'no'
                                    ? 'btn btn-success active ml-3'
                                    : 'btn btn-warning ml-3'
                                }
                                onClick={() => setInternet('no')}>
                                No
                              </button>
                            </div>
                          </div>
                          <div className="state_city mt-3">
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              Where are you currently located (City, State and Country)?
                            </label>
                            <div className="form-group">
                              <select
                                className="form-control mt-2"
                                name="country"
                                defaultValue={data.teach_country}
                                style={{ borderRadius: '50rem', padding: '1rem' }}
                                onChange={(e) => setCountry(e.target.value)}>
                                <option value="0">Select Country</option>
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
                            <div className="form-group" style={{ paddingTop: '10px' }}>
                              <input
                                type="text"
                                onChange={(e) => setStates(e.target.value)}
                                className="p-3 w-100 rounded-pill"
                                placeholder="Add State"
                                value={data.teach_state}
                              />
                            </div>
                            <div className="form-group" style={{ paddingTop: '10px' }}>
                              <input
                                type="text"
                                onChange={(e) => setCity(e.target.value)}
                                className="p-3 w-100 rounded-pill"
                                placeholder="Add City"
                                value={data.teach_city}
                              />
                            </div>
                          </div>
                          <div className="form-group" style={{ paddingTop: '10px' }}>
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              How many years of teaching experience do you have?
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setExperience(e.target.value)}
                              className="p-3 w-100 rounded-pill "
                              placeholder="Enter years of teaching experience"
                              value={data.teaching_experience}
                            />
                          </div>
                          <div className="form-group" style={{ paddingTop: '10px' }}>
                            <label
                              style={{
                                paddingBottom: '5px',
                                paddingTop: '10px'
                              }}>
                              What is your phone number?
                            </label>
                            <input
                              type="number"
                              onChange={(e) => setPhone(e.target.value)}
                              className="p-3 w-100 rounded-pill"
                              placeholder="Enter Phone"
                              value={data.phone ? data.phone.split('-')[1] : ''}
                            />
                          </div>
                        </div>
                      </>
                      <div className="d-flex justify-content-center">
                        <button
                          style={{ borderRadius: '20px', marginTop: '20px' }}
                          className="btn btn-danger px-5 py-3 cs-btn"
                          onClick={(e) => changeStatus(e)}>
                          Cancel Request
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center">
                    <div>
                      <h1 className="pb-5">You are already a Tutor</h1>
                      {/*<div className="form-group">*/}
                      {/*  <label htmlFor className="font-weight-bold">*/}
                      {/*    Language*/}
                      {/*  </label>*/}
                      {/*  <select className="form-control">*/}
                      {/*    <option value={0}>--Select Language--</option>*/}
                      {/*    <option value="English">English</option>*/}
                      {/*    <option value="Esan">Esan</option>*/}
                      {/*    <option value="Other">Other</option>*/}
                      {/*  </select>*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                      {/*  <label htmlFor className="font-weight-bold">*/}
                      {/*    Spoken Language*/}
                      {/*  </label>*/}
                      {/*  <select className="form-control">*/}
                      {/*    <option value={0}>--Select Language--</option>*/}
                      {/*    <option value="English">English</option>*/}
                      {/*    <option value="Esan">Esan</option>*/}
                      {/*    <option value="Other">Other</option>*/}
                      {/*  </select>*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                      {/*  <label htmlFor className="font-weight-bold">*/}
                      {/*    Zoom Link*/}
                      {/*  </label>*/}
                      {/*  <input type="text" placeholder="Add Zoom Link" className="form-control" />*/}
                      {/*</div>*/}
                      {/*<div className="form-group">*/}
                      {/*  <button className="btn btn-danger form-control py-3 mt-3">Register</button>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
      <AddNewEthnicityTutor
        addNewEthPopup={addNewEthPopup}
        setAddNewEthPopup={setAddNewEthPopup}
        setdropdownItem={setdropdownItem}
        type="tutor"
        allLang={allLang}
        setAllLang={setAllLang}
      />
    </div>
  );
};

export default Tutor;
