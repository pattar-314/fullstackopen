import { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes, useMatch, useNavigate,  } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const SingleAnecdote = ({anecdote}) => {
  return (
    <div>
      <div><h2>{anecdote.content}</h2></div>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see {anecdote.info}</div>
    </div>
    
  )
}

const AnecdoteList = ({ anecdotes }) => {
  console.log('test 1: ', anecdotes)
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`} key={anecdote.id}>{anecdote.content}</Link></li> )}
    </ul>
  </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const navigate = useNavigate()


  const handleSubmit = (e) => {
    console.log('submitting')
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

    props.handleNotification(`you have added anecdote ${content}`)
    navigate('/')
  }


  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const Notification = (props) => {
  console.log('notification props: ', props)
  return (
    <div style={{ padding: '1em'}}>{props.notificationContent ? <div><h2>{props.notificationContent}</h2></div> : <></>}</div>
  )
}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    console.log('addnew: ', anecdote)
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log('test 2')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const handleNotification = (notificationContent) => {
    setNotification(notificationContent)
    console.log('notification content: ', notification)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification ? <Notification notificationContent={notification} />: <></>}
        <Routes>
          <Route path='/anecdotes/:id' element={<SingleAnecdote anecdote={anecdote} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} handleNotification={handleNotification} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} handleNotification={handleNotification} vote={vote} />} />
        </Routes>
        <Footer />
      </div>

  )
}

export default App
