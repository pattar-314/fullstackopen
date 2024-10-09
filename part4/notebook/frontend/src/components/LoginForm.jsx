import { useState } from "react"


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
    </section>
  )
}

export default LoginForm