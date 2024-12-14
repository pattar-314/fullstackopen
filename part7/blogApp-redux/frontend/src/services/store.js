import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";
import blogSlice from '../reducers/blogReducer'
import userSlice from '../reducers/userReducer'


const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    users: userSlice
  }
})


export default store