import React, { Component } from 'react';
class UndoList extends Component {
  handleDelete = index => {
    const { deleteItem } = this.props;
    deleteItem(index);
  };
  render() {
    const { undoList } = this.props;
    return (
      <div>
        <span>正在进行</span>
        <span className="counter" data-test="counter">
          {undoList.length}
        </span>
        <ul>
          {undoList.map((item, index) => (
            <div key={`${index}${item}`}>
              <li data-test="undoList">{item}</li>
              <button
                data-test="deleteItem"
                onClick={() => {
                  this.handleDelete(index);
                }}
              >
                X
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
export default UndoList;
