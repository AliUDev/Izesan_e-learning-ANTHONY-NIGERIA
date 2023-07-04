const initialState = {
  data: false,
  msg: '',
  userDetails: {},
  newsSubscribe:
    JSON.parse(localStorage.getItem('all_data')) &&
    JSON.parse(localStorage.getItem('all_data'))[0].is_news_subscribed
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER':
      return {
        ...state,
        msg: action.payload,
        data: action.data,
        success: action.success
      };
    case 'LOGIN_USER':
      return {
        ...state,
        msg1: action.payload1,
        data: action.data,
        success: action.success
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        userDetails: action.payload
      };
    case 'NEWS_SUBSCRIBE':
      console.log('my payload' + action.payload);
      return {
        ...state,
        newsSubscribe: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
