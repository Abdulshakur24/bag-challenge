import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

const instance = axios.create({
  baseURL: isProduction ? '/api' : 'http://localhost:5010/api',
})

export default instance
