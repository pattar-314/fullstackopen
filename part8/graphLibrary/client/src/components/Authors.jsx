import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR_BIRTH, GET_ALL_AUTHORS } from '../queries';
import { useState } from 'react';
import styled from 'styled-components';

const NotificationContent = styled.div`
  color: red;
  border: solid red 5px;
  padding: 1em;
`;

const Authors = ({ token }) => {
  const authorQuery = useQuery(GET_ALL_AUTHORS);
  const [editAuthorName, setEditAuthorName] = useState('');
  const [editAuthorBorn, setEditAuthorBorn] = useState('');
  const [notification, setNotification] = useState('');
  const [editAuthorBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
    refetchQueries: [GET_ALL_AUTHORS],
    onError: (error) => {
      setNotification(
        'mutation error: ',
        error.graphQLErrors.map((e) => console.log(e, '\n'))
      );
      setTimeout(() => {
        setNotification('');
      }, 3000);
    },
  });


  const editAuthor = (e) => {
    e.preventDefault();
    if (!JSON.stringify(authors).toLowerCase().includes(editAuthorName.toLowerCase())) {
      setNotification('Unknown author');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    } else {
      editAuthorBirth({
        variables: { name: editAuthorName, setBornTo: Number(editAuthorBorn) },
      });
      setEditAuthorName('');
      setEditAuthorBorn('');
    }
  };


  const authors = authorQuery.data ? authorQuery.data.allAuthors : [];


  return (
    <div>
      <h2>authors</h2>
      {notification ? (
        <NotificationContent>{notification}</NotificationContent>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ?<form onSubmit={editAuthor}>
        <h2>Update birthyear</h2>
        <select value={editAuthorName} onChange={(e) => setEditAuthorName(e.target.value)}>
          <option key='0' value={-1}>-----------</option>
          { authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        <input
          onChange={(e) => setEditAuthorBorn(Number(e.target.value))} value={editAuthorBorn} placeholder='birth year' />
        <button type='submit'>submit</button>
      </form> : <></>}
    </div>
  );
};

export default Authors;
