import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { NavLink,Routes,Route } from "react-router-dom";
import Login from './Pages/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      
    </>
    
  )

}

export default App
