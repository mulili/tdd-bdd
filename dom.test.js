/* 
  jest 的运行环境是node环境；
    jest在node 环境中模拟了一套自己的 dom 的API => jsDom;
    所以可以正常的使用dom的操作
*/
import $ from 'jquery';
import addDivToBody from './dom';
describe('Mock dom', () => {
  test('addDivToBody test', () => {
    addDivToBody();
    expect($('body').find('div').length).toEqual(1);

    addDivToBody();
    expect($('body').find('div').length).toEqual(2);
  });
});
