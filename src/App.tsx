import { Routes, Route } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import './App.css'
import Greeting from './Pages/Greeting'
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import PasswordGeneratorForm from './Pages/Admin';
import { User } from './Pages/User';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Greeting/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/admin" element={<PasswordGeneratorForm/>}/>
        <Route path="/user" element= {<User/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
