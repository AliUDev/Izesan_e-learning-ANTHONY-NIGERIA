import { Navigate, Outlet } from 'react-router-dom';
const isLogin = () => {
  if (localStorage.getItem('email_id')) {
    return true;
  }
  return false;
};

const PrivateRoute = () => {
  if (localStorage.getItem('email_id') == 'guestUser') {
    if (
      window.location.hash == '#/languages' ||
      window.location.hash == '#/lessons' ||
      window.location.hash.split(1)[0] == '#/lessonDetail/'
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return isLogin() ? <Outlet /> : <Navigate to="/login" />;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
};

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => (isLogin() ? <Component {...props} /> : <Navigate to="/login" />)}
//     />
//   );
// };

export default PrivateRoute;
