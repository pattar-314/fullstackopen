import { useDispatch, useSelect } from 'react-redux'
import userService from './../services/userService'
import { useReducer } from 'react'
import { allUsers } from '../reducers/userReducer'


const AllUsers = () => {

    const users = useSelect(state => state.users ? state.users : [])
    const userReducer = useReducer(userReducer)
    const dispatch = useDispatch()
    
    const usersCheck = async () => {
        if(users.length < 1){
            const usertemp = await userService.getAllUsers()
            console.log('usertemp:', usertemp)
            await dispatch(allUsers(userTemp.data))
            console.log('updatedUsers: ', users)
        }
    }

    const userTable = (
        <
    )
    
    return (
        <div className='all-users-wrapper'>
            {users.map(u => <div className='user-list-item-wrapper'><span className='user-username'></span></div>{} ) }
        </div>
    )
}

export default AllUsers