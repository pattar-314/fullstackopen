import { gql } from '@apollo/client';

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String){
    addPerson(name: $name, phone: $phone, street: $street, city: $city){
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address{
      street
      city
      }
    }
  }
`