import React from 'react';
import { useQuizContext } from '../context/quizContext';
import Progress from './Progress';
import Question from './Question';
import Button from './Button';

export default function Questions() {
  const { state, handleSubmitAnswer, handleNextQuestion, handleFinishedQuiz } =
    useQuizContext();
  const { questions, index, currentAnswers, submit } = state;
  return (
    <div className="quiz">
      <Progress />
      {questions && (
        <Question key={questions[index]?.id} question={questions[index]} />
      )}
      <div className="questions_extra">
        <Button
          className="btn btn-submit"
          onClick={handleSubmitAnswer}
          disabled={currentAnswers.size > 0 ? false : true}
        >
          submit
        </Button>

        {questions[index].tags &&
          questions[index].tags.map((tag, i) => {
            return (
              <Button key={i} className="btn btn-tags ">
                {tag.name}
              </Button>
            );
          })}
        {submit && currentAnswers.size && index < questions.length - 1 && (
          <Button onClick={handleNextQuestion} className="btn btn-next">
            Next
          </Button>
        )}
        {submit && index >= questions.length - 1 && (
          <Button onClick={handleFinishedQuiz} className="btn btn-next">
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
