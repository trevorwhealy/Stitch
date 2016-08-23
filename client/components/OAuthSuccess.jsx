import React from 'react';
import { browserHistory } from 'react-router';

const OAuthSuccess = (props) => {
  if (props.location.query.token) {
    const { id, email, fullName, photo } = props.location.query;
    const user = { id, email, fullName, photo };
    localStorage.setItem('jwtToken', props.location.query.token);
    localStorage.setItem('user', JSON.stringify(user));
    browserHistory.replace('/');
  }

  return (
    <div />
  );
};

export default OAuthSuccess;
