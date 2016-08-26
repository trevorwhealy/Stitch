import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as notificationActionCreators from '../../notifications/actions/NotificationActions.jsx';
import Notifications from '../../notifications/components/Notifications.jsx';

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

  componentDidMount() {
    $('.dropdown-button').dropdown({});
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
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const { notifications } = this.props;
    const length = (notifications) ? notifications.filter(alert => !alert.isRead).length : '0';
    const hasUnreadClass = length ? 'hasUnread' : '';
    const isAllTabActiveClass = this.state.notificationType === 'all' ? 'isActive' : '';
    const isUnreadTabActiveClass = this.state.notificationType === 'unread' ? 'isActive' : '';

    return (
      <div className="notifications">
        <ul id="notificationDropdown" className="dropdown-content">
          <div className="notifications-heading">
            <div className="notifications-panel-tabs">
              <div
                className={`notifications-alltab ${isAllTabActiveClass}`}
                onClick={(e) => {
                  this.stopPropogation(e);
                  this.displayTypeNotifications('all');
                }}
              >
                All
              </div>
              <div
                className={`notifications-unreadtab ${isUnreadTabActiveClass}`}
                onClick={(e) => {
                  this.stopPropogation(e);
                  this.displayTypeNotifications('unread');
                }}
              >
                {`Unread ( ${length} )`}
              </div>
            </div>
            <button
              className="markAsRead"
              onClick={(e) => {
                this.stopPropogation(e);
                this.markAsRead();
              }}
            >
              Mark all as read
            </button>
          </div>
          <Notifications
            notificationType={this.state.notificationType}
            markAsRead={this.markAsRead}
            notifications={notifications}
          />
        </ul>
        <a
          className={`dropdown-button icon-btn ${hasUnreadClass}`}
          data-activates="notificationDropdown"
        >
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
  notifications: React.PropTypes.array,
};
