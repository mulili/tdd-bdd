import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './index';

Enzyme.configure({ adapter: new Adapter() });
describe('Header component test', () => {
  let wrapper = null;
  let inputItem = null;
  const userInput = 'TDD实战';

  beforeEach(() => {
    wrapper = shallow(<Header />);
    inputItem = wrapper.find("[data-test='inputItem']");
  });

  describe('dom test', () => {
    test('should have one input ', () => {
      expect(inputItem.length).toEqual(1);
    });
  });

  describe('input value test', () => {
    test('input value should be "" ', () => {
      expect(inputItem.prop('value')).toEqual('');
    });

    test('input 的值应该和用户输入的值保持一致', () => {
      inputItem.simulate('change', {
        target: {
          value: userInput,
        },
      });
      expect(wrapper.state('value')).toEqual(userInput);

      // dom 变化之后，需要重新获取dom，才能获得相应的变动
      // inputItem = wrapper.find("[data-test='inputItem']");
      // expect(inputItem.prop('value')).toEqual(userInput);
    });
  });

  describe('按下"Enter"键，给list添加数据的方法是否应该被调用', () => {
    let fn = null;
    beforeEach(() => {
      fn = jest.fn();
      wrapper = shallow(<Header addUndoItem={fn} />);
      inputItem = wrapper.find("[data-test='inputItem']");
    });

    test('如果input没有内容，不应该被调用”', () => {
      wrapper.setState({ value: '' });
      inputItem.simulate('keyUp', {
        keyCode: 13,
      });
      expect(fn).toHaveBeenCalledTimes(0);
    });

    test('如果input有内容，应该被调用', () => {
      wrapper.setState({ value: userInput });
      inputItem.simulate('keyUp', {
        keyCode: 13,
      });
      console.log(wrapper.state('value'));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(userInput);
    });
  });
});
