import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
);
