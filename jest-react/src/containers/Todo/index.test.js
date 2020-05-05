import React from 'react';
import { shallow } from 'enzyme';

import Todo from './index';
import Header from '../../component/Header';
import Undo from '../Undo';

describe('Todo component test', () => {
  let wrapper = null;
  let header = null;
  let undo = null;
  beforeEach(() => {
    wrapper = shallow(<Todo />);
    header = wrapper.find(Header);
    undo = wrapper.find(Undo);
  });

  describe('dom test', () => {
    test('should have <Header/> ', () => {
      expect(header.length).toEqual(1);
    });

    test('should have <Undo/> ', () => {
      expect(undo.length).toEqual(1);
    });

    test('<Header/> 应该有一个addUndoItem 方法，且这个方法是<Todo/>的实例 ', () => {
      expect(header.prop('addUndoItem')).toEqual(
        wrapper.instance().addUndoItem
      );
    });

    test('<Undo/>组件 应该有todoList 属性， deleteItem 方法，handleFocus 方法，handleBlur 方法， handleModifiedItem 方法， 且这四个方法都是<Todo/>的对应实例', () => {
      expect(undo.prop('todoList')).toEqual(wrapper.state('todoList'));

      expect(undo.prop('deleteItem')).toBeTruthy();
      expect(undo.prop('deleteItem')).toEqual(
        wrapper.instance().deleteItem
      );

      expect(undo.prop('handleFocus')).toBeTruthy();
      expect(undo.prop('handleFocus')).toEqual(
        wrapper.instance().handleFocus
      );

      expect(undo.prop('handleBlur')).toBeTruthy();
      expect(undo.prop('handleBlur')).toEqual(
        wrapper.instance().handleBlur
      );

      expect(undo.prop('handleModifiedItem')).toBeTruthy();
      expect(undo.prop('handleModifiedItem')).toEqual(
        wrapper.instance().handleModifiedItem
      );
    });
  });

  describe('state test', () => {
    test('初始 todoList 数组的长度为0 ', () => {
      expect(wrapper.state('todoList').length).toEqual(0);
    });
    describe('<Header/> component related method test', () => {
      test('addUndoItem 方法被调用后，todoList包含函数调用时传递的数据', () => {
        const todo = 'TDD实战';
        wrapper.instance().addUndoItem(todo);
        expect(wrapper.state('todoList').length).toEqual(1);
        expect(wrapper.state('todoList')).toContain(todo);
      });
    });

    describe('<Todo/> component related method test', () => {
      test('deleteItem 方法被调用后，todoList删除对应index项的数据', () => {
        const wrapper = shallow(<Todo />);
        const todoList = [
          { isFocus: false, value: 'hello' },
          { isFocus: false, value: 'world' },
        ];
        wrapper.setState({ todoList: todoList });
        const index = 0;
        wrapper.instance().deleteItem(index);
        expect(wrapper.state('todoList')).toEqual([
          { isFocus: false, value: 'world' },
        ]);
      });

      test('changFocus 方法被调用后，对应index项的isFocus属性应该取反', () => {
        const wrapper = shallow(<Todo />);
        wrapper.setState({
          todoList: [
            { isFocus: true, value: 'hello' },
            { isFocus: false, value: 'world' },
            { isFocus: true, value: 'wow' },
          ],
        });
        const index = 1;
        wrapper.instance().handleFocus(index);
        expect(wrapper.state('todoList')[index].isFocus).toBeTruthy();
        expect(wrapper.state('todoList')[0].isFocus).toBeFalsy();
        expect(wrapper.state('todoList')[2].isFocus).toBeFalsy();
      });

      test('handleModifiedItem 方法被调用后，对应index项的value被修改成传入的value ', () => {
        const wrapper = shallow(<Todo />);
        const oldValue = 'hey';
        const newValue = 'hello,world';
        const index = 0;
        wrapper.setState({
          todoList: [{ isFocus: true, value: oldValue }],
        });

        wrapper.instance().handleModifiedItem(0, newValue);
        expect(wrapper.state('todoList')[index].value).toEqual(newValue);
      });
    });
  });
});
