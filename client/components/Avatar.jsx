import React from 'react';

const Avatar = ({ photo, fullName, size = '' }) => {
  const avatarSize = size ? `userAvatar--${size}` : '';
  if (photo) {
    return (<img className={`userAvatar ${avatarSize}`} alt="profile" src={photo} />);
  }

  const [firstName = '', lastName = ''] = fullName.toUpperCase().split(' ');
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return (<div className={`userAvatar userAvatar--initials ${avatarSize}`}>{initials}</div>);
};

Avatar.propTypes = {
  photo: React.PropTypes.string,
  fullName: React.PropTypes.string,
  size: React.PropTypes.string,
};

export default Avatar;
