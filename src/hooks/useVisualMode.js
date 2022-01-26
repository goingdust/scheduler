import { useState } from "react";

const useVisualMode = initialMode => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      if (!replace) {
        prev.push(newMode);
      }
      setMode(newMode);
      return prev;
    });
  };

  const back = () => {
    setHistory(prev => {
      if (prev.length >= 2) {
        prev.pop();
        setMode(prev[prev.length - 1]);
      }
      return prev;
    });
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
