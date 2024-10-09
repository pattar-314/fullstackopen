import { useState } from "react"

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      handleLogin({username, password})
    }

    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username <input value={username} onChange={(e) => setUsername(e.target.value)} />
            password <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />              
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
}

export default LoginForm








/* import { useState } from "react"


const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({username, password})
    setUsername('')
    setPassword('')
  }

  return (
    <section className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <input className="login-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <button type="submit">submit</button>
      </form>
      <button className="cancel-button" onClick={handleCancel}>cancel</button>
    </section>
  )
}

export default LoginForm */