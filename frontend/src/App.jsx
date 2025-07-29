import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button } from '@chakra-ui/react'
import {Route, Routes} from "react-router-dom"
import {HomePage} from './pages/HomePage.jsx'
import {CreatePage} from './pages/CreatePage.jsx'
import {Navbar} from './components/Navbar.jsx'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box minH={'100vh'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
        </Routes>
      </Box>
    </>
  )
}

export default App
