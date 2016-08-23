import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from 'moment';
import * as notificationActionCreators from '../actions/NotificationActions.jsx';

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


class DropDown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notificationType: 'unread',
    };

    this.markAsRead = this.markAsRead.bind(this);
  }

  componentWillMount() {
    this.props.notificationActions.getNotifications();
  }

  markAsRead(id) {
    const noteId = id || 'all';
    this.props.notificationActions.markAsRead(noteId);
  }

  displayTypeNotifications(type) {
    this.setState({
      notificationType: type,
    });
  }

  stopPropogation(e) {
    e.nativeEvent.stopImmediatePropagation();    // this.displayTypeNotifications('notis');
  }

  render() {
    const comments = dummyComments
    .filter(comment => {
      if (this.state.notificationType === 'all') { return true; }
      return (comment.isRead !== false);
    })
    .map(comment => {
      let commentOutput;
      if (comment.type === 'COMMENT') {
        commentOutput = (
          <Link
            className="message"
            onClick={() => this.markAsRead(comment.id)}
            to={{ pathname: `/notes/${comment.noteId}` }}
          >
            <li><b>{comment.source.fullName}</b> said, {comment.text}</li>
          </Link>
        );
      } else {
        commentOutput = (
          <Link
            className="message"
            to={{ pathname: `/notes/${comment.noteId}` }}
          >
            <li><b>{comment.source.fullName}</b> mentioned you, {comment.text}</li>
          </Link>
        );
      }

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
            {commentOutput}
          </div>
          <div className="message-date">
            {`${moment(comment.updatedAt).fromNow()}`}
          </div>
        </div>
      );
    });

    return (
      <div>
        <ul id="dropdown" className="dropdown-content">
          <div className="notifications-heading">
            <div className="notifications-panel-tabs">
              <div
                className="notifications-tab"
                onClick={(e) => {
                  this.stopPropogation(e);
                  this.displayTypeNotifications('all');
                }}
              >
                {'Notifications'}
              </div>
              <div
                className="notifications-unreadtab"
                onClick={(e) => {
                  this.stopPropogation(e);
                  this.displayTypeNotifications('unread');
                }}
              >
                {'Unread'}
              </div>
            </div>
            <div
              className="markAsRead"
              onClick={(e) => {
                this.stopPropogation(e);
                this.markAsRead();
              }}
            >
              {'Mark all as read'}
            </div>
          </div>
          {comments}
        </ul>
        <a className="dropdown-button" data-activates="dropdown">
          <i className="material-icons">notifications</i>
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  notificationActions: bindActionCreators(notificationActionCreators, dispatch),
});

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDown);

DropDown.propTypes = {
  notificationActions: React.PropTypes.object,
};
