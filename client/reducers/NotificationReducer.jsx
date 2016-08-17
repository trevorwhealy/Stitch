const notificationState = {
  notifications: [],
  notificationsReceived: false,
  statusMessage: '',
};

const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
const GET_NOTIFICATION_FAILURE = 'GET_NOTIFICATION_FAILURE';

export default (state = notificationState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        notifications: action.notifications,
        notificationsReceived: true,
        statusMessage: 'Notifications received',
      });
    case GET_NOTIFICATION_FAILURE: {
      return Object.assign({}, state, {
        notifications: false,
        statusMessage: 'Notifications not received',
      });
    }
    default: {
      return state;
    }
  }
};
