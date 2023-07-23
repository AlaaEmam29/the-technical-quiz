import React , {useEffect} from 'react'
import Animation from './Components/Animation'
import Nav from './Components/Nav';
import Typing from './Components/Typing';
import FormQuiz from './Components/FromQuiz'
import { useQuizContext } from './context/quizContext';
import Loading from './Components/Loading';
import Error from './Components/Error';
import Questions from './Components/Questions';
import ResetQuiz from './Components/ResetQuiz';
import Timer from './Components/Timer';
export default function App() {
  const { state  } = useQuizContext()
  
  return (
    <>
      <Animation />
      <Nav />
      <main>
        {state.status === 'loading' && <Loading />}
        {(state.status === 'init' ) && (
            <>
              <Typing />
              <FormQuiz />
            </>
        )}
        {
          state.status === 'finished' && <ResetQuiz/>
        }
        {state.status === 'ready' && state.questions && <Questions />}
        {state.status === 'error' && <Error />}
        {state.timer && <Timer/>}
      </main>
    </>
  );
}
