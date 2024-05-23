import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import { loadState, saveState } from './utils/localStorage';

const initialState = {
  todo: [],
  inProgress: [],
  done: []
};

const App = () => {
  const [state, setState] = useState(loadState() || initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return <Board state={state} setState={setState} />;
};

export default App;
