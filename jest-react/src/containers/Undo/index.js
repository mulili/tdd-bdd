import React, { Component } from 'react';

import TodoList from '../../component/TodoList';

class Undo extends Component {
  render() {
    return <TodoList {...this.props} />;
  }
}
export default Undo;
