import {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    loading: true,
    quiz: []
  }

  onAnswerClickHandler = (answerId) => {
    console.log(answerId)
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }

        window.clearTimeout(timeout)
      }, 500)
    } else {
      results[question.id] = 'failure'
      this.setState({
        answerState: {[answerId]: 'failure'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion:0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`quizes/${this.props.match.params.id}.json`)
      const quiz = res.data

      this.setState({
        quiz, loading: false
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer to all questions</h1>

         {this.state.loading 
         ? <Loader /> 
         :  this.state.isFinished 
              ? <FinishedQuiz 
                  result={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
              : <ActiveQuiz
                  question={this.state.quiz[this.state.activeQuestion].question}
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answerState}
                />
          }
          
        </div>
      </div>
    )
  }
}

export default Quiz
