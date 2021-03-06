import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Avatar from '../../shared/components/Avatar.jsx';

const Notifications = ({ notificationType, markAsRead, notifications }) => {
  let alerts;
  if (notifications && notifications.length > 0) {
    alerts = notifications
    .filter(alert => {
      if (notificationType === 'all') { return true; }
      return (alert.isRead !== true);
    })
    .map(alert => {
      let message;
      const type = (!alert.folderId) ? 'note' : 'folder';
      switch (alert.type) {
        case 'COMMENT':
          message = ` said, "${alert.text}"`;
          break;
        case 'MENTION':
          message = ' mentioned you';
          break;
        case 'SHARE':
          message = ` shared a ${type}`;
          break;
        default:
          message = 'error';
      }

      let linkPath = (type === 'note')
        ? { pathname: `/notes/${alert.noteId}` } : { pathname: `/folders/${alert.folderId}` };

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
          className="notificationItem"
          to={linkPath}
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
  } else {
    alerts = '';
  }

  return (<div>{alerts}</div>);
};

export default Notifications;

Notifications.propTypes = {
  notificationType: React.PropTypes.string,
  markAsRead: React.PropTypes.func,
  notifications: React.PropTypes.array,
};
