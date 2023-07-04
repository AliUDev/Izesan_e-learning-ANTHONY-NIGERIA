import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { api } from '../url';

const client = axios.create({ baseURL: api });

export const request = ({ ...options }) => {
  // client.defaults.headers.common.Authorization = `Bearer Token`;
  const onSuccess = (response) => {
    console.log(response);
    NotificationManager.success('Data Featched', 'Success!', 3000);
  };
  const onError = (error) => {
    console.log(error);
    NotificationManager.error('Error', 'Server Error Occured!', 3000);
  };
  return client(options).then(onSuccess).catch(onError);
};
