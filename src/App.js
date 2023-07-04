import React, { lazy, Suspense, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NoInternet from './Components/Common/NoInternet/NoInternet';
// import './Firebase';
// import { requestForToken } from './Firebase';
import { fuc } from './Helpers';
import Offline from './Pages/Offline/Offline';
const DashLayout = lazy(() => import('./Components/Layouts/DashLayout'));
const Aza = lazy(() => import('./Pages/Dash/Aza/Aza'));
const Badge = lazy(() => import('./Pages/Dash/Badge/Badge'));
const BecomeATutor = lazy(() => import('./Pages/Dash/BecomeATutor/BecomeATutor'));
const VideoTutorial2 = lazy(() =>
  import('./Pages/Dash/BecomeATutor/BecomeATutor2/VideoTutorialPage2')
);
const Booking = lazy(() => import('./Pages/Dash/Booking/Booking'));
const UserBooking = lazy(() => import('./Pages/Dash/Booking/UserBooking'));
const Favorites = lazy(() => import('./Pages/Dash/Favorites/Favorites'));
const Inbox = lazy(() => import('./Pages/Dash/Inbox/Inbox'));
const ChatMessages = lazy(() => import('./Pages/Dash/Inbox/Messages/ChatMessages'));
const Info = lazy(() => import('./Pages/Dash/Info/Info'));
const Izedu = lazy(() => import('./Pages/Dash/Izedu/Izedu'));
const LiveClassesDetails = lazy(() => import('./Pages/Dash/LanguageDetails/LiveClassesDetails'));
const Languages = lazy(() => import('./Pages/Dash/Languages/Languages'));
const LeaderBoard = lazy(() => import('./Pages/Dash/LeaderBoard/LeaderBoard'));
const LeaderBoard2 = lazy(() => import('./Pages/Dash/LeaderBoard/LeaderBoard2/LeaderBoard2'));
const Lessons = lazy(() => import('./Pages/Dash/Lessons/Lessons'));
const LiveClasses = lazy(() => import('./Pages/Dash/LiveClasses/LiveClasses'));
const ProfileDetails = lazy(() => import('./Pages/Dash/ProfileDetails/ProfileDetails'));
const Users = lazy(() => import('./Pages/Dash/Users/Users'));
const AddViewTimeSlots = lazy(() => import('./Pages/Dash/ViewTimeSlots/AddViewTimeSlots'));
const ViewTimeSlots = lazy(() => import('./Pages/Dash/ViewTimeSlots/ViewTimeSlots'));
const Winks = lazy(() => import('./Pages/Dash/Winks/Winks'));
const PrivateRoute = lazy(() => import('./auth/PrivateRoute'));
const ChangePassword = lazy(() => import('./Pages/ChangePassword/ChangePassword'));
const Cart = lazy(() => import('./Pages/Dash/Dweki/Cart'));
const CheckOut = lazy(() => import('./Pages/Dash/Dweki/CheckOut'));
const Dweki = lazy(() => import('./Pages/Dash/Dweki/Dweki'));
const MyOrder = lazy(() => import('./Pages/Dash/Dweki/MyOrder'));
const IzeduVideo = lazy(() => import('./Pages/Dash/Izedu/IzeduVideo'));
const IzesanTutor = lazy(() => import('./Pages/Dash/IzesanTutor/IzesanTutor'));
const Library = lazy(() => import('./Pages/Dash/Library/Library'));
const LibraryAudio = lazy(() => import('./Pages/Dash/Library/LibraryAudio'));
const News = lazy(() => import('./Pages/Dash/News/News'));
const Promote = lazy(() => import('./Pages/Dash/Promote/Promote'));
const ReportProblem = lazy(() => import('./Pages/Dash/report/ReportProblem'));
const Tutor = lazy(() => import('./Pages/Dash/Tutor/Tutor'));
const ForgotPassword2 = lazy(() => import('./Pages/ForgotPassword/ForgotPassword2'));
const LessonDetail = lazy(() => import('./Pages/LessonDetail/Detail'));
const Lesson2 = lazy(() => import('./Pages/LessonDetail/Lesson2'));
const Login2 = lazy(() => import('./Pages/Login/Login2'));
const Notification = lazy(() => import('./Pages/Notification/Notification'));
const NotificationStats = lazy(() => import('./Pages/Notification/NotificationStats'));
const Signup2 = lazy(() => import('./Pages/Signup/Signup2'));
const SplashAbout = lazy(() => import('./Pages/Splash/SplashAbout'));
const SplashLoader = lazy(() => import('./Pages/Splash/SplashLoader/SplashLoader'));
const LazySplash = lazy(() => import('./Pages/Splash/Splash'));
const Error = lazy(() => import('./Pages/Error/Error'));
function App() {
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = '';
      fuc();
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleOffline = () => {
    setIsOnline(false);
  };

  const handleOnline = () => {
    setIsOnline(true);
    NotificationManager.info('Your internt connection is restored!', 'Info');
  };
  // requestForToken();
  return (
    <HashRouter>
      {!isOnline && <NoInternet />}
      <Suspense fallback={<SplashLoader />}>
        <Routes>
          <Route path="/" element={<LazySplash />}></Route>
          <Route path="/about" element={<SplashAbout />}></Route>
          <Route path="/login" element={<Login2 />}></Route>
          <Route path="/sign-up" element={<Signup2 />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword2 />}></Route>
          <Route path="*" element={<Error />}></Route>
          <Route path="/" element={<DashLayout />}>
            <Route path="lesson2" element={<Lesson2 />}></Route>

            <Route path="/languages" element={<PrivateRoute />}>
              <Route index element={<Languages />} />
            </Route>

            {/* <Route path="/" element={<PrivateRoute />}>
            <Route path="/languages" element={<Languages />} />
          </Route> */}

            <Route path="/lessons" element={<PrivateRoute />}>
              <Route path="/lessons" element={<Lessons />}></Route>
            </Route>
            {isOnline ? (
              <Route path="/lessonDetail/:chapter" element={<PrivateRoute />}>
                <Route path="/lessonDetail/:chapter" element={<LessonDetail />}></Route>
              </Route>
            ) : (
              <>
                <Route path="/lessonDetail/:chapter" element={<PrivateRoute />}>
                  <Route path="/lessonDetail/:chapter" element={<Offline />}></Route>
                </Route>
              </>
            )}
            <Route path="/live-classes" element={<PrivateRoute />}>
              <Route path="/live-classes" element={<LiveClasses />}></Route>
            </Route>

            <Route path="/inbox" element={<PrivateRoute />}>
              <Route path="/inbox" element={<Inbox />}></Route>
            </Route>

            <Route path="/inbox/:chatid" element={<PrivateRoute />}>
              <Route path="/inbox/:chatid/:c_m_id" element={<ChatMessages />}></Route>
            </Route>

            <Route path="/aza" element={<PrivateRoute />}>
              <Route path="/aza" element={<Aza />} />
            </Route>

            <Route path="/favorites" element={<PrivateRoute />}>
              <Route path="/favorites" element={<Favorites />} />
            </Route>

            <Route path="/users" element={<PrivateRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>

            <Route path="/info" element={<PrivateRoute />}>
              <Route path="/info" element={<Info />} />
            </Route>

            <Route path="/leader-board" element={<PrivateRoute />}>
              <Route path="/leader-board" element={<LeaderBoard2 />} />
            </Route>

            <Route path="/streak-board" element={<PrivateRoute />}>
              <Route path="/streak-board" element={<LeaderBoard />} />
            </Route>

            <Route path="/booking" element={<PrivateRoute />}>
              <Route path="/booking" element={<Booking />} />
            </Route>

            <Route path="/user-booking" element={<PrivateRoute />}>
              <Route path="/user-booking" element={<UserBooking />} />
            </Route>

            <Route path="/become-a-tutor" element={<PrivateRoute />}>
              <Route path="/become-a-tutor" element={<BecomeATutor />} />
            </Route>

            {/* <Route path="video-tutorial" element={<VideoTutorial />}></Route> */}

            <Route path="/video-tutorial" element={<PrivateRoute />}>
              <Route path="/video-tutorial" element={<VideoTutorial2 />} />
            </Route>

            <Route path="/notification" element={<PrivateRoute />}>
              <Route path="/notification" element={<Notification />} />
            </Route>

            <Route path="/notification/stats" element={<PrivateRoute />}>
              <Route path="/notification/stats" element={<NotificationStats />} />
            </Route>

            <Route path="/winks" element={<PrivateRoute />}>
              <Route path="/winks" element={<Winks />} />
            </Route>

            <Route path="/izedu" element={<PrivateRoute />}>
              <Route path="/izedu" element={<Izedu />} />
            </Route>
            <Route path="/izedu-vid/:key" element={<PrivateRoute />}>
              <Route path="/izedu-vid/:key" element={<IzeduVideo />} />
            </Route>

            <Route path="/badges/:status/:e" element={<PrivateRoute />}>
              <Route path="/badges/:status/:e" element={<Badge />} />
            </Route>

            <Route path="/live-classes/detail/:id" element={<PrivateRoute />}>
              <Route path="/live-classes/detail/:id" element={<LiveClassesDetails />} />
            </Route>

            <Route path="/time-slots" element={<PrivateRoute />}>
              <Route path="/time-slots" element={<ViewTimeSlots />} />
            </Route>

            {/*<Route path="/time-slots" element={<PrivateRoute />}>*/}
            {/*  <Route path="/time-slots" element={<ViewTimeSlots />} />*/}
            {/*</Route>*/}

            <Route path="/add-time-slots" element={<PrivateRoute />}>
              <Route path="/add-time-slots" element={<AddViewTimeSlots />} />
            </Route>

            <Route path="/promote" element={<PrivateRoute />}>
              <Route path="/promote" element={<Promote />} />
            </Route>

            <Route path="/report-a-problem" element={<PrivateRoute />}>
              <Route path="/report-a-problem" element={<ReportProblem />} />
            </Route>

            <Route path="/tutor" element={<PrivateRoute />}>
              <Route path="/tutor" element={<Tutor />} />
            </Route>
            <Route path="/izesan-tutor" element={<PrivateRoute />}>
              <Route path="/izesan-tutor" element={<IzesanTutor />} />
            </Route>

            <Route path="/news" element={<PrivateRoute />}>
              <Route path="/news" element={<News />} />
            </Route>

            <Route path="/change-password" element={<PrivateRoute />}>
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            <Route path="/profile-details" element={<PrivateRoute />}>
              <Route path="/profile-details" element={<ProfileDetails />} />
            </Route>
            <Route path="/profile-details/email_id" element={<PrivateRoute />}>
              <Route path="/profile-details/email_id" element={<ProfileDetails />} />
            </Route>
            <Route path="/library" element={<PrivateRoute />}>
              <Route path="/library" element={<Library />} />
            </Route>
            <Route path="/library/:id" element={<PrivateRoute />}>
              <Route path="/library/:id" element={<LibraryAudio />} />
            </Route>
            <Route path="/dweki" element={<PrivateRoute />}>
              <Route path="/dweki" element={<Dweki />} />
            </Route>
            <Route path="/dweki/cart" element={<PrivateRoute />}>
              <Route path="/dweki/cart" element={<Cart />} />
            </Route>
            <Route path="/dweki/checkout" element={<PrivateRoute />}>
              <Route path="/dweki/checkout" element={<CheckOut />} />
            </Route>
            <Route path="/dweki/my-orders" element={<PrivateRoute />}>
              <Route path="/dweki/my-orders" element={<MyOrder />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <div>
        <NotificationContainer />
      </div>
    </HashRouter>
  );
}

export default App;
