import React from 'react'
import { useQuizContext } from '../context/quizContext'

export default function Progress() {
  const { state, maxPoints } = useQuizContext();
  return (
    <>
      <header className="progress">
        <progress max={  state.limit - 1} value={state.limit === 1 && state.submit ? state.index + 1 : state.index} />
        <p className="totalQ">
          Question <strong>{state.index + 1}</strong> / {state.limit}
        </p>

        <p className="totalPoints">
          <strong>{state.points}</strong> / {maxPoints}
        </p>
      </header>
    </>
  );
}
