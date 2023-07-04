import { Route, Redirect } from 'react-router-dom';
const isLogin = () => {
  if (localStorage.getItem('email_id')) {
    return true;
  }
  return false;
};
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
