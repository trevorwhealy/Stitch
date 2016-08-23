export function notificationSuccess(notifications) {
  return {
    type: 'GET_NOTIFICATION_SUCCESS',
    notifications,
  };
}

export function notificationFailure(message) {
  return {
    type: 'GET_NOTIFICATION_FAILURE',
    message,
  };
}

export function markAsReadSuccess() {
  return {
    type: 'MARK_AS_READ',
  };
}

export function markAsReadFailure(err) {
  console.log(err);
  return {
    type: 'MARK_AS_READ_FAILURE',
  };
}

export function getNotifications() {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch('/api/notifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(notifications => dispatch(notificationSuccess(notifications)))
    .catch(err => dispatch(notificationFailure(err)));
  };
}

export function markAsRead(id) {
  const token = localStorage.getItem('jwtToken');
  console.log('the id is', id);
  return (dispatch) => {
    return fetch(`/api/notifications/${id}/markasread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => {
      dispatch(getNotifications());
    })
    .catch((err) => dispatch(markAsReadFailure(err)));
  };
}
