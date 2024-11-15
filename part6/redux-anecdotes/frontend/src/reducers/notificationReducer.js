import { createSlice } from "@reduxjs/toolkit";


const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action){
      return action.payload
    }
  }
})

export const { setNotification } = notificationReducer.actions
export default notificationReducer.reducer