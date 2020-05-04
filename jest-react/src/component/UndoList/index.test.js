import React from 'react';
import { shallow } from 'enzyme';

import UndoList from './index';
import { findNodeByDataTest } from '../../utils/findNodeByDataTest';

describe('UndoList component test', () => {
  describe('dom test', () => {
    test('counter text should be 0, and undoList length should be 0', () => {
      const wrapper = shallow(<UndoList undoList={[]} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('0');
      const undoList = findNodeByDataTest(wrapper, 'undoList');
      expect(undoList.length).toEqual(0);
    });

    test('counter text should be 3, undo list length should be 3', () => {
      const mockUndoList = [
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
      ];
      const wrapper = shallow(<UndoList undoList={mockUndoList} />);
      const counter = findNodeByDataTest(wrapper, 'counter');
      expect(counter.text()).toEqual('3');
      const undoList = findNodeByDataTest(wrapper, 'undoList');
      expect(undoList.length).toEqual(3);
    });
    test("should have one inputItem when item's isFocus is true", () => {
      const mockUndoList = [
        { isFocus: false, value: 'hello' },
        { isFocus: true, value: 'hello' },
        { isFocus: false, value: 'hello' },
      ];
      const wrapper = shallow(<UndoList undoList={mockUndoList} />);
      const inputItems = findNodeByDataTest(wrapper, 'inputItem');
      expect(inputItems.length).toEqual(1);
    });
  });

  describe('delete function test', () => {
    test('should have corresponding delete button when list exist', () => {
      const mockUndoList = [
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
      ];
      const wrapper = shallow(<UndoList undoList={mockUndoList} />);
      const deleteItems = findNodeByDataTest(wrapper, 'deleteItem');
      expect(deleteItems.length).toEqual(3);
    });

    test('delete function should be called after click delete btn', () => {
      const mockUndoList = [
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
      ];
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
    test('handleFocus fn should be called after click listItem', () => {
      const mockUndoList = [
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
        { isFocus: false, value: 'hello' },
      ];
      const mockHandleFocus = jest.fn();
      const wrapper = shallow(
        <UndoList undoList={mockUndoList} handleFocus={mockHandleFocus} />
      );
      const listItems = findNodeByDataTest(wrapper, 'undoList');
      const index = 1;
      listItems.at(index).simulate('click');
      expect(mockHandleFocus).toHaveBeenCalledWith(index);
      expect(mockHandleFocus).toHaveBeenCalledTimes(1);
    });
  });
});
