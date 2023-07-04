import axios from 'axios';
import { api } from './url';
export default {
  postRequest: (url, body) => {
    axios
      .post(`${api}${url}`, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  // orderPizza: (toppings = {}) => {
  //   // Order a pizza with some sweet toppings.
  // }
};

export const fuc = () => {
  const email = localStorage.getItem('email_id');
  let uniqueName = email.split('@')[0];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  var seconds = localStorage.getItem(uniqueName + '__' + formattedDate);
  const minutes = Math.floor(seconds / 60);
  axios
    .post(`${api}earn-koobos`, {
      email_id: email,
      usage_time: minutes,
      date: formattedDate
    })
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
      localStorage.setItem("It's Triggered Error", err);
    });
};
