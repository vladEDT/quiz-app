import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE
} from './actionTypes'

export const fetchQuizes = () => {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const res = await axios.get('quizes.json')

      const quizes = []
      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (err) {
      dispatch(fetchQuizesError(err))
    }
  }
}

export const fetchQuizById = quizId => {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const res = await axios.get(`quizes/${quizId}.json`)
      const quiz = res.data

      dispatch(fetchQuizSuccess(quiz))
    } catch (err) {
      dispatch(fetchQuizesError(err))
    }
  }
}

export const fetchQuizSuccess = quiz => ({
  type: FETCH_QUIZ_SUCCESS,
  quiz
})

export const fetchQuizesStart = () => ({
  type: FETCH_QUIZES_START
})

export const fetchQuizesSuccess = quizes => ({
  type: FETCH_QUIZES_SUCCESS,
  quizes
})

export const fetchQuizesError = err => ({
  type: FETCH_QUIZES_ERROR,
  err
})

export const quizSetState = (answerState, results) => ({
  type: QUIZ_SET_STATE,
  answerState,
  results
})

export const finishQuiz = () => ({
  type: FINISH_QUIZ
})

export const quizNextQuestion = number => ({
  type: QUIZ_NEXT_QUESTION,
  number
})

export const retryQuiz = () => ({
  type: QUIZ_RETRY
})

export const quizAnswerClick = answerId => {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout)
      }, 500)
    } else {
      results[question.id] = 'failure'
      dispatch(quizSetState({[answerId]: 'failure'}, results))
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
