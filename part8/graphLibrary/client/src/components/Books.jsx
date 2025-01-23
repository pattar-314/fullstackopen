import { useQuery } from '@apollo/client'
import { GET_ALL_BOOKS } from '../queries'

const Books = () => {

  const bookQuery = useQuery(GET_ALL_BOOKS)



console.log('book query: ', bookQuery)

  if(bookQuery.loading){
    return (
      <div>loading....</div>
    )
  }

  const books = [...bookQuery.data.allBooks]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
