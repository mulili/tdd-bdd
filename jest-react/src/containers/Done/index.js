import React, { Component } from 'react';

import TodoList from '../../component/TodoList';

class Done extends Component {
  render() {
    return <TodoList title="已经完成" {...this.props} />;
  }
}
export default Done;
