import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 100000
})

const API = {}

API.postHomeWork = body => api.post('/homework', body)


export {
  API
}
