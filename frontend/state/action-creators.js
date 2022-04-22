import axios from 'axios'
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'
// ❗ You don't need to add extra action creators to achieve MVP
//we only need an action type
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return {type: MOVE_COUNTERCLOCKWISE}
 }

 export function selectAnswer(id) {
  return { type: SET_SELECTED_ANSWER, payload: id };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz };
}

export function inputChange(value) {
  return { type: INPUT_CHANGE, payload: value };
}

 export function resetForm() {
  return { type: RESET_FORM };
}

export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get(`http://localhost:9000/api/quiz/next`)
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/answer`, { quiz_id, answer_id })
      .then((res) => {
        dispatch(fetchQuiz());
        dispatch(setMessage(res.data.message));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


export function postQuiz({question_text,true_answer_text,false_answer_text}) {
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/new`, {question_text,true_answer_text,false_answer_text,
      })
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}