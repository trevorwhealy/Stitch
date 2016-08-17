export function notificationSuccess(notifications) {
  return {
    type: 'GET_NOTES_SUCCESS',
    notifications,
  };
}

export function notificationFailure(message) {
  return {
    type: 'GET_NOTES_FAILURE',
    message,
  };
}

export function markAsReadSuccess() {
  return {
    type: 'MARK_AS_READ',

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
    .then(notifications => {
      console.log('the notis', notifications);
    })
    .catch(err => {
      console.log('the error is', err);
    });
  };
}

export function markAsRead(id = 'all') {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/notifications/${id}/markAsRead1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => { dispatch(markAsReadSuccess()); })
    .catch((err) => { dispatch(notificationFailure(err)); });
  };
}
