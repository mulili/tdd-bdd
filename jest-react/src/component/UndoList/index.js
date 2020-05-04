import React, { Component } from 'react';
import './index.css';
class UndoList extends Component {
  render() {
    const { undoList, deleteItem, handleFocus, handleBlur } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-container">
          <div className="undo-list-title">
            正在进行
            <span className="undo-list-counter" data-test="counter">
              {undoList.length}
            </span>
          </div>
          <ul className="undo-list-content">
            {undoList.map((item, index) => (
              <li
                key={`${index}-${item}`}
                className="undo-list-item"
                data-test="undoItem"
                onClick={() => {
                  handleFocus(index);
                }}
                onBlur={() => {
                  handleBlur();
                }}
              >
                {item.isFocus ? (
                  <input data-test="inputItem" value={item.value}></input>
                ) : (
                  item.value
                )}
                <div
                  className="delete-item"
                  data-test="deleteItem"
                  onClick={() => {
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
export default UndoList;
