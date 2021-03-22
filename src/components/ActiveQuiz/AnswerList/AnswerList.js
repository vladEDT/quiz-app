import classes from './AnswerList.module.scss'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList = (props) => (
  <ul className={classes.AnswerList}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
        />
      )
    })}
  </ul>
)

export default AnswerList
