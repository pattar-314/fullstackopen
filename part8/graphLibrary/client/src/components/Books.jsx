import { useLazyQuery } from "@apollo/client";
import { BY_GENRE } from "../queries";
import styled from "styled-components";
import { useEffect, useState } from "react";

const GenreList = styled.div`
  display: flex;
`;

const Books = ({ books }) => {

  // const byGenre = useQuery(BY_GENRE)
  const [genreBookQuery, result] = useLazyQuery(BY_GENRE);

  const [selectedBooks, setSelectedBooks] = useState(books)
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if(books.length > 1){
      console.log('there were books: ', books)
      setSelectedBooks(books)
    }

/*     if(byGenre.data){
      console.log('result data: ', byGenre.data)
      setSelectedBooks(genreRequest.data.allBooks)
    }else if(selectedGenre){
      genreRequest()
    } */

  }, [books, selectedGenre])


  useEffect(() => {
    if(result.data){
      const bookData = result.data.allBooks
      console.log('book data: ', bookData)
      setSelectedBooks(bookData)
    }
  }, [result.data])

  
  if (books < 1) {
    return <div>loading...</div>;
  }

  if(result.loading){
    console.log('loading result: ', result)
  }

  const genreStepOne = new Set(
    selectedBooks.reduce(
      (accumulator, current) => accumulator.concat(current.genres),
      []
    )
  );


/*   const genreRequest = async () => {
    const filteredBooks = byGenre({ variables: { genre: selectedGenre}})
    console.log('filter test: ', filteredBooks)
  }
   */

  const sendQuery = (queryData) => {
    console.log('sending query:', queryData)
    setSelectedGenre(queryData)
    genreBookQuery({variables: {genre: queryData}})
  }

  console.log('stepOne: ', genreStepOne)

  const genreArray = [...genreStepOne];

  const genreButtons = genreArray.map((b) => (
    <button key={b} onClick={() => sendQuery(b)}>
      {b}
    </button>
  ))

  const clearFilter = () => {
    setSelectedBooks(books)
    setSelectedGenre(null)
  }



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {selectedBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedGenre ? <button onClick={clearFilter}>clear filter</button> : <GenreList>{genreButtons}</GenreList>}
    </div>
  );
};

export default Books;
//{genreList}
