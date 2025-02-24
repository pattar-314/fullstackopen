import { useQuery } from "@apollo/client"
import { BY_GENRE } from "../queries"
import { useEffect, useState } from "react"



const Recommended = () => {

  const [recommendedBooks, setRecommendedBooks] = useState([])

  useEffect(() => {
    if(!recommendedQuery.loading && result.data){
      setRecommendedBooks(result.data.allBooks)
      console.log('recommended books: ', result.data.allBooks)
    }
  }, [])

  const [recommendedQuery, result] = useQuery(BY_GENRE, {variables: {genre: window.localStorage.getItem('graphLibrary-user-info').userInfo.favoriteGenre}})

  return (
    <div>
      <div>Recommended based on your favorite genre</div>
      <table>
        <thead>
          <tr>
            <th>author</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map(b => (
            <tr key={b.author.name}>
              <td>{b.author.name}</td>
              <td>{b.title}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
    </div>
  )
}

export default Recommended