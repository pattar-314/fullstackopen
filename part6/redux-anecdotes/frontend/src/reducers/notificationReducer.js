import { createSlice } from "@reduxjs/toolkit";

export const handleNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, time * 1000)
  }
}

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