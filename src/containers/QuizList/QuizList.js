import axios from '../../axios/axios-quiz'
import {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import classes from './QuizList.module.scss'

class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  }

  renderQuizes = () => {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const res = await axios.get('quizes.json')

      const quizes = []
      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      this.setState({
        quizes,
        loading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список Тестов</h1>

          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    )
  }
}

export default QuizList
