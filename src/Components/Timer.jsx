import React, { useEffect } from 'react'
import Button from './Button'
import { useQuizContext } from '../context/quizContext';

export default function Timer() {
  const {  handleTick , state } = useQuizContext();
  const mins = String(Math.floor(state.secondsRemaining / 60)).padStart(2 , "0");
  const seconds = String(state.secondsRemaining % 60).padStart(2 , "0");
  useEffect(() => {
    const id = setInterval(handleTick, 1000);

    return () => clearInterval(id)
  }, [handleTick]);
  
  
  return (
    <Button className="btn btn-timer">
      {mins} : {seconds}
    </Button>
  );
}
