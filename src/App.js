import React from 'react'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App
