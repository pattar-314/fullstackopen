import { useDispatch, useSelector } from 'react-redux'
import userService from './../services/userService'
import { useEffect } from 'react'
import { setAllUsers } from '../reducers/userReducer'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router'


const TableWrap = styled.div`
      margin: auto;
      max-width: fit-content;
    `

  const paddedTd = styled.td`
    padding: .5em;
  `


const AllUsers = () => {

    const users = useSelector(state => state.users.allUsers)
    const dispatch = useDispatch()
    
    const usersCheck = async () => {
        if(users.length < 1){
            const userTemp = await userService.getAllUsers()
            console.log('usertemp:', userTemp)
            dispatch(setAllUsers(userTemp))
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
            {users ? users.map(u => (
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
            )): <></>}
          </tbody>
        </Table>
    )
    
    return (
        <TableWrap className='all-users-wrapper'>
            {users.length > 0 ? userTable : <div>loading users</div> }
        </TableWrap>
    )
}

export default AllUsers