import React from 'react';

const dummyComments = [
  {
    message: 'Hey how are you!',
    user: 'Trevor',
    read: 'Unread',
  },
  {
    message: 'Yo i changed something!',
    user: 'Steven',
    read: 'Unread',
  },
];

const comments = dummyComments.map(comment => {
  return (
    <div className="notifications">
      <div className="message">
        <li><b>{comment.user}</b> said, {comment.message}</li>
      </div>
      <div className="user">
        <img
          className="circle"
          alt="profile"
          src="/assets/images/sunnyv.jpg"
          width="35" height="35"
        />
      </div>
    </div>
  );
});

const DropDown = () => (
  <div>
    <ul id="dropdown" className="dropdown-content">
      {comments}
    </ul>
    <a className="dropdown-button" data-activates="dropdown">
      <i className="material-icons">notifications</i>
    </a>
  </div>
);

export default DropDown;
