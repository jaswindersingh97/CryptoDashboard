import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Dashboard/>}/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
