import React from 'react'
import { useQuizContext } from '../context/quizContext';
import Button from './Button';

export default function FromQuiz() {
    const { state, handleChange, fetchForm } = useQuizContext();
    return (
      <div className="quizSubmit">
        <div className="groups__form">
          <label htmlFor="">Category</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
          >
            <option value="any">Any Category</option>
            <option value="linux">Linux</option>
            <option value="bash">Bash</option>
            <option value="uncategorized">Uncategorized</option>
            <option value="docker">Docker</option>
            <option value="sql">SQL</option>
            <option value="cms">CMS</option>
            <option value="code">Code</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
        <div className="groups__form">
          <label htmlFor="">Difficulty</label>
          <select
            name="difficulty"
            onChange={handleChange}
            value={state.difficulty}
          >
            <option value="any">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="groups__form">
          <label>Number of questions</label>
          <select name="limit" onChange={handleChange} value={state.limit}>
            <option value="10">10</option>
            {Array.from({ length: 20 }, (_, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="btns">
          <Button className="btn" onClick={fetchForm} data-type="ready">
            Let's start
          </Button>
          <div className="challenge">
            <Button className="btn" onClick={fetchForm} data-type="timer">
              I want a challenge!
            </Button>
            <p>Note: It will have a timer. Enjoy!</p>
          </div>
        </div>
      </div>
    );
}



/***
 * 
 * 
 * <div >
                  <label >Category</label>
                  <select  name="category">
                   
                                      </select>            
                </div>
 */