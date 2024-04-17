

export const SearchFilter = (props) => {


  return (
    <div>filter shown with: <input className='phonebook-filter-input' onChange={(e) => props.setFilterInput(e.target.value)} value={props.filterInput} /> </div>
  )
}