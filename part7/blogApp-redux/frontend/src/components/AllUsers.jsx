import { useDispatch, useSelector } from 'react-redux'
import userService from './../services/userService'
import { useEffect, useReducer } from 'react'
import { allUsers } from '../reducers/userReducer'
import { Table } from 'react-bootstrap'


const AllUsers = () => {

    const users = useSelector(state => state.users ? state.users : [])
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

    useEffect(() => {
      usersCheck()
    }, [])

    const userTable = (
        <Table striped border hover>
          <thead>
            <tr>
              <th>username</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr>
                <td>{u.username}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
    
    return (
        <div className='all-users-wrapper'>
            {users.length > 0 ? userTable : <div>loading users</div> }
        </div>
    )
}

export default AllUsers