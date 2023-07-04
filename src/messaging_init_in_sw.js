// import { initializeApp } from 'firebase/app';
// import 'firebase/messaging';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYbZad7qmDsIbVk-nZict_Yi8f0QvGIIY',
//   authDomain: 'esan-a5a1f.firebaseapp.com',
//   databaseURL: 'https://esan-a5a1f.firebaseio.com',
//   projectId: 'esan-a5a1f',
//   storageBucket: 'esan-a5a1f.appspot.com',
//   messagingSenderId: '240955392870',
//   appId: '1:240955392870:web:ec1dc8a02442f5a1a5bea7',
//   measurementId: 'G-TRHMCKKYK9'
// };

// function requestPermission() {
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       // console.log('Notification permission granted.');
//       const app = initializeApp(firebaseConfig);

//       const messaging = getMessaging(app);
//       getToken(messaging, {
//         vapidKey:
//           'BH2XxSHHYV3p3mrdLfZCJJHLVgrIXjYdjUrbJi8Dt0-eFIQKo0pVCFg2vNMEZyqqas0MAmLK7F97g2X70hBPxS8'
//       }).then((currentToken) => {
//         if (currentToken) {
//           // console.log('currentToken: ', currentToken);
//           localStorage.setItem('device_token', currentToken);
//         } else {
//           // console.log('Can not get token');
//         }
//       });
//     } else {
//       // console.log('Do not have permission!');
//     }
//   });
// }

// requestPermission();

// const app = initializeApp(firebaseConfig);

// const messaging = getMessaging(app);

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
