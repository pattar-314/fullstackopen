import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"


const AnecdoteFilter = () => {

  const dispatch = useDispatch()

  const handleChange = (filterInput) => {
    console.log('input: ', filterInput)
    return dispatch(setFilter(filterInput))
  }

  return (
    <div>
      filter <input onChange={(e) => handleChange(e.target.value)} />
    </div>
  )

}

export default AnecdoteFilter