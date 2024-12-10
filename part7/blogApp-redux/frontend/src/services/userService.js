

const userBaseUrl = '/api/users'

const getAllUsers = async () => {
    const allTemp = await get(userBaseUrl)
    console.log('allTemp: ', allTemp)
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

const userService = { getAllUsers, getSingleUser }

export default userService