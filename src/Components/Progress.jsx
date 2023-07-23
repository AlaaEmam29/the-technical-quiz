import React from 'react'
import { useQuizContext } from '../context/quizContext'

export default function Progress() {
  const { state, maxPoints } = useQuizContext();
  const index = state.index 
  const limit = state.limit
  return (
    <>
      <header className="progress">
        <progress max={  limit - 1} value={limit === 1 && state.submit ? index + 1 : index} />
        <p className="totalQ">
          Question <strong>{index + 1}</strong> / {limit}
        </p>

        <p className="totalPoints">
          <strong>{state.points}</strong> / {maxPoints}
        </p>
      </header>
    </>
  );
}
