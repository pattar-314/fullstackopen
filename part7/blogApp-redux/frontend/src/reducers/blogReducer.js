import { createSlice } from "@reduxjs/toolkit";




const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setAllBlogs(state, action){
      console.log('setting blogs: ', action.payload)
      return action.payload
    },
    newBlog(state, action){
      return state.concat(action.payload)
    },
    deleteBlog(state, action){
      console.log('deleting blog: ', action.payload)
      return state.filter(b => b.id !== action.payload)
    },
    updateLike(state, action){
      const newState = state.map(b => b.id === action.payload ? {...b, likes: b.likes + 1}: b)
      console.log('updating likes: ', newState, 'action: ', action)
      return newState
    }
  }
})

export const {newBlog, deleteBlog, setAllBlogs, updateLike} = blogSlice.actions
export default blogSlice.reducer