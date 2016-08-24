import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Avatar from './Avatar.jsx';

const Notifications = ({ notificationType, markAsRead, notifications }) => {
  let alerts;
  if (notifications && notifications.length > 0) {
    alerts = notifications
    .filter(alert => {
      if (notificationType === 'all') { return true; }
      return (alert.isRead !== true);
    })
    .map(alert => {
      const message = alert.type === 'COMMENT' ? ` said, "${alert.text}"` : ' mentioned you';
      let alertOutput = (
        <div
          key={alert.id}
          className="message"
        >
          <b>{alert.source.fullName}</b>{message}
        </div>
        );

      return (
        <Link
          key={alert.id}
          className="notifications"
          to={{ pathname: `/notes/${alert.noteId}` }}
          onClick={() => markAsRead(alert.id)}
        >
          <div className="notifications-userbody">
            <div className="user">
              <Avatar fullName={alert.source.fullName} size="sm" />
            </div>
            {alertOutput}
          </div>
          <div className="message-date">
            {`${moment(alert.updatedAt).fromNow()}`}
          </div>
        </Link>
      );
    });
  }

  return (<div>{alerts}</div>);
};

export default Notifications;

Notifications.propTypes = {
  notificationType: React.PropTypes.string,
  markAsRead: React.PropTypes.func,
  notifications: React.PropTypes.array,
};
