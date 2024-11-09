import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"


const VisibilityFilter = () => {
  
  const dispatch = useDispatch()


  const filterSelected = (value) => {
    return dispatch(filterChange(value))
  }


  return (
    <div>
        all <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
        important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
        nonImportant <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
  )
}

export default VisibilityFilter