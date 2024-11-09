

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter 
  }
}

const filterReducer = (state = 'ALL', action) => {
  switch(action.type){
    case 'SET_FILTER':
      console.log(action)
      return action.payload
    default:
      return state
  }
}

export default filterReducer