import {Component} from "react"
import classes from "./QuizCreator.module.scss"
import Button from "./../../components/UI/Button/Button"

class QuizCreator extends Component {
  submitHandler = (e) => {
    e.preventDefault()
  }

  addQuestionHandler = () => {}

  createQuizHandler = () => {}

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание Теста</h1>
          <form onSubmit={this.submitHandler}>
            <input type="text" />
            <hr />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />

            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator
