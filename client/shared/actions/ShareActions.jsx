export function findUser(content, userInfo) {
  const token = localStorage.getItem('jwtToken');

  return fetch(`/api/users/search?q=${userInfo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
  .then(res => res.json())
  .then(([{ id }]) => {
    shareContent(content, id);
  })
  .catch(err => console.log(err));
}

export function shareContent(content, userId) {
  const token = localStorage.getItem('jwtToken');

  return fetch(`/api/${content.type}s/${content.content.id}/share`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      users: [userId],
    }),
  })
  .catch(err => console.log(err));
}
