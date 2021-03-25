import classes from './FinishedQuiz.module.scss'
import Button from '../UI/Button/Button'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.result).reduce((total, key) => {
    if (props.result[key] === 'success') {
      total++
    }

    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.result[quizItem.id] === 'failure' ? 'fa-times' : 'fa-check',
            classes[props.result[quizItem.id]],
          ]

          return (
            <li key={index}>
              <strong>{index + 1}.</strong> &nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>

      <p>
        Правильных {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>

        <Button type="success">Перейти в список тестов</Button>
      </div>
    </div>
  )
}

export default FinishedQuiz
