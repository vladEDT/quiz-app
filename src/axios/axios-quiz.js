import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-d5c98-default-rtdb.europe-west1.firebasedatabase.app/'
})
