import React from 'react';
import { shallow } from 'enzyme';

import Undo from './index';
import TodoList from '../../component/TodoList';

describe('<Undo/> component test', () => {
  describe('dom test', () => {
    test('should contain <TodoList/> ', () => {
      const undo = shallow(<Undo />);
      const todoList = undo.find(TodoList);
      expect(todoList.length).toEqual(1);
    });
      test('<TodoList/> should have title property "正在进行"', () => {
        const undo = shallow(<Undo />);
        const todoList = undo.find(TodoList);
        expect(todoList.prop('title')).toEqual('正在进行');
      });
  });
});
