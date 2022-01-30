import { useState } from "react";

const useVisualMode = initialMode => {
  const [mode, setMode] = useState(initialMode);
  // eslint-disable-next-line
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setHistory(prevState => {
      if (!replace) {
        prevState.push(newMode);
      }
      setMode(newMode);
      return prevState;
    });
  };

  const back = () => {
    setHistory(prevState => {
      if (prevState.length >= 2) {
        prevState.pop();
        setMode(prevState[prevState.length - 1]);
      }
      return prevState;
    });
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
