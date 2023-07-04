import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DropDownIcon from '../../../../assets/images/dropdown_icon_2.png';
import ProfileImage from '../../../../assets/images/gray_pic.png';
import Heading from '../../../../Components/Common/Heading';

// import Farmer from '../../../../assets/images/farmer_icon.png';
// import FisherMan from '../../../../assets/images/fisherman_icon.png';
// import NativeDoctor from '../../../../assets/images/native_doctor_icon.png';
// import Hunter from '../../../../assets/images/hunter_icon.png';
// import ElephantHunter from '../../../../assets/images/elephant_hunter_icon.png';
// import Chief from '../../../../assets/images/chief_icon.png';
// import King from '../../../../assets/images/king_icon.png';

import Chief_F from '../../../../assets/images/badges/chief_f_w.png';
import Chief_M from '../../../../assets/images/badges/chief_w.png';
import ElephentHunter_F from '../../../../assets/images/badges/elephanthunter_f_w.png';
import ElephentHunter_M from '../../../../assets/images/badges/elephanthunter_w.png';
import Farmer_F from '../../../../assets/images/badges/farmer_f_w.png';
import Farmer_M from '../../../../assets/images/badges/farmer_w.png';
import Fisherman_F from '../../../../assets/images/badges/fishergirl_f_w.png';
import Fisherman_M from '../../../../assets/images/badges/fisherman_w.png';
import Hunter_F from '../../../../assets/images/badges/hunter_f_w.png';
import Hunter_M from '../../../../assets/images/badges/hunter_w.png';
import King from '../../../../assets/images/badges/king_w.png';
import NativeDoctor_F from '../../../../assets/images/badges/nativedoctor_f_w.png';
import NativeDoctor_M from '../../../../assets/images/badges/nativedoctor_w.png';
import Queen from '../../../../assets/images/badges/queen_f_w.png';

import axios from 'axios';
import ReactSelect from 'react-select';
import modalBrown from '../../../../assets/images/brown.png';
import modalYellow from '../../../../assets/images/gold.png';
import modalGreen from '../../../../assets/images/green.png';
import modalSilver from '../../../../assets/images/silver.png';
import { api, img } from '../../../../url';

function LeaderBoard2() {
  var currentGender = JSON.parse(localStorage.getItem('all_data'))[0].gender;

  function handleChange(selectedOption) {
    console.log(selectedOption.value);
    setSelectedOption(selectedOption);
  }

  let images = {
    image_1: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male' ? Farmer_M : Farmer_F,
    image_2:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male' ? Fisherman_M : Fisherman_F,
    image_3:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male'
        ? NativeDoctor_M
        : NativeDoctor_F,
    image_4: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male' ? Hunter_M : Hunter_F,
    image_5:
      JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male'
        ? ElephentHunter_M
        : ElephentHunter_F,
    image_6: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male' ? Chief_M : Chief_F,
    image_7: JSON.parse(localStorage.getItem('all_data'))[0].gender == 'Male' ? King : Queen
  };

  function getBadge1(b) {
    var b = {};
    if (localStorage.getItem('lang') == 'English') {
      b = {
        badge1: currentGender == 'Male' ? 'Farmer' : 'Farmer',
        badge2: currentGender == 'Male' ? 'Fisherman' : 'Fisherwomen',
        badge3: currentGender == 'Male' ? 'Native doctor' : 'Native doctor',
        badge4: currentGender == 'Male' ? 'Hunter' : 'Hunter',
        badge5: currentGender == 'Male' ? 'Elephant hunter' : 'Elephant hunter',
        badge6: currentGender == 'Male' ? 'Chief' : 'Chief',
        badge7: currentGender == 'Male' ? 'King' : 'Queen',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Esan' ||
      localStorage.getItem('lang') == 'English-Esan'
    ) {
      b = {
        badge1: 'Ọmugbo',
        badge2: 'Ọgbehẹn',
        badge3: 'Ọbo',
        badge4: 'Ohuẹ',
        badge5: 'Ọgbeenin',
        badge6: 'Ọkhaemọn',
        badge7: 'Ojie',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Yoruba' ||
      localStorage.getItem('lang') == 'English-Yoruba'
    ) {
      b = {
        badge1: 'Àgbẹ̀',
        badge2: 'Ápẹ́jà',
        badge3: 'Babaláwo',
        badge4: 'Odẹ́',
        badge5: 'Odẹ́ Erin',
        badge6: 'Ijòyè',
        badge7: currentGender == 'Male' ? 'Ọba' : 'Ọbabìnrin',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Igbo' ||
      localStorage.getItem('lang') == 'English-Igbo'
    ) {
      b = {
        badge1: 'Onye Ọrụ Ugbo',
        badge2: 'Onye Ọkụ Azụ',
        badge3: 'Dibịa',
        badge4: 'Dinta',
        badge5: 'Ọchụ nta Enyí',
        badge6: 'Ichie',
        badge7: currentGender ? 'Lolo' : 'Igwe',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Hausa' ||
      localStorage.getItem('lang') == 'English-Hausa'
    ) {
      b = {
        badge1: 'Manomi',
        badge2: 'Masunci',
        badge3: 'Boka',
        badge4: 'Mafaraucin',
        badge5: 'Mafaraucin giwa',
        badge6: 'Shugaba',
        badge7: currentGender == 'Male' ? 'Sarki' : 'Sarauniya',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Swahili' ||
      localStorage.getItem('lang') == 'English=Swahili'
    ) {
      b = {
        badge1: 'Mkulima',
        badge2: 'Mvuvi',
        badge3: 'Daktari asili',
        badge4: 'mwindaji',
        badge5: 'Mwindaji wa ndovu',
        badge6: 'chifu',
        badge7: currentGender == 'Male' ? 'Mfalme' : 'Malkia',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Twi' ||
      localStorage.getItem('lang') == 'English-Twi'
    ) {
      b = {
        badge1: 'Okuani',
        badge2: 'Ɔfareni',
        badge3: 'Ɔkɔmfoɔ',
        badge4: 'Ɔbɔmmɔfoɔ',
        badge5: 'Ɔsono bɔmmɔfoɔ',
        badge6: 'Ɔkorɔmfoɔ',
        badge7: currentGender == 'Male' ? 'Ɔhene' : 'Ɔhemmaa',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'IsiZulu' ||
      localStorage.getItem('lang') == 'English-IsiZulu' ||
      localStorage.getItem('lang') == 'Zulu' ||
      localStorage.getItem('lang') == 'English-Zulu'
    ) {
      b = {
        badge1: 'Umlimi',
        badge2: 'Umdobi',
        badge3: 'Inyanga',
        badge4: 'Umzingeli',
        badge5: 'Umzingeni wezindlovu',
        badge6: 'Induna',
        badge7: currentGender == 'Male' ? 'Inkosi' : 'Indlovukazi',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'SeTswana' ||
      localStorage.getItem('lang') == 'English-SeTswana'
    ) {
      b = {
        badge1: 'Àgbẹ̀',
        badge2: 'Ápẹ́jà',
        badge3: 'Babaláwo',
        badge4: 'Odẹ́',
        badge5: 'Odẹ́ Erin',
        badge6: 'Ijòyè',
        badge7: currentGender == 'Male' ? 'Ọba' : 'Ọbabìnrin',
        lang: localStorage.getItem('lang')
      };
    } else if (
      localStorage.getItem('lang') == 'Jamaican' ||
      localStorage.getItem('lang') == 'English-Jamaican'
    ) {
      b = {
        badge1: currentGender == 'Male' ? 'Faama' : 'Faama',
        badge2: currentGender == 'Male' ? 'Fisherman' : 'Fisherwomen',
        badge3: currentGender == 'Male' ? 'Obeah Man' : 'Obeah Woman',
        badge4: currentGender == 'Male' ? 'Unta' : 'Unta',
        badge5: currentGender == 'Male' ? 'Elephant Unta' : 'Elephant Unta',
        badge6: currentGender == 'Male' ? 'Badman' : 'Bad Gyal',
        badge7: currentGender == 'Male' ? 'Top Shotta' : 'Top Shotta',
        lang: localStorage.getItem('lang')
      };
    } else {
      b = {
        badge1: 'Manomi',
        badge2: 'Masunci',
        badge3: 'Boka',
        badge4: 'Mafaraucin',
        badge5: 'Mafaraucin giwa',
        badge6: 'Shugaba',
        badge7: currentGender == 'Male' ? 'Sarki' : 'Sarauniya',
        lang: localStorage.getItem('lang')
      };
    }
    return b;
  }

  const countries = [
    { value: 1, label: getBadge1().badge1, image: images.image_1 },
    { value: 2, label: getBadge1().badge2, image: images.image_2 },
    { value: 3, label: getBadge1().badge3, image: images.image_3 },
    { value: 4, label: getBadge1().badge4, image: images.image_4 },
    { value: 5, label: getBadge1().badge5, image: images.image_5 },
    { value: 6, label: getBadge1().badge6, image: images.image_6 },
    { value: 7, label: getBadge1().badge7, image: images.image_7 }
  ];

  const [selectedOption, setSelectedOption] = useState({
    value: 1,
    label: getBadge1().badge1,
    image: images.image_1
  });

  // const [items, setItems] = useState();
  const [dropdownItem, setdropdownItem] = useState(getBadge1().badge1);
  const [allImage, setAllImage] = useState(images.image_1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoader, setisLoader] = useState(true);
  const [data, setData] = useState(false);

  function getData(item = null) {
    // console.log(item != null ? item : dropdownItem != "farmer" ? "farmer" : null, "drop items");
    // let language = JSON.parse(localStorage.getItem('all_data'))[0].current_target_lang;
    let language = localStorage.getItem('lang');
    language = language.toLowerCase();
    axios
      .get(
        `${api}TopTenProfiles?email_id=${localStorage.getItem('email_id')}&badge=${item != null ? item : dropdownItem != 'farmer' ? 'farmer' : null
        }&language=${language}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 'success') {
          setisLoader(false);
          console.log(res.data);
          setData(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
    // setItems([
    //   {
    //     id: 1,
    //     name: 'Dacosta Wereko',
    //     notification: 'Lorem Ipsum Lorem Ipsum',
    //     profilepicture: ProfileImage,
    //     medal: GoldMedal,
    //     percentage: 88
    //   },
    //   {
    //     id: 2,
    //     name: 'Dacosta Wereko',
    //     notification: 'Lorem Ipsum Lorem Ipsum',
    //     profilepicture: ProfileImage,
    //     medal: SilverMedal,
    //     percentage: 66
    //   },
    //   {
    //     id: 3,
    //     name: 'Dacosta Wereko',
    //     notification: 'Lorem Ipsum Lorem Ipsum',
    //     profilepicture: ProfileImage,
    //     medal: BronzeMedal,
    //     percentage: 77
    //   },
    //   {
    //     id: 4,
    //     name: 'Dacosta Wereko',
    //     notification: 'Lorem Ipsum Lorem Ipsum',
    //     profilepicture: ProfileImage,
    //     medal: CopperMedal,
    //     percentage: 34
    //   }
    // ]);
  }, []);

  function changeDropdownValue(e) {
    setSelectedOption(e);
    // let currentValue = e.target.value;
    let currentValue = e.value;
    if (currentValue == 1) {
      setdropdownItem(getBadge1().badge1);
      setAllImage(images.image_1);
      setShowDropDown(false);
      getData('farmer');
    } else if (currentValue == 2) {
      setdropdownItem(getBadge1().badge2);
      setAllImage(images.image_2);
      setShowDropDown(false);
      getData('fisherman');
    } else if (currentValue == 3) {
      setdropdownItem(getBadge1().badge3);
      setAllImage(images.image_3);
      setShowDropDown(false);
      getData('nativedoctor');
    } else if (currentValue == 4) {
      setdropdownItem(getBadge1().badge4);
      setAllImage(images.image_4);
      setShowDropDown(false);
      getData('hunter');
    } else if (currentValue == 5) {
      setdropdownItem(getBadge1().badge5);
      setAllImage(images.image_5);
      setShowDropDown(false);
      getData('elephanthunter');
    } else if (currentValue == 6) {
      setdropdownItem(getBadge1().badge6);
      setAllImage(images.image_6);
      setShowDropDown(false);
      getData('chief');
    } else if (currentValue == 7) {
      setdropdownItem(getBadge1().badge7);
      setAllImage(images.image_7);
      setShowDropDown(false);
      getData('king');
    }
  }
  const navigate = useNavigate()
  return (
    <StyledFavorites className='p-5'>
      <div className='row w-100 m-2'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="Leaderboard" className='text-center m-1 text-decoration-underline fw-bold' />
        </div>
      </div>


      <ReactSelect
        value={selectedOption}
        options={countries}
        menuPlacement="auto"
        maxMenuHeight={500}
        isSearchable={false}
        // onChange={(e) => handleChange(e)}
        onChange={(e) => changeDropdownValue(e)}
        formatOptionLabel={(country) => (
          <div className="country-option">
            <img src={country.image} height="50px" alt="country-image" />
            <span style={{ paddingLeft: '20px' }}>{country.label}</span>
          </div>
        )}
      />

      <div className="w-100 mt-5">
        {/*<div className="">*/}
        {/*  <select*/}
        {/*    onChange={(e) => changeDropdownValue(e)}*/}
        {/*    className="form-select"*/}
        {/*    aria-label="Filter select">*/}
        {/*    /!* <option >Esan</option> *!/*/}
        {/*    <option value="1">*/}
        {/*      <img src={images.image_1} className="selected_img" alt="image_1" />*/}
        {/*      {getBadge1().badge1}*/}
        {/*    </option>*/}
        {/*    <option value="2">*/}
        {/*      <img src={images.image_2} className="selected_img" alt="image_2" />*/}
        {/*      {getBadge1().badge2}*/}
        {/*    </option>*/}
        {/*    <option value="3">*/}
        {/*      <img src={images.image_3} className="selected_img" alt="image_3" />*/}
        {/*      {getBadge1().badge3}*/}
        {/*    </option>*/}
        {/*    <img src={images.image_4} className="selected_img" alt="image_4" />*/}
        {/*    <option value="4">{getBadge1().badge4}</option>*/}
        {/*    <option value="5">*/}
        {/*      <img src={images.image_5} className="selected_img" alt="image_5" />*/}
        {/*      {getBadge1().badge5}*/}
        {/*    </option>*/}
        {/*    <option value="6">*/}
        {/*      <img src={images.image_6} className="selected_img" alt="image_6" />*/}
        {/*      {getBadge1().badge6}*/}
        {/*    </option>*/}
        {/*    <option value="7">*/}
        {/*      <img src={images.image_7} className="selected_img" alt="image_7" />*/}
        {/*      {getBadge1().badge7}*/}
        {/*    </option>*/}
        {/*  </select>*/}
        {/*</div>*/}
        <div>
          <div className="mt-4 px-2 justify-content-end gy-3">
            {data &&
              data.length > 0 &&
              data.map((data, index) => {
                function getRandomInt(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                }

                function medalImages(i) {
                  if (i > 3) {
                    i = getRandomInt(0, 4);
                  }
                  var img;
                  switch (i) {
                    case 0:
                      img = (
                        <img height="66px" width="38px" src={modalYellow} alt="no bage image" />
                      );
                      break;
                    case 1:
                      img = (
                        <img height="66px" width="38px" src={modalSilver} alt="no bage image" />
                      );
                      break;
                    case 2:
                      img = <img height="66px" width="38px" src={modalBrown} alt="no bage image" />;
                      break;

                    default:
                      img = <img height="66px" width="38px" src={modalGreen} alt="no bage image" />;
                      break;
                  }
                  return img;
                }
                return (
                  <Card key={index} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <div className="section1">
                        <div>
                          {data.user_data[0].dp ? (
                            <img src={`${img}${data.user_data[0].dp}`} className="user-image" />
                          ) : (
                            <img src={ProfileImage} alt=".." className="user-image" />
                          )}
                        </div>

                        <div className="m-auto user-texts">
                          <div className="username font-roboto">{data.user_data[0].name}</div>
                          {/*<p className="user-subtext font-roboto">{item.notification}</p>*/}
                        </div>
                      </div>
                      <div className="section2">
                        <div className=" m-auto d-flex justify-content-around">
                          <div className="m-auto my-badge">
                            {/*<img height="66px" width="38px" src={medalImages(index)} />*/}
                            <div className="board_badge">{medalImages(index)} </div>
                            <span
                              className="d-none d-md-block mx-1"
                              style={{
                                fontSize: '0.75rem'
                              }}>
                              <ProgressBar percentage={data.score} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" d-md-none progressbar-section">
                      <ProgressBar percentage={data.score} />
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>

      </div>
    </StyledFavorites>
  );
}

export default LeaderBoard2;

const ProgressBar = ({ percentage }) => {
  return (
    <StyledProgressBar>
      {[1, 2, 3, 4, 5, 6].map((num, i) => {
        return (
          <StyledLoading
            key={num}
            color={num * 16.6666666667 < percentage || percentage === 100}
            index={i}></StyledLoading>
        );
      })}
      <div className="progress-bar-text">{percentage}%</div>
    </StyledProgressBar>
  );
};

const StyledProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .progress-bar-text {
    font-weight: 600;
    color: #466166;
    margin-left: 0.6rem;
  }
  @media (min-width: 768px) {
    margin-top: 0.2rem;
  }
`;

const StyledFavorites = styled.div`
  padding: 2rem 1rem;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent url(${DropDownIcon}) no-repeat 99% center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .section1 {
    display: flex;
    align-items: center;
    .user-image {
      height: 14vh;
      width: 7vw;
      min-width: 7rem;
      min-height: 7rem;
      padding: 1rem;
      border-radius: 50%;
    }
    .user-texts {
      padding: 1rem 0;
      height: 100%;
      .username {
        color: #4d4f51;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .user-subtext {
        color: #8f8f8f;
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  .section2 {
    display: flex;
    align-items: center;
    padding-right: 2%;
  }
  .progress-icon {
    border-radius: 25%;
  }
  .form-select {
    font-weight: 600 !important;
  }
  .my-badge {
    display: flex;
    flex-direction: column;
    align-items: end;
    img {
      object-fit: contain;
    }
  }
  .progressbar-section {
    padding: 0 1rem 0.5rem;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const StyledLoading = styled.div`
  height: 0.5rem;
  width: 1.2rem;
  background: ${(props) => (props.color ? '#A1D363' : '#F1F4F5')};
  border-radius: 1rem;
`;
