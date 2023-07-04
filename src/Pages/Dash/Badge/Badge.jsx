import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import ChiefIcon from '../../../assets/images/chief_icon.png';
// import ElephantHunterIcon from '../../../assets/images/elephant_hunter_icon.png';
// import FarmerIcon from '../../../assets/images/farmer_icon.png';
// import FishermanIcon from '../../../assets/images/fisherman_icon.png';
// import HunterIcon from '../../../assets/images/hunter_icon.png';
// import KingIcon from '../../../assets/images/king_icon.png';
// import NativeDoctorIcon from '../../../assets/images/native_doctor_icon.png';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Chief_F from '../../../assets/images/badges/chief_f_w.png';
import Chief_M from '../../../assets/images/badges/chief_w.png';
import ElephentHunter_F from '../../../assets/images/badges/elephanthunter_f_w.png';
import ElephentHunter_M from '../../../assets/images/badges/elephanthunter_w.png';
import Farmer_F from '../../../assets/images/badges/farmer_f_w.png';
import Farmer_M from '../../../assets/images/badges/farmer_w.png';
import Fisherman_F from '../../../assets/images/badges/fishergirl_f_w.png';
import Fisherman_M from '../../../assets/images/badges/fisherman_w.png';
import Hunter_F from '../../../assets/images/badges/hunter_f_w.png';
import Hunter_M from '../../../assets/images/badges/hunter_w.png';
import King from '../../../assets/images/badges/king_w.png';
import NativeDoctor_F from '../../../assets/images/badges/nativedoctor_f_w.png';
import NativeDoctor_M from '../../../assets/images/badges/nativedoctor_w.png';
import Queen from '../../../assets/images/badges/queen_f_w.png';
import VerticalIcon from '../../../assets/images/vertical_bar_icon.png';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Heading from '../../../Components/Common/Heading';
import ProgressBar from '../../../Components/Common/Progressbar';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';
// React Notification
import { NotificationManager } from 'react-notifications';

function Badge() {
  let images = {
    image_1: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? Farmer_M : Farmer_F,
    image_2:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? Fisherman_M : Fisherman_F,
    image_3:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male'
        ? NativeDoctor_M
        : NativeDoctor_F,
    image_4: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? Hunter_M : Hunter_F,
    image_5:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male'
        ? ElephentHunter_M
        : ElephentHunter_F,
    image_6: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? Chief_M : Chief_F,
    image_7: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? King : Queen,
    image_title7:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'male' ? 'King' : 'Queen'
  };
  const location = useLocation();

  const [data, setData] = useState(false);
  const [isLoader, setisLoader] = useState(true);
  // const [err, setErr] = useState(false);

  useEffect(() => {
    var language = localStorage.getItem('lang');
    if (!language) {
      // alert('Please choose your language first.');
      NotificationManager.error('Please choose your language first.', 'Error', 3000);
      setisLoader(false);
    } else {
      getData();
    }
  }, []);

  function getData() {
    var pathArr = location.pathname.split('/');

    var language = JSON.parse(localStorage.getItem('all_data'))[0].current_target_lang;
    if (localStorage.getItem('lang') != 'null') {
      language = localStorage.getItem('lang');
    }
    axios
      .get(`${api}GetLanguageDetails?email_id=${pathArr[3]}&language=${language}`)
      .then((res) => {
        if (res.data?.status == 'success') {
          setisLoader(false);
          setData(res.data?.data[0]);
        } else {
          setisLoader(false);
          //alert('No Content Found!!');
          NotificationManager.info('No Content Found!', 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate()
  return (
    <StyledBadge>
      {isLoader && <Loader />}
      <div className='row mb-4'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-11'>
          <Heading title="Badges" />
        </div>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-between w-100">
        <img className="my-bar" src={VerticalIcon} />
        {/*{progressBardata?.map((item) => {*/}
        {/*  return (*/}
        {/*    <div*/}
        {/*      key={item.id}*/}
        {/*      className="d-flex flex-column align-items-center justify-content-center">*/}
        {/*      <ProgressBar value={item.value} />*/}
        {/*      <img className="my-3 badge-icon" src={item.badge} />*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
        <>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_farmer ? data?.score_farmer : 0} />
            <img className="my-3 badge-icon" src={images.image_1} />
            <p>Farmer</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_fisherman ? data?.score_fisherman : 0} />
            <img className="my-3 badge-icon" src={images.image_2} />
            <p>Fisher</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_nat_doctor ? data?.score_nat_doctor : 0} />
            <img className="my-3 badge-icon" src={images.image_3} />
            <p>Native Doctor</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_hunter ? data?.score_hunter : 0} />
            <img className="my-3 badge-icon" src={images.image_4} />
            <p>Hunter</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_elephant_hunt ? data?.score_elephant_hunt : 0} />
            <img className="my-3 badge-icon" src={images.image_5} />
            <p>Elephant Hunter</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_chief ? data?.score_chief : 0} />
            <img className="my-3 badge-icon" src={images.image_6} />
            <p>Chief</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ProgressBar value={data?.score_king ? data?.score_king : 0} />
            <img className="my-3 badge-icon" src={images.image_7} />
            <p>{images.image_title7}</p>
          </div>
        </>
      </div>
    </StyledBadge>
  );
}

const StyledBadge = styled.div`
 @media (max-width: 768px) {

   p{
     font-size: 0.6rem;
     bottom: 0;
   }
 }
  padding: 2rem 1rem;
  .badges-container {
    padding: 2rem 0;
    max-height: 375px;
  }
  .badge-icon {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }
  .my-bar {
    margin-bottom: 5rem;
  }
  .my-bar {
    max-height: 375px;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
    .badges-container {
      padding: 2rem 0;
      max-height: 488px;
    }
    .badge-icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
    .my-bar {
      margin-bottom: 6rem;
    }
    .my-bar {
      max-height: 488px;
    }
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
    .badges-container {
      padding: 2rem 0;
      max-height: 488px;
    }
    .badge-icon {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
    .my-bar {
      margin-bottom: 6rem;
    }
    .my-bar {
      max-height: 488px;
    }
  }

  @media (min-width: 1200px) {
    .badges-container {
      padding: 2rem 0;
      max-height: 600px;
    }
    .badge-icon {
      width: 72px;
      height: 72px;
      object-fit: contain;
    }
    .my-bar {
      margin-bottom: 6rem;
    }
    .my-bar {
      max-height: 600px;
    }
  }
  @media (min-width: 1400px) {
    .badges-container {
      padding: 2rem 0;
      max-height: 755px;
    }
    .badge-icon {
      width: 90px;
      height: 90px;
      object-fit: contain;
    }
    .my-bar {
      margin-bottom: 6rem;
    }
    .my-bar {
      max-height: 755px;
    }
  }
`;

export default Badge;
