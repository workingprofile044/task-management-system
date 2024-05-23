import React from 'react';
import Column from './Column';

const Board = ({ state, setState }) => {
  const setColumnState = (columnName, cards) => {
    setState({ ...state, [columnName]: cards });
  };

  const moveCardAcrossColumns = (dragIndex, hoverIndex, dragColumnId, hoverColumnId) => {
    const dragColumn = state[dragColumnId];
    const hoverColumn = state[hoverColumnId];
    const draggedCard = dragColumn[dragIndex];

    const newDragColumn = [...dragColumn];
    newDragColumn.splice(dragIndex, 1);

    const newHoverColumn = [...hoverColumn];
    newHoverColumn.splice(hoverIndex, 0, draggedCard);

    setState({
      ...state,
      [dragColumnId]: newDragColumn,
      [hoverColumnId]: newHoverColumn,
    });
  };

  return (
    <div className="board">
      <Column
        title="To Do"
        columnId="todo"
        cards={state.todo}
        setCards={(cards) => setColumnState('todo', cards)}
        moveCardAcrossColumns={moveCardAcrossColumns}
      />
      <Column
        title="In Progress"
        columnId="inProgress"
        cards={state.inProgress}
        setCards={(cards) => setColumnState('inProgress', cards)}
        moveCardAcrossColumns={moveCardAcrossColumns}
      />
      <Column
        title="Done"
        columnId="done"
        cards={state.done}
        setCards={(cards) => setColumnState('done', cards)}
        moveCardAcrossColumns={moveCardAcrossColumns}
      />
    </div>
  );
};

export default Board;
