import { createSlice } from "@reduxjs/toolkit";

const loggedUser = window.localStorage.getItem('blogAppUser') ? window.localStorage.getItem('blogAppUser'): null

const userSlice = createSlice({
  name: 'user',
  initialState: {currentUser: loggedUser, allUsers: []},
  reducers: {
    setUser(state, action){
      return {...state, currentUser: action.payload}
    },
    clearUser(state, action){
      return null
    },
    allUsers(state, action){
      return {...state, allUsers: action.payload}
    }
  }
})

export const { setUser, clearUser, allUsers } = userSlice.actions
export default userSlice.reducer