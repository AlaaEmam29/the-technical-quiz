import React, { useState } from 'react';
import { useQuizContext } from '../context/quizContext';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Question({ question }) {
  const answers = Object.entries(question.answers).filter(
    (answer) => answer[1],
  );
  const length = answers.length;
  const [checked, setChecked] = useState(new Array(length).fill(false));

  const { handleCheckAnswers } = useQuizContext();
  const { state } = useQuizContext();
  const handleOptionClick = (e, index) => {
    const updateChecked = [...checked];
    updateChecked[index] = !updateChecked[index];
    setChecked(updateChecked);
    handleCheckAnswers(e, updateChecked[index]);
  };
  const styleAnswer = (refs) => {
      if (state.submit) {
        refs.forEach((element) => {
          const value = element.getAttribute('data-correct-answer');
          const isCorrect = state.answers.includes(value);
          element.style = {}
          element.children[1].style = {}
          element.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
        });
      }

      
    }
const divRefs = useRef([]);
  useEffect(() => {
  styleAnswer(divRefs.current);
}, [state.submit])
  return (
    <div className="question-container">
      <h2 className="question">{question.question}</h2>
      <p>
        {question.multiple_correct_answers === 'true' &&
          'You can choose multiple answers'}
      </p>
      {answers.map((_, i) => {
        return (
          <div className="btn-answer" key={i}>
            <label
              style={checked[i] ? { background: '#343a40' } : {}}
              ref={(element) => {
                divRefs.current[i] = element;
              }}
              data-correct-answer={`${answers[i][0]}_correct`}
              className="btn-check"
            >
              <input
                type="checkbox"
                value={`${answers[i][0]}_correct`}
                onClick={(e) => {
                  handleOptionClick(e, i);
                }}
              />
              <span
                style={
                  checked[i] ? { background: '#343a40', border: 'none' } : {}
                }
                className="btn-check"
                
              >
                {answers[i][1]}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
