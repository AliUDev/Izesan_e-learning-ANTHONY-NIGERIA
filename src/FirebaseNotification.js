// import React, { useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { onForegroundMessage, onMessageListener, requestForToken } from './firebase';

// const FirebaseNotification = () => {
//   const [notification, setNotification] = useState({ title: '', body: '' });
//   const notify = () => toast(<ToastDisplay />);
//   console.log('Notification Page is Active');
//   function ToastDisplay() {
//     return (
//       <div>
//         <p>
//           <b>{notification?.title}</b>
//         </p>
//         <p>{notification?.body}</p>
//       </div>
//     );
//   }
//   useEffect(() => {
//     if (notification?.title) {
//       notify();
//     }
//   }, [notification]);

//   requestForToken();

//   onMessageListener()
//     .then((payload) => {
//       setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
//       console.log(payload);
//     })
//     .catch((err) => console.log('failed: ', err));

//   onForegroundMessage()
//     .then((payload) => {
//       setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
//       console.log(payload);
//     })
//     .catch((err) => console.log('failed: ', err));

//   return (
//     <>
//       <Toaster />
//       {/* <button onClick={() => setNotification({ title: 'Faizan', body: 'How are you' })}>Hi</button> */}
//     </>
//   );
// };

// export default FirebaseNotification;
