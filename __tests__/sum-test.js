jest.unmock('../client/sum'); // unmock to use the actual implementation of sum

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    const sum = require('../client/sum');
    expect(sum(1, 2)).toBe(3);
  });
});
