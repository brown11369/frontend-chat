import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Chat from "./Pages/Chat"
import SetAvatar from './Pages/SetAvatar'
import Error from './Pages/Error'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setavatar' element={<SetAvatar />} />
          <Route path='/' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
