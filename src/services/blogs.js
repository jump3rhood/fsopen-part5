import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObj) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}


const update = async (id, blogObj) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObj, config)
  return response.data
}
const deleteOne = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
  return response.data
}

export default { getAll, create, update, deleteOne, setToken }