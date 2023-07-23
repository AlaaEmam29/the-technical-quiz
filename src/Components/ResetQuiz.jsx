import React from 'react';
import { useQuizContext } from '../context/quizContext';
import Button from './Button';

export default function ResetQuiz() {
  const { state, maxPoints, handleResetQuiz } = useQuizContext();
  const currentScorePercentage = Math.ceil(
    (state.points / maxPoints) * 100,
  ); ;
  
  return (
    <div className="resetContainer">
      <p className="result">
         You scored {state.points} out of {maxPoints}
      </p>
      <div className="scores">
        <p className="current">
          CURRENT SCORE <br />
          <strong>{currentScorePercentage}%</strong>
        </p>

        <p className="status">
          QUIZ STATUS
          <br />
          <strong>{currentScorePercentage >= 50 ? "Passed" : "Failed"}</strong>
        </p>
      </div>
      <div className="btn-container">
        <Button className="btn btn-restart" onClick={handleResetQuiz}>
          Restart quiz
        </Button>
      </div>
    </div>
  );
}
