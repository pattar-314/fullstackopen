import axios from "axios"

export const populateDb = async () => {
    const populateRequest = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).catch((err) => console.log('an error occoured: ', err))
    const testPopulate = () => {
        console.log('testing: ', populateRequest.data)
        axios.post('http://localhost:3001/countries', populateRequest.data)
    }
    testPopulate()
    console.log('populate request: ', populateRequest.data)
    return populateRequest
}