import React, { Component } from 'react';

import Header from '../../component/Header';
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
  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
      </div>
    );
  }
}

export default Todo;
