import React, { Component } from 'react';

import Header from '../../component/Header';
import Undo from '../Undo';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
  }
  addUndoItem = todo => {
    const { todoList } = this.state;
    this.setState({
      todoList: [...todoList, todo],
    });
  };

  deleteItem = index => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter((item, k) => k !== index),
    });
  };

  handleFocus = index => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map((item, k) => {
        item.isFocus = k === index ? true : false;
        return item;
      }),
    });
  };

  handleBlur = () => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map(item => {
        item.isFocus = false;
        return item;
      }),
    });
  };

  handleModifiedItem = (index, value) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.map((item, k) => {
        if (k === index) {
          item.value = value;
        }
        return item;
      }),
    });
  };

  render() {
    const { todoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <Undo
          todoList={todoList.filter(item=>!item.isDone)}
          deleteItem={this.deleteItem}
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          handleModifiedItem={this.handleModifiedItem}
        />
      </div>
    );
  }
}

export default Todo;
