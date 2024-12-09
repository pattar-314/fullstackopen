

export const PhonebookForm = (props) => {


  return (
    <div className='phonebook-add-form-wrapper'>
      <form onSubmit={props.handleSubmit} className='add-form'>
        <h1>add new</h1>
        <div>
          name: <input className='name-input' onChange={(e) => props.setNewName(e.target.value)} value={props.newName} />
        </div>
        <div>
          number: <input className='number-input' onChange={(e) => props.setNewNumber(e.target.value)} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      
      </form>
    </div>


  )

}

