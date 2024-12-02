

const userReducer = (state, action) => {
  switch(action.type){
    case 'SET_USER':
      console.log('setting user: ', action.payload)
      return action.payload
    case 'CLEAR_USER':
      console.log('clearing user')
      return ''
    default:
      return state
  }
}

export default userReducer