import ImageList from '@mui/material/ImageList';
import { Fragment, useEffect, useRef, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import winkPic from '../../../assets/images/wink.png';

import { api, img } from '../../../url';
// import UserEditImage from '../../../assets/images/edit_profile_pic.png';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GiftIcon from '../../../assets/images/gift.png';
import GiftIconLarge from '../../../assets/images/gift@2x.png';
import UserImage from '../../../assets/images/gray_pic.png';
import Pencil from '../../../assets/images/pencil.png';
import ChatIcon from '../../../assets/images/tutorial_message_icon.png';
import UserAddImage from '../../../assets/images/useradd.png';
import Loader from '../../Loader/Loader';
import UserCard from '../Users/UserCard';
import EditProfileDetails from './EditProfileDetails';
// import formYesNo from '../../../Components/Common/FormYesNo';
import { NotificationManager } from 'react-notifications';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function ProfileDetails() {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState(false);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [dp, setDp] = useState('');
  const [age, setAge] = useState('');
  console.log(age);
  const [community, setCommunity] = useState('');
  const [relationshipstats, setRelationshipstats] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [gallery, setGallery] = useState(false);
  const myRefname = useRef(null);
  const myRefname1 = useRef(null);
  const [giftPopup, setGiftPopup] = useState(false);
  const [giftAmount, setGiftAmount] = useState(0);
  const [giftSenderEmail, setGiftSenderEmail] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [messagePopup, setMessagePopup] = useState(false);
  const navigateBack = useNavigate();
  const [loading, setloading] = useState(false);
  //const emailId = JSON.parse(localStorage.getItem('all_data'))[0].email_id;
  const image = img + JSON.parse(localStorage.getItem('all_data'))[0].dp;
  console.log(image, 'image');
  const [ImageUrl, setImageUrl] = useState(
    img + JSON.parse(localStorage.getItem('all_data'))[0].dp
  );
  console.log(ImageUrl, 'url');
  const search = useLocation().search;
  const emailId = new URLSearchParams(search).get('email_id');
  console.log(emailId); //101

  const handleEditModeOn = () => {
    setIsEditMode(true);
  };
  function getUser() {
    setloading(true);
    axios
      .get(`${api}ViewUserProfile?email_id=${emailId}&profile_id=${emailId}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data[0]);
        setGender(res.data.data[0].gender);
        setName(res.data.data[0].name);
        const dateString = res.data.data[0].age;
        const date = new Date(dateString);
        const formattedDate = date.toDateString();
        setAge(formattedDate);
        setCommunity(res.data.data[0].community);
        setRelationshipstats(res.data.data[0].relationshipstats);
        setCountry(res.data.data[0].country);
        setDescription(res.data.data[0].description);
        setloading(false);
      })
      .catch((err) => console.log(err));
  }

  function uploadImages01() {
    myRefname.current.click();
    console.log(myRefname.current.click());
  }

  function uploadImg(e) {
    myRefname1.current.click();
    e.target.src;
    console.log(e.target.src);
  }
  function uploadProfileImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const Url = URL.createObjectURL(file);
    setDp(file);
    setImageUrl(Url);
  }

  function postMessages(e) {
    e.preventDefault();
    let date = new Date();
    let timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    let fd = new FormData();
    fd.append('sender', localStorage.getItem('email_id'));
    fd.append('receiver', data.email_id);
    fd.append('message', msg ? msg : 'nil');
    fd.append('timestamp', timestamp);
    axios
      .post(`${api}Chatting`, fd)
      .then((res) => {
        axios
          .get(
            `${api}ChatHistory?email_id=${localStorage.getItem('email_id')}&chat_id=${
              res.data.chat_id
            }`
          )
          .then((res1) => {
            console.log(res1);
            NotificationManager.success('Message has been sent.', 'Success', 3000);
            console.log(res1.data.data.data[0]['c_m_id']);
            navigate('/inbox/' + res.data.chat_id + '/' + res1.data.data.data[0].c_m_id);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function uploadImages(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('email_id', emailId);
    formData.append('photo', e.target.files[0]);
    axios
      .post(`${api}UserGalleryAdd`, formData)
      .then(() => {
        // console.log(res.data);
        viewGalleryImages();
        NotificationManager.success('Image Uploaded Successfully!', 'Success', 3000);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, 'Error', 3000);
      });
  }

  function viewGalleryImages() {
    axios
      .get(`${api}UserGalleryView?email_id=${emailId}`)
      .then((res) => {
        setGallery(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteImages(e, id) {
    e.preventDefault();
    axios
      .get(`${api}GalleryImgDel?pc_id=${id}`)
      .then(() => {
        viewGalleryImages();
        NotificationManager.info('Image Deleted Successfully!', 'Success', 3000);
      })
      .catch((err) => console.log(err));
  }

  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }

  function giftSubmitHandler() {
    if (giftAmount > 0) {
      var data = {
        sender_id: localStorage.getItem('email_id'),
        receiver_id: emailId,
        total_koobo: giftAmount
      };
      axios
        .post(`${api}gift/koobo`, data)
        .then((res) => {
          if (res.data.status == 'success') {
            setGiftPopup(false);
            NotificationManager.success(res.data.message, 'Success', 3000);
          } else if (res.data.status == 'failed') {
            NotificationManager.error(res.data.error, 'Error', 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr('Please fill the form values correctly.');
    }
  }

  useEffect(() => {
    getUser();
    viewGalleryImages();
  }, [emailId]);

  function winkHandler(e) {
    e.preventDefault();
    // if (data.winked != 1) {
    axios
      .post(`${api}UserWink`, {
        receiver: data.email_id,
        sender: localStorage.getItem('email_id')
      })
      .then((res) => {
        if (res.data.status == 'success' && res.data.winked == 1) {
          NotificationManager.success(`You have winked.`, 'Success', 3000);
          getUser();
        } else if (res.data.status == 'success' && res.data.winked == 0) {
          axios
            .post(`${api}UserWink`, {
              receiver: data.email_id,
              sender: localStorage.getItem('email_id')
            })
            .then((res) => {
              if (res.data.status == 'success')
                NotificationManager.error(`You have already winked`, 'Success', 3000);
            });
        }
      })
      .catch((err) => console.log(err));
    // } else {
    //   console.log(data);
    //   NotificationManager.error(`You have already winked`, 'Success', 3000);
    // }
  }
  const OffEditMode = () => {
    setIsEditMode(false);
    window.location.reload();
  };
  const tooltip = <Tooltip id="tooltip">{data.name ? data.name : ''}</Tooltip>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StyledProfileDetails>
          <div className="header-section">
            {isEditMode ? (
              <div className="row w-100">
                <div
                  className="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 m-2"
                  style={{ cursor: 'pointer' }}>
                  <ArrowLeftShort
                    className="fs-1 text-warning"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      OffEditMode();
                      // setIsEditMode(false);
                    }}
                  />
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  {/* <Heading title="Profile Details" className='bg-danger' /> */}
                  <h4 className="w-100 heading m-1 fw-bold"> Edit Details</h4>
                </div>
              </div>
            ) : (
              <Fragment>
                <div className="row w-100">
                  <div className="col-lg-1 col-sm-2 arrow" style={{ cursor: 'pointer' }}>
                    <ArrowLeftShort
                      className="fs-1 text-warning"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(-1)}
                    />
                  </div>
                  <div className="col-lg-8 col-sm-8">
                    {/* <Heading title="Profile Details" className='bg-danger' /> */}
                    <h4 className="w-100 heading m-1 fw-bold"> Profile Details</h4>
                  </div>

                  <div
                    className={` cursor-pointer col-lg-3 col-sm-3  ${
                      emailId != localStorage.getItem('email_id')
                        ? 'd-flex align-items-center justify-content-around'
                        : 'd-flex align-items-center justify-content-end'
                    }`}>
                    {emailId != localStorage.getItem('email_id') && (
                      <img
                        style={{ paddingRight: '10px' }}
                        onClick={(e) => winkHandler(e)}
                        src={winkPic}
                      />
                    )}
                    {emailId == localStorage.getItem('email_id') && (
                      <img
                        onClick={handleEditModeOn}
                        src={Pencil}
                        style={{ paddingRight: '10px' }}
                      />
                    )}
                    {emailId != localStorage.getItem('email_id') && (
                      <img
                        style={{ width: '50px', paddingRight: '10px' }}
                        onClick={() => setGiftPopup(true)}
                        src={GiftIcon}
                      />
                    )}

                    {emailId != localStorage.getItem('email_id') && (
                      <img
                        style={{ width: '40px' }}
                        onClick={(e) => setMessagePopup(true)}
                        src={ChatIcon}
                      />
                    )}

                    {/*<div className="profile-actions">*/}
                    {/*  <a href="javascript:void(0)" onClick={(e) => setMessagePopup(true)}>*/}
                    {/*    Add Messages*/}
                    {/*  </a>*/}
                    {/*</div>*/}
                    {/* <div className='cursor-pointer btn p-0 mx-2'><Link className="text-warning text-decoration-none" to="/dweki/my-orders"><i className="bi bi-cart-check fs-3"></i></Link></div> */}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <div className="profileDetails-container">
            <div className="row w-100">
              <input
                type="file"
                style={{ opacity: '-4' }}
                ref={myRefname1}
                onChange={(e) => uploadProfileImage(e)}
                name="dp"
                id="dp"
              />
              <div className="col-lg-6 userDetailPanel-container m-0">
                <div className="userdetialWrapper">
                  <div className="userDetailPanel">
                    <div className="userDetailPanel-header ">
                      {isEditMode && <label>Upload Image</label>}

                      {isEditMode ? (
                        <div className="userDetailPanel-header-image">
                          {data.dp ? (
                            <img
                              className="image"
                              // src={`${img}${data.dp}`}
                              src={ImageUrl}
                              onClick={(e) => uploadImg(e)}
                              alt="No Image"
                              width="250px"
                              height="100%"
                            />
                          ) : (
                            <img src={UserImage} alt="" onClick={(e) => uploadImg(e)} />
                          )}
                        </div>
                      ) : (
                        <div className="userDetailPanel-header-image">
                          {data.dp ? (
                            <img src={`${img}${data.dp}`} alt="No Image" width="250px" />
                          ) : (
                            <img src={UserImage} alt="" />
                          )}
                        </div>
                      )}

                      <div className="userDetailPanel-header-name font-roboto">
                        <OverlayTrigger placement="right" overlay={tooltip}>
                          <h3
                            className="d-inline-block text-truncate"
                            style={{ maxWidth: '240px' }}>
                            {data.name ? data.name : ''}
                          </h3>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="userDetailPanel-body">
                      {isEditMode ? (
                        <EditProfileDetails data={data} dp={dp} />
                      ) : (
                        <Fragment>
                          <ProfileDetailsItem
                            label="Email"
                            value={data.email_id ? data.email_id : 'N/A'}
                          />
                          <ProfileDetailsItem
                            label="Gender"
                            value={data.gender ? data.gender : 'N/A'}
                          />
                          <ProfileDetailsItem
                            label="Nationality"
                            value={data.nationality ? data.nationality : 'N/A'}
                          />
                          <ProfileDetailsItem
                            label="Ethnicity"
                            value={data.community ? data.community : 'N/A'}
                          />
                          <ProfileDetailsItem label="Date of Birth" value={age ? age : 'N/A'} />
                          <ProfileDetailsItem
                            label="Location"
                            value={data.country ? data.country : 'N/A'}
                          />
                          <ProfileDetailsItem
                            label="Relationship"
                            value={data.relationshipstats ? data.relationshipstats : 'N/A'}
                          />
                          <ProfileDetailsItem
                            label="Bio"
                            value={data.description ? data.description : 'N/A'}
                          />
                        </Fragment>
                      )}
                    </div>
                    {JSON.parse(localStorage.getItem('all_data'))[0].tutor_st == 1 && (
                      <button
                        style={{
                          marginTop: '20px',
                          marginLeft: '32px',
                          background: '#F19C00',
                          borderRadius: '20px',
                          height: '60px',
                          width: '70%',
                          border: 'transparent',
                          color: 'white'
                        }}
                        onClick={() => {
                          navigate('/add-time-slots');
                        }}>
                        ADD/VIEW TIMESLOTS
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 userDetailView-container">
                <div className="userDetailView ">
                  <div className="userDetailView-top mb-3">
                    <div className={`userDetailView-lessonbadge ${isEditMode ? '' : 'me-4'}`}>
                      <div className="lessonbadge">
                        <div className="lessonbadge-value font-roboto">
                          {data.compl_lessons ? data.compl_lessons : 0}
                        </div>
                        <div className="lessonbadge-label">Lessons</div>
                      </div>
                      <div className="Border m-1"></div>
                      <div className="lessonbadge">
                        <div className="lessonbadge-value">0</div>
                        <div className="lessonbadge-label">Badge</div>
                      </div>
                    </div>
                    <div className="mt-1 d-flex flex-row">
                      {!isEditMode && (
                        <div className="userDetailView-badgeswinks">
                          <div
                            onClick={() => {
                              navigate('/badges/profile/' + data.email_id);
                            }}
                            className="badgeswinks-btn w-50 me-1 active">
                            Badges
                          </div>
                          {emailId == localStorage.getItem('email_id') && (
                            <div
                              onClick={() => {
                                navigate('/winks');
                              }}
                              className="badgeswinks-btn w-50 ms-1 ">
                              My Winks
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditMode ? (
                    <Fragment>
                      <ImageList
                        sx={{ width: 'auto', maxHeight: 550 }}
                        variant="woven"
                        cols={2}
                        gap={4}>
                        {gallery &&
                          gallery.length > 0 &&
                          gallery?.map((item) => {
                            return (
                              <UserCard
                                item={item}
                                key={item.pc_id}
                                active={false}
                                editingProfile={isEditMode}
                                deleteImages={deleteImages}
                              />
                            );
                          })}
                      </ImageList>
                      <div className="text-center" style={{ width: '40%', height: '20px' }}>
                        <UserCard
                          cross={false}
                          item={{ image: UserAddImage }}
                          active={false}
                          editingProfile={isEditMode}
                          uploadImages01={uploadImages01}
                        />
                        <input
                          type="file"
                          style={{ opacity: '-4' }}
                          ref={myRefname}
                          name="photo"
                          accept="image/*"
                          onChange={(e) => uploadImages(e)}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <h4 className="my-4 fw-bolder text-center">Uploaded Images</h4>

                      <ImageList
                        sx={{ width: 'auto', maxHeight: 550 }}
                        variant="woven"
                        cols={2}
                        gap={4}>
                        {gallery &&
                          gallery.length > 0 &&
                          gallery?.map((item) => {
                            return (
                              <UserCard
                                item={item}
                                key={item.pc_id}
                                active={false}
                                editingProfile={isEditMode}
                                deleteImages={deleteImages}
                              />
                            );
                          })}
                      </ImageList>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Modal show={messagePopup} onHide={messagePopup}>
            <Modal.Header>
              <Modal.Title>{data.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div style={{ textAlign: 'center' }}>
                <div className="ask-session-body">
                  <div className="form-group" style={{ paddingBottom: '10px' }}>
                    <input
                      className="form-control"
                      type="text"
                      required
                      placeholder="Write Message"
                      onChange={(e) => setMsg(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-warning" onClick={() => setMessagePopup(false)}>
                Cancel
              </Button>
              <Button variant="btn btn-success" onClick={(e) => postMessages(e)}>
                Send Message
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={giftPopup} onHide={giftPopup}>
            {/*<Modal.Header>*/}
            {/*  <Modal.Title>Send Gift Amount</Modal.Title>*/}
            {/*</Modal.Header>*/}

            <Modal.Body>
              {err ? <div className="alert alert-danger">{err}</div> : null}
              <div style={{ textAlign: 'center' }}>
                <img style={{ height: '150px', paddingBottom: '30px' }} src={GiftIconLarge} />
                <div className="ask-session-body">
                  <div className="form-group" style={{ paddingBottom: '10px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontWeight: 'bold',
                        paddingBottom: '30px',
                        color: 'darkgoldenrod'
                      }}>
                      Available: {JSON.parse(localStorage.getItem('all_data'))[0].total_koobo}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      required
                      placeholder="Add Kọbọ"
                      onChange={(e) => setGiftAmount(e.target.value)}
                    />
                  </div>
                  {/*<div className="form-group" style={{ paddingBottom: '10px' }}>*/}
                  {/*  <input*/}
                  {/*    className="form-control"*/}
                  {/*    type="email"*/}
                  {/*    required*/}
                  {/*    placeholder="Sender Email"*/}
                  {/*    onChange={(e) => setGiftSenderEmail(e.target.value)}*/}
                  {/*  />*/}
                  {/*</div>*/}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-warning" onClick={() => setGiftPopup(false)}>
                Cancel
              </Button>

              <Button variant="btn btn-success" onClick={() => giftSubmitHandler()}>
                Gift Kobo
              </Button>
            </Modal.Footer>
          </Modal>
        </StyledProfileDetails>
      )}
    </>
  );
}

export default ProfileDetails;

const ProfileDetailsItem = ({ label, value }) => {
  return (
    <StyledProfileDetailsItem className="userDetailPanel-body-item">
      <div className="userDetailPanel-body-item-label">
        <h5 style={{ fontSize: '15px' }}>{label}</h5>
      </div>
      <div className="userDetailPanel-body-item-value">
        <h6 style={{ fontSize: '15px' }}>{value}</h6>
      </div>
    </StyledProfileDetailsItem>
  );
};

const StyledProfileDetailsItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  padding: 0 1rem;
  .userDetailPanel-body-item-label {
    width: 40%;
  }
  .userDetailPanel-body-item-value {
    width: 60%;
    word-break: break-all;

    color: #8f8f8f;
    display: flex;
    justify-content: flex-start;
  }
`;

const StyledProfileDetails = styled.div`
  .header-section {
    /* padding: 2rem 1rem; */
    display: flex;
    justify-content: space-between;
    .userdetialWrapper {
      background: #f3a81f;
    }
    @media (min-width: 768px) {
      padding: 1.5rem 1.5rem 0 1.5rem;
    }
    @media (min-width: 992px) {
      padding: 3rem 3rem 0 3rem;
    }
  }
  .profileDetails-container {
    padding: 2rem 0.3rem;

    @media (min-width: 768px) {
      padding: 2rem 0.8rem 0 0.8rem;
    }
    @media (min-width: 992px) {
      padding: 3rem 1rem 0 1rem;
    }
  }
  .heading {
    text-align: start;
  }
  @media (max-width: 450px) {
    .arrow {
      display: none;
    }
    .heading {
      text-align: center;
    }
  }
  @media (max-width: 300px) {
    .header-section {
      width: 100%;
      padding: 0;
    }
    .userDetailPanel-container {
      display: flex;
      align-items: center;
      justify-content: center;
      /* min-width: 200px; */
      /* width: 80%; */
    }
    .arrow {
      display: none;
    }
    .heading {
      text-align: center;
    }
  }
  .userDetailPanel {
    background-color: white;
    border-radius: 15px;
    width: 100%;
    padding: 0 1rem;
    padding-bottom: 2rem;
    .userDetailPanel-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 2rem;
      padding-bottom: 4rem;
      .userDetailPanel-header-image {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .userDetailPanel-header-name {
        margin-top: 0.8rem;
        h3 {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  /* .userDetailPanel-container {
    min-width: 380px;
  } */
  .userDetailView-container {
    flex: 2;
  }

  .userDetailView {
    .userDetailView-top {
      display: flex;
      flex-direction: column;
      /* margin: 12px; */
      .userDetailView-lessonbadge {
        flex: 1;
        background-color: #00000029;
        border-radius: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.6rem 0;
        .lessonbadge {
          flex: 1;
          display: flex;
          margin: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .lessonbadge-value {
            font-size: 26px;
            font-weight: 700;
            line-height: 26px;
          }
          .lessonbadge-label {
            color: #8e8f94;
            font-size: 12px;
            font-weight: 700;
          }
        }
        .Border {
          background-color: #d6d6d6;
          width: 5px;
          height: 60%;
        }
      }
      .userDetailView-badgeswinks {
        flex: 1;
        background-color: #00000029;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 0.6rem;
        .badgeswinks-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          color: #8f8f8f;
          font-weight: 600;
          cursor: pointer;
          border-radius: 7px;
          &.active {
            background-color: #f3a81f;
            color: #fff;
          }
        }
      }
    }
  }

  @media (min-width: 1100px) and (max-width: 1250px) {
    .userDetailView-top {
      flex-direction: column;
      .userDetailView-lessonbadge {
        margin: 0 !important;
        margin-bottom: 0.5rem !important;
      }
    }
  }
  @media (max-width: 380px) {
    .userDetailPanel-container {
      padding: 0 !important;
      margin: 0 !important;
    }
    .userdetialWrapper {
      background-color: #fff;
      margin-left: 10%;
    }
  }
  @media (max-width: 450px) {
    .userdetialWrapper,
    .userDetailView {
      background-color: #fff;
      margin-left: 8%;
    }
  }
`;
