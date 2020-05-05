import React from 'react';
import { shallow } from 'enzyme';

import TodoList from './index';
import { findNodeByDataTest } from '../../utils/findNodeByDataTest';

describe('TodoList component test', () => {
  describe('dom test', () => {
    test('counter text should be 0, and todoList length should be 0', () => {
      const wrapper = shallow(<TodoList todoList={[]} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('0');
      const listItems = findNodeByDataTest(wrapper, 'listItem');
      expect(listItems.length).toEqual(0);
    });

    test('counter text should be 3, list list length should be 3', () => {
      const mockTodoList = [
        { isFocus: false, value: 'hello', isDone: false },
        { isFocus: false, value: 'hello', isDone: false },
        { isFocus: false, value: 'hello', isDone: false },
      ];
      const wrapper = shallow(<TodoList todoList={mockTodoList} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('3');
      const listItems = findNodeByDataTest(wrapper, 'listItem');
      expect(listItems.length).toEqual(3);
    });

    test("should have one inputItem when item's isFocus is true", () => {
      const mockTodoList = [
        { isFocus: false, value: 'hello', isDone: false },
        { isFocus: true, value: 'hello', isDone: false },
        { isFocus: false, value: 'hello', isDone: false },
      ];
      const wrapper = shallow(<TodoList todoList={mockTodoList} />);
      const inputItems = findNodeByDataTest(wrapper, 'inputItem');
      expect(inputItems.length).toEqual(1);
    });

    test('should have specific title', () => {
      const title = 'special title';
      const wrapper = shallow(<TodoList todoList={[]} title={title} />);
      const listTitles = findNodeByDataTest(wrapper, 'listTitle');
      expect(listTitles.at(0).text()).toEqual(title);
    });

    describe('should have correctly quantity checkbox ', () => {
      test('quantity should be 3', () => {
        const mockTodoList = [
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: true, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
        ];
        const wrapper = shallow(<TodoList todoList={mockTodoList} />);
        const checkboxItems = findNodeByDataTest(wrapper, 'checkboxItem');
        expect(checkboxItems.length).toEqual(3);
      });

      test('quantity should be 0', () => {
        const mockTodoList = [];
        const wrapper = shallow(<TodoList todoList={mockTodoList} />);
        const checkboxItems = findNodeByDataTest(wrapper, 'checkboxItem');
        expect(checkboxItems.length).toEqual(0);
      });
    });

    test('snapshot test', () => {
      const mockTodoList = [
        { isFocus: false, value: 'hello', isDone: false },
        { isFocus: false, value: 'hello', isDone: false },
        { isFocus: false, value: 'hello', isDone: false },
      ];
      const wrapper = shallow(<TodoList todoList={mockTodoList} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('function test', () => {
    describe('delete function test', () => {
      test('should have corresponding delete button when list exist', () => {
        const mockTodoList = [
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
        ];
        const wrapper = shallow(<TodoList todoList={mockTodoList} />);
        const deleteItems = findNodeByDataTest(wrapper, 'deleteItem');
        expect(deleteItems.length).toEqual(3);
      });

      test('delete function should be called after click delete btn', () => {
        const mockTodoList = [
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
        ];
        const mockDeleteItemFn = jest.fn();
        const wrapper = shallow(
          <TodoList todoList={mockTodoList} deleteItem={mockDeleteItemFn} />
        );
        const deleteItems = findNodeByDataTest(wrapper, 'deleteItem');
        const index = 1;
        deleteItems.at(index).simulate('click');
        expect(mockDeleteItemFn).toHaveBeenCalledWith(index);
        expect(mockDeleteItemFn).toHaveBeenCalledTimes(1);
      });
    });

    describe('click listItem test', () => {
      test('handleFocus fn should be called after click listItem', () => {
        const mockTodoList = [
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
        ];
        const mockHandleFocus = jest.fn();
        const wrapper = shallow(
          <TodoList todoList={mockTodoList} handleFocus={mockHandleFocus} />
        );
        const listItems = findNodeByDataTest(wrapper, 'listItem');
        const index = 1;
        listItems.at(index).simulate('click');
        expect(mockHandleFocus).toHaveBeenCalledWith(index);
        expect(mockHandleFocus).toHaveBeenCalledTimes(1);
      });
    });

    describe('listItem blur test', () => {
      test('handleBlur should be called after listItem blur', () => {
        const mockTodoList = [
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
          { isFocus: false, value: 'hello', isDone: false },
        ];
        const mockHandleBlur = jest.fn();
        const wrapper = shallow(
          <TodoList todoList={mockTodoList} handleBlur={mockHandleBlur} />
        );
        const listItems = findNodeByDataTest(wrapper, 'listItem');
        listItems.at(0).simulate('blur');
        expect(mockHandleBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('inputItem change test', () => {
      test('modifyItem method should be called with value', () => {
        const mockTodoList = [
          { isFocus: true, value: 'hello', isDone: false },
          { isFocus: false, value: 'hey', isDone: false },
        ];
        const mockHandleModifyItem = jest.fn();
        const wrapper = shallow(
          <TodoList
            todoList={mockTodoList}
            handleModifiedItem={mockHandleModifyItem}
          />
        );
        const inputItems = findNodeByDataTest(wrapper, 'inputItem');
        const inputValue = 'hello,world';
        inputItems.at(0).simulate('change', {
          target: {
            value: inputValue,
          },
        });
        expect(mockHandleModifyItem).toHaveBeenCalledTimes(1);
        expect(mockHandleModifyItem).toHaveBeenCalledWith(0, inputValue);
      });
    });

    describe('inputItem press "enter" key test', () => {
      test('after inputItem press "Enter" key , handleBur function should be called', () => {
        const inputValue = 'hello, world';
        const mockTodoList = [
          { isFocus: true, value: inputValue, isDone: false },
        ];
        const mockHandleBlur = jest.fn();
        const wrapper = shallow(
          <TodoList todoList={mockTodoList} handleBlur={mockHandleBlur} />
        );
        const inputItems = findNodeByDataTest(wrapper, 'inputItem');
        inputItems.at(0).simulate('keyUp', {
          keyCode: 13,
        });
        expect(mockHandleBlur).toHaveBeenCalledTimes(1);
      });
    });
  });
});
