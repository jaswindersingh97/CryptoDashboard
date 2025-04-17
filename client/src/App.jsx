import React from 'react'
import Home from './pages/Home'
import BiaxialGraph from './components/BiaxialGraph/BiaxialGraph'
import StickyHeadTable from './components/CoinsList/CoinsList'
 
function App() {
  return (
    <div style={{width:"1000px", height:"400px"}}>
    <StickyHeadTable/>
    </div>
  )
}

export default App
