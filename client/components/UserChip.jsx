import React from 'react';

const UserChip = () => (
  <div className="userChip">
    <img src={userProf} className="circle userIcon" />
    <span className="userName">{userName}</span>
  </div>
);

export default UserChip;
