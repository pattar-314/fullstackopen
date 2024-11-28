import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";
import blogSlice from '../reducers/blogReducer'


const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
  }
})


export default store