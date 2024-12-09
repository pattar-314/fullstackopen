const mongoose = require('mongoose')
const Person = require('./models/Person')

const connectionUri = `mongodb+srv://test:${process.argv[2]}@fullstackopen.ao2tqbe.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstackopen`
mongoose.connect(connectionUri)

console.log(`argument length ${process.argv.length}`)

if(process.argv.length === 3){
  const persons = Person.find({}).then(response => {
    console.log(response)
    return response
  })}else if(process.argv.length === 5){
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  const saved = newPerson.save().then(response => {
    mongoose.connection.close()
    console.log(`added ${process.argv[3]} number ${process.argv[4]}`)
    return response
  })
} else {
  console.log('wrong amount of arguments')
  return null
}
return null