import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

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
        <Link
          key={alert.id}
          className="message"
          onClick={() => markAsRead(alert.id)}
          to={{ pathname: `/notes/${alert.noteId}` }}
        >
          <li><b>{alert.source.fullName}</b>{message}</li>
        </Link>
        );

      return (
        <div key={alert.id} className="notifications">
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
  }

  return (<div>{alerts}</div>);
};

export default Notifications;

Notifications.propTypes = {
  notificationType: React.PropTypes.string,
  markAsRead: React.PropTypes.func,
  notifications: React.PropTypes.array,
};
