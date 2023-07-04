import { HashRouter, Route, Routes } from 'react-router-dom';

// BrowserRouter,
import DashLayout from './Components/Layouts/DashLayout';
import Aza from './Pages/Dash/Aza/Aza';
import Badge from './Pages/Dash/Badge/Badge';
import BecomeATutor from './Pages/Dash/BecomeATutor/BecomeATutor';
import VideoTutorial2 from './Pages/Dash/BecomeATutor/BecomeATutor2/VideoTutorialPage2';
import Booking from './Pages/Dash/Booking/Booking';
import UserBooking from './Pages/Dash/Booking/UserBooking';
import Favorites from './Pages/Dash/Favorites/Favorites';
import Inbox from './Pages/Dash/Inbox/Inbox';
import ChatMessages from './Pages/Dash/Inbox/Messages/ChatMessages';
import Info from './Pages/Dash/Info/Info';
import Izedu from './Pages/Dash/Izedu/Izedu';
import LiveClassesDetails from './Pages/Dash/LanguageDetails/LiveClassesDetails';
import Languages from './Pages/Dash/Languages/Languages';
import LeaderBoard from './Pages/Dash/LeaderBoard/LeaderBoard';
import LeaderBoard2 from './Pages/Dash/LeaderBoard/LeaderBoard2/LeaderBoard2';
import Lessons from './Pages/Dash/Lessons/Lessons';
import LiveClasses from './Pages/Dash/LiveClasses/LiveClasses';
import ProfileDetails from './Pages/Dash/ProfileDetails/ProfileDetails';
import Users from './Pages/Dash/Users/Users';
import AddViewTimeSlots from './Pages/Dash/ViewTimeSlots/AddViewTimeSlots';
import ViewTimeSlots from './Pages/Dash/ViewTimeSlots/ViewTimeSlots';
import Winks from './Pages/Dash/Winks/Winks';
import HomeView from './Pages/Home/Home';
// import Lesson1 from './Pages/LessonDetail/Lesson1';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PrivateRoute from './auth/PrivateRoute';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import Cart from './Pages/Dash/Dweki/Cart';
import CheckOut from './Pages/Dash/Dweki/CheckOut';
import Dweki from './Pages/Dash/Dweki/Dweki';
import MyOrder from './Pages/Dash/Dweki/MyOrder';
import IzeduVideo from './Pages/Dash/Izedu/IzeduVideo';
import Library from './Pages/Dash/Library/Library';
import LibraryAudio from './Pages/Dash/Library/LibraryAudio';
import News from './Pages/Dash/News/News';
import Promote from './Pages/Dash/Promote/Promote';
import ReportProblem from './Pages/Dash/report/ReportProblem';
import ClassTestPage from './Pages/Dash/School/ClassTestPage';
import School from './Pages/Dash/School/School';
import Tutor from './Pages/Dash/Tutor/Tutor';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import LessonDetail from './Pages/LessonDetail/Detail';
import Lesson2 from './Pages/LessonDetail/Lesson2';
import Login from './Pages/Login/Login';
import Notification from './Pages/Notification/Notification';
import NotificationStats from './Pages/Notification/NotificationStats';
import Signup from './Pages/Signup/Signup';
import Splash from './Pages/Splash/Splash';

// import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// let showOnlyUser = 0;
// console.log('TUTOR STATUS=' + localStorage.getItem('email_id'));
// if (localStorage.getItem('email_id') == 'toobariaz726@gmail.com') {
//   showOnlyUser = 1;
// }

function App() {
  localStorage.setItem('Volume', true);

  // useEffect(() => {
  //   const handleTabClose = (event) => {
  //     event.preventDefault();
  //
  //     console.log('beforeunload event triggered');
  //
  //     return (event.returnValue = 'Are you sure you want to exit?');
  //   };
  //
  //   window.addEventListener('beforeunload', handleTabClose);
  //
  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/home" element={<HomeView />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/splash" element={<Splash />}></Route>

        <Route path="/" element={<DashLayout />}>
          <Route path="lesson2" element={<Lesson2 />}></Route>
          <Route path="/languages" element={<PrivateRoute />}>
            <Route index element={<Languages />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/languages" element={<Languages />} />
          </Route>

          <Route path="/lessons" element={<PrivateRoute />}>
            <Route path="/lessons" element={<Lessons />}></Route>
          </Route>

          <Route path="/lessonDetail/:chapter" element={<PrivateRoute />}>
            <Route path="/lessonDetail/:chapter" element={<LessonDetail />}></Route>
          </Route>

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
          <Route path="/school" element={<PrivateRoute />}>
            <Route path="/school" element={<School />} />
          </Route>
          <Route path="/school/classroom/:id" element={<PrivateRoute />}>
            <Route path="/school/classroom/:id" element={<ClassTestPage />} />
          </Route>
        </Route>

        {/*<Route path="/lessons" element={<DashLayout hideSidebar={true} />}>*/}
        {/*  <Route path="1" element={<Lesson1 />}></Route>*/}
        {/*  <Route path="2" element={<Lesson2 />}></Route>*/}
        {/*</Route>*/}
      </Routes>

      <div>
        <NotificationContainer />
      </div>
    </HashRouter>
  );
}

export default App;
