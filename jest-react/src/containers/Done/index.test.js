import React from 'react';
import { shallow } from 'enzyme';

import Done from './index';
import TodoList from '../../component/TodoList';

describe('<Done/> component test', () => {
  describe('dom test', () => {
    test('should contain <TodoList/> ', () => {
      const done = shallow(<Done />);
      const todoList = done.find(TodoList);
      expect(todoList.length).toEqual(1);
    });
    test('<TodoList/> should have title property "已经完成"', () => {
      const done = shallow(<Done />);
      const todoList = done.find(TodoList);
      expect(todoList.prop('title')).toEqual('已经完成');
    });
  });
});
