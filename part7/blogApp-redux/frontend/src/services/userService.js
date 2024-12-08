

const userBaseUrl = '/api/users'

const getAllUsers = async () => {
    const allTemp = await get(userBaseUrl)
    console.log('allTemp: ', allTemp)
    return allTemp.data
}

export { getAllUsers }