import React, { Component } from 'react';
import './index.css';
class UndoList extends Component {
  render() {
    const { undoList, deleteItem, changeFocus } = this.props;
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
                data-test="undoList"
                onClick={() => {
                  changeFocus(index);
                }}
              >
                {item}
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
