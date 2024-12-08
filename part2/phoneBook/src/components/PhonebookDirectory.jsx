import PhonebookEntry from "./PhonebookEntry"

const PhonebookDirectory = (props) => {

  const phonebookContent = () => props.filterList.map((p) => <PhonebookEntry entryData={p} key={p.id} deletePerson={props.deletePerson} /> )

  return (
    <div className='phonebook-directory-wrapper'>
      <h2>Numbers</h2>
      <div>{phonebookContent()}</div>
    </div>

  )
}

export default PhonebookDirectory