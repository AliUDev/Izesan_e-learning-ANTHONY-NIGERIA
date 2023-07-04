// We write helper functions here

import { colors, LEADERBOARD_POSITIONS } from '../constants/colors';

export const debounce = (func, delay = 500) => {
  let timeout;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getInitials = (name) => {
  if (!name) return null;
  var nameArray = name.split(' ');

  if (nameArray.length <= 1) {
    return name.charAt(0).toUpperCase();
  }

  return (
    nameArray[0].charAt(0).toUpperCase() + nameArray[nameArray.length - 1].charAt(0).toUpperCase()
  );
};

export const getRandomColor = (id) => {
  if (id) {
    const lastChar = id.slice(-1);
    return colors[lastChar];
  } else {
    return null;
  }
};

export const getLeaderboardPosition = (position) => {
  let post = LEADERBOARD_POSITIONS[position];
  if (post) {
    return post;
  }
  return { color: '#f1c40f', post: '2' };
};
