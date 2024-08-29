
import phonebookServices from "./services/phonebookServices";
import { useEffect, useState } from "react";
import { SearchFilter } from "./components/SearchFilter";
import { PhonebookForm } from "./components/PhonebookForm";
import PhonebookDirectory from "./components/PhonebookDirectory";
import "./index.css";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState(null);

  useEffect(() => {
    phonebookServices
      .readAllPersons()
      .then((response) => {
        setPersons(response);
      })
      .catch((err) =>
        handleMessage(`error getting initial data  ${err}`, "failure")
      );
  }, []);





  const handleSubmit = (e) => {
    e.preventDefault();
    // make sure neither field is empty
    if (newName === "" || newNumber === "") {
      console.log("needed info not provided");
      handleMessage("please enter all needed information", "failure");
      return null;
    }

    const personInfo = { name: newName, number: newNumber };

    phonebookServices.createPerson(personInfo).then(response => {
      console.log('test 10: ', response)
        // it is concating changed when update instead of just on new person
        if(persons.find(f => f.name === personInfo.name)){
          console.log('duplicate found updating: ', personInfo.name)
          setPersons(persons.map(p => p.name === response.name ? response : p))
          console.log('updated')
        } else { 
          console.log('no duplicates found adding new entry: ', response)
          setPersons(persons.concat(response))
          console.log('entry added')
        }
      })
      .catch((err) => handleMessage(`error creating person ${personInfo.name}`, "failure"))

    console.log("resetting form");
    setNewName("");
    setNewNumber("");
  }

  const handleMessage = (content, status) => {
    setMessage(content);
    setMessageStatus(status);
    setTimeout(() => {
      setMessage(null);
      setMessageStatus(null);
    }, 5000);
  };

  const deletePerson = async (id) => {
    const deleted = await phonebookServices
      .deletePerson(id)
      .catch(() =>
        handleMessage(`error deleting person with id ${id}`, "failure")
      );
    console.log("deleted: ", deleted);
    const newList = persons.filter((e) => e.id !== id);
    console.log("new list: ", newList);
    setPersons(newList);
    deleted !== undefined
      ? handleMessage(`person with id ${id} deleted`, "success")
      : null;
  };

  
  const filterList = persons.filter(
    
    (fb) =>
      fb.name.toLowerCase().includes(filterInput.toLowerCase()) ||
      fb.number.includes(filterInput)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Message content={message} status={messageStatus} />
      <SearchFilter filterInput={filterInput} setFilterInput={setFilterInput} />
      <PhonebookForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <PhonebookDirectory filterList={filterList} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
