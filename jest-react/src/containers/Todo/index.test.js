import React from 'react';
import { shallow } from 'enzyme';

import Todo from './index';
import Header from '../../component/Header';
import UndoList from '../../component/UndoList';

describe('Todo component test', () => {
  let wrapper = null;
  let header = null;
  let undoList = null;
  beforeEach(() => {
    wrapper = shallow(<Todo />);
    header = wrapper.find(Header);
    undoList = wrapper.find(UndoList);
  });

  describe('dom test', () => {
    test('should have <Header/> ', () => {
      expect(header.length).toEqual(1);
    });

    test('<Header/> 应该有一个addUndoItem 方法，且这个方法是<TodoList/>的实例 ', () => {
      expect(header.prop('addUndoItem')).toEqual(
        wrapper.instance().addUndoItem
      );
    });

    test('<UndoList/> undoList 属性和 deleteItem 方法，且这个方法是<TodoList/>的实例 ', () => {
      expect(undoList.prop('undoList')).toEqual(wrapper.state('todoList'));
      expect(undoList.prop('deleteItem')).toEqual(
        wrapper.instance().deleteItem
      );
    });
  });

  describe('state test', () => {
    test('初始 todoList 数组的长度为0 ', () => {
      expect(wrapper.state('todoList').length).toEqual(0);
    });

    test('addUndoItem 方法被调用后，todoList的包含函数调用时传递的数据', () => {
      const todo = 'TDD实战';
      wrapper.instance().addUndoItem(todo);
      expect(wrapper.state('todoList').length).toEqual(1);
      expect(wrapper.state('todoList')).toContain(todo);
    });

    test('deleteItem 方法被调用后，todoList的删除对应index的数据', () => {
      const wrapper = shallow(<Todo />);
      const todoList = ['hello', 'world'];
      wrapper.setState({ todoList: todoList });
      const index = 0;
      wrapper.instance().deleteItem(index);
      expect(wrapper.state('todoList')).toEqual(['world']);
    });
  });
});
