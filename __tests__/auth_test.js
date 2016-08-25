jest.unmock('../client/auth/actions/Auth.jsx');

import * as user from '../client/auth/actions/Auth.jsx';

describe('async tests', () => {
  it('works with promises', () => {
    return user.signup(5)
    .then((name) => expect(name).toEqual('Sunny'));
  })
});
