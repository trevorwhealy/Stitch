import { browserHistory } from 'react-router';

export function folderSuccess(folders) {
  return {
    type: 'FOLDER_SUCCESS',
    folders,
  };
}

export function folderFailure(message) {
  return {
    type: 'FOLDER_FAILURE',
    message,
  };
}

export function getOneFolder(folder) {
  return {
    type: 'GET_ONE_FOLDER',
    folder,
  };
}

export function resetOneFolderState() {
  return {
    type: 'RESET_ONE_FOLDER_STATE',
  };
}

export function getAllFolders(folderId) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch('/api/folders/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if (folderId) {
        const singleFolder = data.filter(folder => folder.id === folderId);
        dispatch(getOneFolder(singleFolder[0]));
      }
      dispatch(folderSuccess(data));
    })
    .catch(err => dispatch(folderFailure(err)));
  };
}

export function createFolder(name) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch('/api/folders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ name }),
    })
    .then(res => res.text())
    .then(() => dispatch(getAllFolders()))
    .catch(err => dispatch(folderFailure(err)));
  };
}

export function getFolder(folderId) {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch(`/api/folders/${folderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => dispatch(getOneFolder(data)))
    .catch(err => dispatch(folderFailure(err)));
  };
}

export function deleteFolder(id, redirect) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/folders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => {
      dispatch(getAllFolders());
      if (redirect) {
        browserHistory.replace('/');
      }
    })
    .catch(err => console.log(err));
  };
}

export function renameFolder(folderId, title) {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch(`/api/folders/${folderId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: title,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => dispatch(getAllFolders(folderId)));
  };
}

export function resetFolderState() {
  return (dispatch) => {
    dispatch(resetOneFolderState());
  };
}
