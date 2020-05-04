import React, { Component } from 'react';

import Header from '../../component/Header';
import UndoList from '../../component/UndoList';
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

  render() {
    const { todoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList undoList={todoList} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default Todo;
