import { Routes, Route } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import './App.css'
import Greeting from './Pages/Greeting'
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import PasswordGeneratorForm from './Pages/Admin';
import { User } from './Pages/User';
import PasswordRecovery from './Pages/PasswordRecovery';
import { ProtectedRoute } from './Pages/ProtectedRoute';
import CodeInput from './Pages/CodeInput';
import NewPassword from './Pages/NewPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Greeting/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/admin" element={<ProtectedRoute><PasswordGeneratorForm/></ProtectedRoute>}/>
        <Route path="/user" element= {<User/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path='/passwordrecovery' element={<PasswordRecovery/>}/>
        <Route path='/code-check' element={<CodeInput/>} />
        <Route path='/new-password' element={<NewPassword/>}/>
      </Routes>
    </>
  )
}

export default App
