import React, { useEffect } from 'react'
import {connect} from "react-redux";
import { postAnswer, selectAnswer, fetchQuiz } from '../state/action-creators';

export function Quiz(props) {
  const {selectAnswer, selectedAnswer, postAnswer, quiz, fetchQuiz} = props;

  useEffect(() => {
    fetchQuiz();
  }, []);
  
  const handleClick = id => {
    selectAnswer(id);
  };

  const answerSubmissionHandler = event => {
    event.preventDefault();
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer,
    });
  }
  
  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            <div
              className={`${ selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}`}
            >
              {quiz.answers[0].text}
              <button onClick={() => handleClick(quiz.answers[0].answer_id)}>
                {selectedAnswer === quiz.answers[0].answer_id? "SELECTED": "Select"}
              </button>
            </div>

            <div
              className={`${selectedAnswer === quiz.answers[1].answer_id? "answer selected": "answer"}`}
            >
              {quiz.answers[1].text}
              <button onClick={() => handleClick(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id? "SELECTED": "Select"}
              </button>
            </div>
          </div>

          <button
            onClick={answerSubmissionHandler}
            disabled={!selectedAnswer}
            id="submitAnswerBtn"
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

export default connect((state) => state, {postAnswer,selectAnswer,fetchQuiz })(Quiz);