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
      const undoItems = findNodeByDataTest(wrapper, 'undoItem');
      expect(undoItems.length).toEqual(0);
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
      const undoItems = findNodeByDataTest(wrapper, 'undoItem');
      expect(undoItems.length).toEqual(3);
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

    test('snapshot test', () => {
      const wrapper = shallow(<UndoList undoList={[]} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('function test', () => {
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
        const undoItems = findNodeByDataTest(wrapper, 'undoItem');
        const index = 1;
        undoItems.at(index).simulate('click');
        expect(mockHandleFocus).toHaveBeenCalledWith(index);
        expect(mockHandleFocus).toHaveBeenCalledTimes(1);
      });
    });

    describe('listItem blur test', () => {
      test('handleBlur should be called after listItem blur', () => {
        const mockUndoList = [
          { isFocus: false, value: 'hello' },
          { isFocus: false, value: 'hello' },
          { isFocus: false, value: 'hello' },
        ];
        const mockHandleBlur = jest.fn();
        const wrapper = shallow(
          <UndoList undoList={mockUndoList} handleBlur={mockHandleBlur} />
        );
        const undoItems = findNodeByDataTest(wrapper, 'undoItem');
        undoItems.at(0).simulate('blur');
        expect(mockHandleBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('inputItem change test', () => {
      test('modifyItem method should be called with value', () => {
        const mockUndoList = [
          { isFocus: true, value: 'hello' },
          { isFocus: false, value: 'hey' },
        ];
        const mockHandleModifyItem = jest.fn();
        const wrapper = shallow(
          <UndoList
            undoList={mockUndoList}
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
        const mockUndoList = [{ isFocus: true, value: inputValue }];
        const mockHandleBlur = jest.fn();
        const wrapper = shallow(
          <UndoList undoList={mockUndoList} handleBlur={mockHandleBlur} />
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
