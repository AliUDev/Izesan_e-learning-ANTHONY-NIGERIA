import React from 'react';
import Profile from '../../../../Assets/Images/profile_image.png';
import './liveClassesCaurosel.css';

const Card = ({ children }) => {
  return (
    <div className="cards animate">
      <div className="image">
        <img alt="image" src={Profile} style={{ objectFit: 'cover' }} />
      </div>
      <div className="texto">
        <div>{children}</div>
        {/* <div className="link">Link Card</div> */}
      </div>
    </div>
  );
};

export default Card;
