import Util from './util';

describe('Util test', () => {
  let util;
  beforeEach(() => {
    util = new Util();
  });

  test('test Util.a ', () => {
    expect(util.a()).toEqual(2);
  });

  test('test Util.b ', () => {
    expect(util.b()).toEqual(3);
  });
});
