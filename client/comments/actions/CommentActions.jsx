
export function getCommentSuccess(comments) {
  return {
    type: 'GET_COMMENT_SUCCESS',
    comments,
  };
}

export function getCommentFailure() {
  return {
    type: 'GET_COMMENT_FAILURE',
  };
}

export function postCommentSuccess() {
  return {
    type: 'POST_COMMENT_SUCCESS',
  };
}

export function postCommentFailure() {
  return {
    type: 'POST_COMMENT_FAILURE',
  };
}

export function postMentionSuccess() {
  return {
    type: 'POST_MENTION_SUCCESS',
  };
}

export function postMentionFailure() {
  return {
    type: 'POST_MENTION_FAILURE',
  };
}

export function getComments(id) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch(`/api/comments?noteId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(res => res.json())
    .then(comments => dispatch(getCommentSuccess(comments)))
    .catch(err => dispatch(getCommentFailure(err)));
  };
}

export function postMention(noteId, users) {
  const token = localStorage.getItem('jwtToken');
  return (dispatch) => {
    return fetch(`/api/notes/${noteId}/mentions`, {
      method: 'POST',
      body: JSON.stringify({
        users,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => dispatch(postMentionSuccess()))
    .catch(() => dispatch(postMentionFailure()));
  };
}

export function postComment(id, lineNumber, text) {
  const token = localStorage.getItem('jwtToken');

  return (dispatch) => {
    return fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        noteId: id,
        lineNumber,
        text,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    .then(() => dispatch(postCommentSuccess()))
    .catch(err => dispatch(postCommentFailure(err)));
  };
}

export function deleteComment(id) {
  const token = localStorage.getItem('jwtToken');

  return fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
  .then((status) => console.log(status))
  .catch((err) => console.log(err));
}
