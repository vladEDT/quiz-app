import {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        questionTitle: 'Какого цвета небо?',
        correctAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Answer #1', id: 1},
          {text: 'Answer #2', id: 2},
          {text: 'Answer #3', id: 3},
          {text: 'Answer #4', id: 4},
        ],
      },
      {
        questionTitle: 'Когда был основан Санкт-Петербург?',
        correctAnswerId: 3,
        id: 2,
        answers: [
          {text: 'Answer #1', id: 1},
          {text: 'Answer #2', id: 2},
          {text: 'Answer #3', id: 3},
          {text: 'Answer #4', id: 4},
        ],
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('onAnswerClick', answerId)

    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer to all questions</h1>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].questionTitle}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    )
  }
}

export default Quiz
