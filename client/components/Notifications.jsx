import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const dummyComments = [
  {
    id: 7,
    sourceId: 2,
    targetId: 1,
    noteId: 96,
    isRead: false,
    type: 'COMMENT',
    text: 'Ay fix this ish',
    createdAt: '2016-08-17T16:57:07.682Z',
    updatedAt: '2016-08-17T16:57:55.761Z',
    note: {
      name: "Steven's Note 1",
    },
    source: {
      fullName: 'Sompop',
    },
    target: {
      fullName: 'Sompop Test',
    },
  },
  {
    id: 7,
    sourceId: 2,
    targetId: 1,
    noteId: 97,
    isRead: false,
    type: 'COMMENT',
    text: 'what the hell is this',
    createdAt: '2016-08-17T16:57:07.682Z',
    updatedAt: '2016-08-17T16:57:55.761Z',
    note: {
      name: "Steven's Note 1",
    },
    source: {
      fullName: 'Steven',
    },
    target: {
      fullName: 'Sompop Test',
    },
  },
  {
    id: 7,
    sourceId: 2,
    targetId: 1,
    noteId: 100,
    isRead: true,
    type: 'MENTION',
    text: 'are we there yet',
    createdAt: '2016-08-17T16:57:07.682Z',
    updatedAt: '2016-08-17T16:57:55.761Z',
    note: {
      name: "Steven's Note 1",
    },
    source: {
      fullName: 'Trevor',
    },
    target: {
      fullName: 'Sompop Test',
    },
  },
];

const Notifications = ({ notificationType, markAsRead }) => {
  const alerts = dummyComments
  .filter(alert => {
    if (notificationType === 'all') { return true; }
    return (alert.isRead !== false);
  })
  .map(alert => {
    const message = alert.type === 'COMMENT' ? ` said, "${alert.text}"` : ' mentioned you';
    let alertOutput = (
      <Link
        className="message"
        onClick={() => markAsRead(alert.id)}
        to={{ pathname: `/notes/${alert.noteId}` }}
      >
        <li><b>{alert.source.fullName}</b>{message}</li>
      </Link>
      );

    return (
      <div className="notifications">
        <div className="notifications-userbody">
          <div className="user">
            <img
              className="circle"
              alt="profile"
              src="/assets/images/sunnyv.jpg"
            />
          </div>
          {alertOutput}
        </div>
        <div className="message-date">
          {`${moment(alert.updatedAt).fromNow()}`}
        </div>
      </div>
    );
  });

  return (<div>{alerts}</div>);
};

export default Notifications;

Notifications.propTypes = {
  notificationType: React.PropTypes.string,
  markAsRead: React.PropTypes.function,
};
