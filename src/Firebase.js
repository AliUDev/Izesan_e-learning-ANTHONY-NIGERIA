// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYbZad7qmDsIbVk-nZict_Yi8f0QvGIIY',
  authDomain: 'esan-a5a1f.firebaseapp.com',
  databaseURL: 'https://esan-a5a1f.firebaseio.com',
  projectId: 'esan-a5a1f',
  storageBucket: 'esan-a5a1f.appspot.com',
  messagingSenderId: '240955392870',
  appId: '1:240955392870:web:ec1dc8a02442f5a1a5bea7',
  measurementId: 'G-TRHMCKKYK9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      'BH2XxSHHYV3p3mrdLfZCJJHLVgrIXjYdjUrbJi8Dt0-eFIQKo0pVCFg2vNMEZyqqas0MAmLK7F97g2X70hBPxS8'
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        localStorage.setItem('device_token', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
requestForToken();
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
