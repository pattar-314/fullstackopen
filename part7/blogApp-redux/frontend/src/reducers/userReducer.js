import { createSlice } from "@reduxjs/toolkit";

const loggedUser = window.localStorage.getItem('blogAppUser') ? window.localStorage.getItem('blogAppUser'): null

const userSlice = createSlice({
  name: 'users',
  initialState: {currentUser: loggedUser, allUsers: []},
  reducers: {
    setUser(state, action){
      return {...state, currentUser: action.payload}
    },
    clearUser(state, action){
      return null
    },
    setAllUsers(state, action){
      console.log('setting all users: ', action.payload)
      return {...state, allUsers: action.payload}
    }
  }
})

export const { setUser, clearUser, setAllUsers } = userSlice.actions
export default userSlice.reducer