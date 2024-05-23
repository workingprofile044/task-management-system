import React from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';

const Column = ({ title, columnId, cards = [], setCards, moveCardAcrossColumns }) => {
  const moveCard = (dragIndex, hoverIndex, dragColumnId, hoverColumnId) => {
    if (dragColumnId === hoverColumnId) {
      const draggedCard = cards[dragIndex];
      const updatedCards = [...cards];
      updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, draggedCard);
      setCards(updatedCards);
    } else {
      moveCardAcrossColumns(dragIndex, hoverIndex, dragColumnId, hoverColumnId);
    }
  };

  const [, drop] = useDrop({
    accept: 'card',
    hover(item) {
      if (item.columnId !== columnId) {
        moveCard(item.index, 0, item.columnId, columnId);
        item.index = 0;
        item.columnId = columnId;
      }
    },
  });

  const addCard = () => {
    const newCard = prompt('Enter card title:');
    if (newCard) {
      setCards([...cards, newCard]);
    }
  };

  const deleteCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  return (
    <div ref={drop} className="column">
      <h2>{title}</h2>
      <button onClick={addCard}>Add another card</button>
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card}
          index={index}
          columnId={columnId}
          title={card}
          moveCard={moveCard}
          onDelete={() => deleteCard(index)}
        />
      ))}
    </div>
  );
};

export default Column;
