import React, { Component } from 'react';
import './index.css';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleChange = e => {
    const { value } = e.target;
    this.setState({
      value: value,
    });
  };

  handleKeyUp = e => {
    const { value } = this.state;
    const { addUndoItem } = this.props;
    if (e.keyCode === 13 && value) {
      addUndoItem(value);
      this.setState({
        value: '',
      });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-container">
          <span>TodoList</span>
          <input
            className="header-input"
            type="text"
            data-test="inputItem"
            value={value}
            placeholder="addTodo"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        </div>
      </div>
    );
  }
}

export default Header;
