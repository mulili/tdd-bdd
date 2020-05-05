import React, { Component } from 'react';
import './index.css';
class TodoList extends Component {
  handleInputItemChange = (e, index) => {
    const { value } = e.target;
    const { handleModifiedItem } = this.props;
    handleModifiedItem(index, value);
  };

  handleClickWithEnter = e => {
    const { keyCode } = e;
    const { handleBlur } = this.props;
    if (keyCode === 13) {
      handleBlur();
    }
  };

  render() {
    const {
      title,
      todoList,
      deleteItem,
      handleFocus,
      handleBlur,
      handleChecked,
    } = this.props;
    return (
      <div className="list">
        <div className="list-container">
          <div className="list-title">
            <span data-test="listTitle">{title}</span>
            <span className="list-counter" data-test="counter">
              {todoList.length}
            </span>
          </div>
          <ul className="list-content">
            {todoList.map((item, index) => (
              <li
                key={`${index}-${item}`}
                className="list-item"
                data-test="listItem"
                onClick={() => {
                  handleFocus(index);
                }}
                onBlur={() => {
                  handleBlur();
                }}
              >
                <input
                  type="checkbox"
                  className="list-checkbox-item"
                  data-test="checkboxItem"
                  onClick={() => {
                    handleChecked(index);
                  }}
                />
                {item.isFocus ? (
                  <input
                    autoFocus
                    data-test="inputItem"
                    value={item.value}
                    className="list-input-item"
                    onChange={e => this.handleInputItemChange(e, index)}
                    onKeyUp={e => {
                      this.handleClickWithEnter(e, index);
                    }}
                  ></input>
                ) : (
                  <div data-test="divItem" className="list-div-item">
                    {item.value}
                  </div>
                )}
                <div
                  className="delete-item"
                  data-test="deleteItem"
                  onClick={e => {
                    e && e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  -
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default TodoList;
