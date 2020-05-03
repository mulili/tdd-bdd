import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Todo from './index';
import Header from '../../component/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Todo component test', () => {
  let wrapper = null;
  let header = null;
  const todo = 'TDD实战';
  beforeEach(() => {
    wrapper = shallow(<Todo />);
    header = wrapper.find(Header);
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
  });
  describe('state test', () => {
    test('初始 todoList 数组的长度为0 ', () => {
      expect(wrapper.state('todoList').length).toEqual(0);
    });

    test('addUndoItem 方法被调用后，todoList的包含函数调用时传递的数据', () => {
      wrapper.instance().addUndoItem(todo);
      expect(wrapper.state('todoList').length).toEqual(1);
      expect(wrapper.state('todoList')).toContain(todo);
    });
  });
});
