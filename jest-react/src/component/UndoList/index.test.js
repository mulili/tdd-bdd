import React from 'react';
import { shallow } from 'enzyme';

import UndoList from './index';
import { findNodeByDataTest } from '../../utils/findNodeByDataTest';

describe('UndoList component test', () => {
  describe('display data test', () => {
    test('counter text should be 0, and undoList length should be 0', () => {
      const wrapper = shallow(<UndoList undoList={[]} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('0');
      const undoList = findNodeByDataTest(wrapper, 'undoList');
      expect(undoList.length).toEqual(0);
    });

    test('counter text should be 3, undo list length should be 3', () => {
      const mockUndoList = ['hello', 'hello', 'hello'];
      const wrapper = shallow(<UndoList undoList={mockUndoList} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('3');
      const undoList = findNodeByDataTest(wrapper, 'undoList');
      expect(undoList.length).toEqual(3);
    });
  });

  describe('delete function test', () => {
    test('should have corresponding delete button when list exist', () => {
      const mockUndoList = ['hello', 'hello', 'hello'];
      const wrapper = shallow(<UndoList undoList={mockUndoList} />);
      const deleteItems = findNodeByDataTest(wrapper, 'deleteItem');
      expect(deleteItems.length).toEqual(3);
    });

    test('delete function should be called after click delete btn', () => {
      const mockUndoList = ['hello', 'hello', 'hello'];
      const mockDeleteItemFn = jest.fn();
      const wrapper = shallow(
        <UndoList undoList={mockUndoList} deleteItem={mockDeleteItemFn} />
      );
      const deleteItems = findNodeByDataTest(wrapper, 'deleteItem');
      const index = 1;
      deleteItems.at(index).simulate('click');
      expect(mockDeleteItemFn).toHaveBeenCalledWith(index);
      expect(mockDeleteItemFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('click listItem test', () => {
    test('changeFocus fn should be called after click listItem', () => {
      const mockUndoList = ['hello', 'hello', 'hello'];
      const mockChangeFocus = jest.fn();
      const wrapper = shallow(
        <UndoList undoList={mockUndoList} changeFocus={mockChangeFocus} />
      );
      const listItems = findNodeByDataTest(wrapper, 'undoList');
      const index = 1;
      listItems.at(index).simulate('click');
       expect(mockChangeFocus).toHaveBeenCalledWith(index);
       expect(mockChangeFocus).toHaveBeenCalledTimes(1);
    });
  });
});
