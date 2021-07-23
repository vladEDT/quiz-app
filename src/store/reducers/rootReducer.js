import {combineReducers} from 'redux'

import create from './createQuizReducer'
import quizReducer from './quizReducer'
import authReducer from './auth'

export default combineReducers({
  quiz: quizReducer,
  auth: authReducer,
  create
})
