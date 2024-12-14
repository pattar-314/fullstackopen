import axios from 'axios'
import { useDispatch } from 'react-redux'

const userBaseUrl = '/api/users'

const getAllUsers = async () => {
    const allTemp = await axios.get(userBaseUrl)
    console.log('allTempGetAll: ', allTemp)
    return allTemp.data
}

const getSingleUser = async (props) => {
  if(props.id){
    const userReq = await axios.get(`${userBaseUrl}/${props.id}`)
    console.log('did userReq work: ', userReq.data)
    return userReq.data
  } else if (props.username){
    const userReq = await axios.get(`${userBaseUrl}`, {username})
    console.log('did userReq work: ', userReq.data)
    return userReq.data
  }
}

const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    location.reload()
}

const userService = { getAllUsers, getSingleUser, handleLogout }

export default userService