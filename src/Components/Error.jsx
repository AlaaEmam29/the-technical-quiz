import React from 'react'
import { useQuizContext } from '../context/quizContext'

export default function Error() {
  const {state} = useQuizContext()
  return <h2 className='error'>{state.errorMessage}</h2>;
}
