import React from 'react';

const ProfileCard = () => {
  return (
    <div className="w3-card w3-round w3-white">
      <div className="w3-container">
        <h4 className="w3-center">My Profile</h4>
        <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{ height: '106px', width: '106px' }} alt="Avatar" /></p>
        <hr />
        <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
        <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
      </div>
    </div>
  );
};

export default ProfileCard;