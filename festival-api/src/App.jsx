import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FestivalManager from './components/FestivalManager';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FestivalManager/>
     </>
  )
}

export default App
