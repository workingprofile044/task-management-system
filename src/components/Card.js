import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
};

const Card = ({ id, title, index, columnId, moveCard, onDelete }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragColumnId = item.columnId;

      if (dragIndex === hoverIndex && columnId === dragColumnId) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex, dragColumnId, columnId);
      item.index = hoverIndex;
      item.columnId = columnId;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {title}
      <button onClick={onDelete} className="delete-button">X</button>
    </div>
  );
};

export default Card;
