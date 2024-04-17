
const PhonebookEntry = ({entryData, deletePerson}) => {

  return (
    <div className="phonebook-entry">
      <div key={entryData.name}>
        {entryData.name} {entryData.number} <button onClick={() => deletePerson(entryData.id)}>delete</button>
      </div>
    </div>
  )
}

export default PhonebookEntry