import ReactDOM from 'react-dom/client'
import App from './App'
import ContextProvider from './components/ContextProvider'



ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ContextProvider>
      <App />
    </ContextProvider>
)