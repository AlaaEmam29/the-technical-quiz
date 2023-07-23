import axios from 'axios';
import _ from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';
const QuizContext = createContext();
const URL = `https://quizapi.io/api/v1/questions?apiKey=jKpHvcvfciru3zAdrl6oE9Q34bLN15cidZTU24ka`;
const quizType = {
  limit: 'limit',
  category: 'category',
  difficulty: 'difficulty',
  ready: 'ready',
  error: 'error',
  loading: 'loading',
  finished: 'finished',
  checkAnswers: 'checkAnswers',
  submit: 'submit',
  next: 'next',
  restart: 'restart',
  timer: 'timer',
  tick: 'tick',
};
const initialState = {
  limit: 10,
  category: 'any',
  difficulty: 'easy',
  //'init' , 'loading', 'error', 'ready', 'finished'
  status: 'init',
  questions: [],
  errorMessage: '',
  index: 0,
  answers: {},
  points: 0,
  secondsRemaining: 300,
  currentAnswers: new Set(),
  submit: false,
  passed: false,
  timer : false
};
const iniNextQuestionObj = {
  currentAnswers: new Set(),
  submit: false,
  passed: false,
};

function handleQuizTypeUpdate(state, action, timer = false) {
    const answersObj = action.payload[state.index];
    const answers =  Object.keys(answersObj).filter((ans) => answersObj[ans] === 'true');

const secondsRemaining = timer
  ? action.payload.length * 45
  : state.secondsRemaining;
  return {
    ...state,
    questions: action.payload,
    status: 'ready',
    answers,
    timer,
    secondsRemaining
     
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case quizType.limit:
    case quizType.category:
    case quizType.difficulty:
      const key = action.type;
      let value = action.payload;
      if (key === 'limit') {
        value = +value
      }
      return {
        ...state,
        [key]: value,
      };
    case quizType.ready: {
      return handleQuizTypeUpdate(state, action);
    }
    case quizType.timer: {
      return handleQuizTypeUpdate(state, action, true);
    }

    case quizType.submit: {
      const isSubmit = true;
      return {
        ...state,
        submit: isSubmit,
        points: state.passed && isSubmit ? state.points + 10 : state.points,
      };
    }

    case quizType.checkAnswers: {
      const { answer, checked } = action.payload;
      const updateCurrentAnswers = _.cloneDeep(state.currentAnswers);
      if (checked) {
        updateCurrentAnswers.add(answer);
      } else {
        const exist = updateCurrentAnswers.has(answer);
        if (exist) updateCurrentAnswers.delete(answer);
      }
      const currentAnswers = [...updateCurrentAnswers].sort();
      const answers = state.answers.sort();
      const passed = _.isEqual(currentAnswers, answers);
      return {
        ...state,
        currentAnswers: updateCurrentAnswers,
        passed,
      };
    }
    case quizType.next: {
    const answersObj = action.payload[state.index];
    const answers = Object.keys(answersObj).filter(
      (ans) => answersObj[ans] === 'true',
    );
      return {
        ...state,
        index: state.index+1,
        answers,
        ...iniNextQuestionObj,
      };
    }

    case quizType.loading:
      return {
        ...state,
        status: 'loading',
      };
    case quizType.error:
      return {
        ...state,
        status: 'error',
        errorMessage: action.payload,
      };
    case quizType.finished:
      return {
        ...state,
        status: 'finished',
      };
    case quizType.restart:
      return {
        ...initialState,
        status: 'init',
      };
    case quizType.tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        timer: state.secondsRemaining === 0 ? false : true,
      };
    default:
      throw new Error('Action unknown, try again');
  }
};

export const QuizContextProvider = ({ children }) => {
  const handleResetQuiz = () => {
        dispatch({ type: quizType.restart });

  }
  const handleTick = () => {
  dispatch({type : quizType.tick})
}
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const handleFinishedQuiz = (e) => {
    dispatch({ type: quizType.finished });
  };
  const handleCheckAnswers = (e, checked) => {
    dispatch({
      type: quizType.checkAnswers,
      payload: { answer: e.target.value, checked },
    });
  };
  const handleSubmitAnswer = () => {
    dispatch({
      type: quizType.submit,
      payload: state.questions,
    });
  };
  const handleNextQuestion = () => {
    dispatch({
      type: quizType.next,
    });
  };

 const fetchForm = async (e) => {
    dispatch({ type: quizType.loading });
    try {

            const response = await axios.get(`${URL}${state.category !== 'any' ? `&category=${state.category}` : ""}&difficulty=${state.difficulty}&limit=${state.limit}`);
            console.log(response);

        
      dispatch({ type: e.target.dataset.type, payload: response.data });
    } catch (error) {
      
             
              console.log(error);
              dispatch({
                type: quizType.error,
                payload: error.response.data.error
                  ? error.response.data.error
                  : error.message,
              });    
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const maxPoints = state.questions.length * 10;
  return (
    <QuizContext.Provider
      value={{
        handleFinishedQuiz,
        state,
        handleChange,
        fetchForm,
        maxPoints,
        handleCheckAnswers,
        handleSubmitAnswer,
        handleNextQuestion,
        handleResetQuiz,
        handleTick,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export const useQuizContext = () => {
  return useContext(QuizContext);
};

