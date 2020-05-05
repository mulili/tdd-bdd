import React, { Component } from 'react';

import TodoList from '../../component/TodoList';

class Undo extends Component {
  render() {
    return <TodoList title="正在进行" {...this.props} />;
  }
}
export default Undo;
