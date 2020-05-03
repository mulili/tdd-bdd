import React, { Component } from 'react';

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
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          data-test="inputItem"
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}

export default Header;
