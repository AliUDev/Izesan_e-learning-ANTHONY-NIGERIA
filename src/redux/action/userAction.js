import axios from 'axios';
import Cookies from 'js-cookie';
import { api } from '../../url';

const guestData = [
  {
    email_id: 'guestUser',
    password: '',
    current_target_lang: null,
    esan_cur_chap_no: 1,
    eng_cur_chapter_no: 1,
    created_at: '2023-01-16 04:48:23',
    gender: 'Male',
    dp: null,
    name: 'Guest',
    quiz_score_esan: null,
    quiz_score_english: null,
    current_quiz_esan: null,
    current_quiz_eng: null,
    esan_score_farmer: null,
    esan_score_fisherman: null,
    esan_score_nat_doctor: null,
    esan_score_hunter: null,
    esan_score_elephant_hunt: null,
    esan_score_chief: null,
    esan_score_king: null,
    eng_score_farmer: null,
    eng_score_fisherman: null,
    eng_score_nat_doctor: null,
    eng_score_hunter: null,
    eng_score_elephant_hunt: null,
    eng_score_chief: null,
    eng_score_king: null,
    esan_quiz_status: null,
    english_quiz_status: null,
    spoken_language: null,
    lang_to_teach: null,
    trial_rate: null,
    hourly_rate: null,
    tutor_st: 0,
    device_id: ' ',
    chat_count: 0,
    age: '',
    nationality: '',
    community: '',
    phone: null,
    relationshipstats: '',
    description: '',
    country: '',
    intro_video: null,
    tutor_rating: 0,
    free_quiz: '0',
    zoom_link: null,
    gmt_time: '2023-01-16 04:48:23',
    tutor_st_verified: '0',
    total_koobo: 0,
    profile_complete: null,
    have_laptop: null,
    have_internet: null,
    teaching_experience: null,
    teach_state: null,
    teach_city: null,
    teach_country: null,
    compl_lessons: null,
    updated_at: '2023-01-18 11:05:22',
    is_notifications_enabled: 0,
    daily_usage_time: '0',
    usage_time_updated_at: null,
    complete_lesson_count: '0',
    deleted_at: null,
    verification_token: '',
    email_verified_at: '2023-01-18 04:48:23',
    selected_interest_type: null,
    email_subscription: 1,
    hear_about_us: '',
    is_news_subscribed: 0
  }
];

export const guestUser = () => {
  console.log('Guest');
  localStorage.setItem('all_data', JSON.stringify(guestData));
  localStorage.setItem('email_id', 'guestUser');
  window.location.href = '#/languages';
};

export const signupUser = (
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
  dp
  // e
) => {
  return function (dispatch) {
    // e.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email_id', email_id);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    formData.append('age', age);
    formData.append('nationality', nationality);
    formData.append('community', community);
    formData.append('relationshipstats', relationshipstats);
    formData.append('country', country);
    formData.append('gender', gender);
    formData.append('dp', dp);
    for (let i = 0; i < dp.length; i++) {
      formData.append(`dp[${i}]`, dp[i]);
    }
    console.log(formData);
    axios
      .post(`${api}sign_up`, formData)
      .then((res) => {
        if (res.data.status == 'success') {
          let email_id = res.data.data.map((list) => {
            return list.email_id;
          });
          localStorage.setItem('email_id', email_id);
          localStorage.setItem('all_data', JSON.stringify(res.data.data));
          localStorage.setItem('count', 0);
          localStorage.setItem('attempt', 0);
          localStorage.setItem('q_incr', 1);
          localStorage.setItem('newuser', true);
          const data = res.data.data;
          dispatch({
            type: 'SIGNUP_USER',
            data: data,
            success: 1
          });
        } else {
          dispatch({
            type: 'SIGNUP_USER',
            payload: res.data.error,
            success: 0
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const loginUser = (email_id, password, rememberMe, e) => {
  return function (dispatch) {
    // e.preventDefault();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email_id)) {
      dispatch({
        type: 'LOGIN_USER',
        payload1: 'Email format is invalid',
        success: 0
      });

      setTimeout(() => {
        dispatch({
          type: 'LOGIN_USER',
          payload1: '',
          success: 0
        });
      }, 3000);

      return false;
    }

    const token = localStorage.getItem('device_token');

    let formData = {
      email_id,
      password,
      device_id: token
    };
    axios
      .post(`${api}PersonSigninNew`, formData, {
        // headers: { 'Content-Type': 'application/json'}
      })
      .then((res) => {
        if (res.data.status == 'success') {
          let email_id = res.data.data.map((list) => {
            return list.email_id;
          });
          localStorage.setItem('email_id', email_id);
          localStorage.setItem('all_data', JSON.stringify(res.data.data));
          localStorage.setItem('count', 0);
          localStorage.setItem('chapter_no', 0);
          // localStorage.setItem('chapter_type', 0);
          localStorage.setItem('crr_chapter_index', 0);
          localStorage.setItem('attempt', 0);
          localStorage.setItem('q_incr', 1);
          dispatch(setCurrentUser(res.data.data));
          dispatch({
            type: 'LOGIN_USER',
            data: res.data.data,
            success: 1
          });
          if (e) {
            Cookies.set('email', email_id, { expires: 14 });
            Cookies.set('password', password, { expires: 14 });
          }

          window.location.href = '#/languages';
          //window.location.href = 'https://cleyunited.org/website/'; // https://cleyunited.org/website
        } else {
          dispatch({
            type: 'LOGIN_USER',
            payload1: res.data.error,
            success: 0
          });

          setTimeout(() => {
            dispatch({
              type: 'LOGIN_USER',
              payload1: '',
              success: 0
            });
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };
};
export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  };
};

export const newsSubscribe = (news) => {
  return {
    type: 'NEWS_SUBSCRIBE',
    payload: news
  };
};
// function signIn(email_id, password, token = '', dispatch) {
//   let formData = {
//     email_id,
//     password,
//     device_id: token
//   };
//   axios
//     .post(`${api}PersonSigninNew`, formData)
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.status == 'success') {
//         let email_id = res.data.data.map((list) => {
//           return list.email_id;
//         });
//         localStorage.setItem('email_id', email_id);
//         localStorage.setItem('all_data', JSON.stringify(res.data.data));
//         localStorage.setItem('count', 0);
//         localStorage.setItem('chapter_no', 0);
//         localStorage.setItem('chapter_type', 0);
//         localStorage.setItem('crr_chapter_index', 0);
//         localStorage.setItem('attempt', 0);
//         localStorage.setItem('q_incr', 1);
//         dispatch(setCurrentUser(res.data.data));
//         dispatch({
//           type: 'LOGIN_USER',
//           data: res.data.data,
//           success: 1
//         });
//         // window.location.href = 'https://cleyunited.org/website/'; // https://cleyunited.org/website
//       } else {
//         dispatch({
//           type: 'LOGIN_USER',
//           payload: res.data.error,
//           success: 0
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// }
