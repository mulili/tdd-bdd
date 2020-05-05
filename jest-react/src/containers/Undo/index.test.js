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
  });
});
