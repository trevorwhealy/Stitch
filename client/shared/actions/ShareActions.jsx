import { getOneNote } from '../../notes/actions/NoteActions.jsx';
import { getNotifications } from '../../notifications/actions/NotificationActions.jsx';

export function folderShareSuccess() {
  return {
    type: 'FOLDER_SHARE_SUCCESS',
  };
}

export function findUserFailure(err) {
  return {
    type: 'FIND_USER_FAILURE',
    err,
  };
}

export function findUser(content, userInfo) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/users/search?q=${userInfo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(([{ id }]) => {
      shareContent(content, id, dispatch);
    })
    .catch(err => dispatch(findUserFailure(err)));
  };
}

export function shareContent(content, userId, dispatch) {
  const token = localStorage.getItem('jwtToken');
  const details = content.content;

  return fetch(`/api/${details.type}s/${details.id}/share`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      users: [userId],
    }),
  })
  .then(() => {
    if (details.type === 'note') {
      dispatch(getOneNote(details.id));
    }
    dispatch(folderShareSuccess());
    dispatch(getNotifications());
  })
  .catch(err => console.log(err));
}
