import { useState } from 'react'
import './App.css'
import MyNav from './comp/MyNav'
import Home from './view/home'
import Shop from './view/shop'
import Cart from './view/cart'
import BikeInfo from './view/bike'
import { Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
    <MyNav/>
       <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/shop' element={<Shop/>} />
        <Route path='/bike' element={<BikeInfo />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
       </div>
    </>
  )
}

export default App
