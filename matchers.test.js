describe('is', () => {
  test('toBe', () => {
    // toBe 类似于 Object.is 或 ===；
    expect(10).toBe(10);
  });

  test('toEqual', () => {
    // 比较值
    let obj = { a: 1 };
    expect(obj).toEqual({ a: 1 });
  });
});

describe('undefined,null,defined', () => {
  test('undefined', () => {
    let a;
    expect(a).toBeUndefined();
  });

  test('defined', () => {
    let a = 1;
    expect(a).toBeDefined();
  });

  test('null', () => {
    expect(null).toBeNull();
  });
});

describe('boolean', () => {
  test('true', () => {
    // toBeTruthy 会转换expected为布尔值后在再比较
    expect(1).toBeTruthy();
  });

  test('false', () => {
    // toBeFalsy 会转换expected为布尔值后在再比较
    expect('').toBeFalsy();
  });

  test('not', () => {
    expect('').not.toBeTruthy();
  });
});

describe('number', () => {
  test('greater', () => {
    expect(10).toBeGreaterThan(2);
  });

  test('greater or equal', () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });

  test('less', () => {
    expect(5).toBeLessThan(10);
  });

  test('less or equal', () => {
    expect(5).toBeLessThanOrEqual(5);
  });

  test('closeTo', () => {
    // 比较浮点数，浮点数的精度机制
    expect(0.3).toBeCloseTo(0.1 + 0.2);
  });

  test('NaN', () => {
    expect(NaN).toBeNaN();
  });
});

describe('string', () => {
  test('match string', () => {
    expect('sdf').toMatch(/sd/);
  });

  test('length', () => {
    expect('234').toHaveLength(3);
  });

  test('contain', () => {
    expect('hello,world').toContain('world');
  });
});

describe('array,set', () => {
  test('contain', () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(1);
    expect(arr).toHaveLength(arr.length);
    const set = new Set(arr);
    expect(set).toContain(2);
  });
});

describe('Error', () => {
  const throwError = () => {
    throw new Error("It's a error");
  };
  test('match error message ', () => {
    expect(() => {
      throwError();
    }).toThrowError("It's a error");
  });
});

describe('Object', () => {
  let obj = { a: 1, b: 2, c: 3 };
  test('match obj', () => {
    expect(obj).toMatchObject({ c: 3 });
  });

  test('have property', () => {
    expect(obj).toHaveProperty('a', 1);
  });
});
