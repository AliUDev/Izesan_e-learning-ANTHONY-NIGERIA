import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from './reducer/userReducer';
const thunkMiddleware = require('redux-thunk').default;

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const mainReducer = combineReducers({
  user: userReducer
});

const persistedStore = loadFromLocalStorage();
const store = createStore(mainReducer, persistedStore, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
