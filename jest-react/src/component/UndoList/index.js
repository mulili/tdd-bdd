import React, { Component } from 'react';
import './index.css';
class UndoList extends Component {
  handleDelete = index => {
    const { deleteItem } = this.props;
    deleteItem(index);
  };
  render() {
    const { undoList } = this.props;
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
                key={`${index}${item}`}
                className="undo-list-item"
                data-test="undoList"
              >
                {item}
                <div
                  className="delete-item"
                  data-test="deleteItem"
                  onClick={() => {
                    this.handleDelete(index);
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
