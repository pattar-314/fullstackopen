
import './App.css'
import { store } from './main'

function App() {


  return (
    <>
      <div>{store.getState()}</div>
      <button onClick={e => store.dispatch({type: 'INCREMENT'})}>plus</button>
      <button onClick={e => store.dispatch({type: 'DECREMENT'})}>minus</button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>zero</button>
    </>
  )
}

export default App
