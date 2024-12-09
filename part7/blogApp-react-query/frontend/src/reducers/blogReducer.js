

const blogReducer = (state, action) => {
 switch(action.type){
  case 'CREATE_BLOG':
    return state.concat(action.payload)
  case 'LIKE_BLOG':
    return state.map(b => b.id === action.payload ? {...b, likes: b.likes + 1} : b)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.payload)
  default: 
    return state
 }  
}

export default blogReducer