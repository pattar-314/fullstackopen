import { createSlice } from "@reduxjs/toolkit";

const loggedUser = window.localStorage.getItem('blogAppUser') ? window.localStorage.getItem('blogAppUser'): null

const userSlice = createSlice({
  name: 'user',
  initialState: loggedUser,
  reducers: {
    setUser(state, action){
      return action.payload
    },
    clearUser(state, action){
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer