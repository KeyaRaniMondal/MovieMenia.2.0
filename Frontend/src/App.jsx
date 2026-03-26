
import './App.css'
import Navbar from './Componenets/navbar'
import Homepage from './Pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import MoviePage from './Pages/MoviePage'
import SignIn from './Pages/Signin'
import SignUp from './Pages/Signup'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

function App() {
 const {fetchUser,fetchingUser}=useAuthStore()
useEffect(()=>{
  fetchUser()
},[fetchUser])

if(fetchingUser){
  return <p>Loading..........</p>
}


  return (
    <>
<div>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='/movie/:id' element={<MoviePage/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
  </Routes>
</div>
    </>
  )
}

export default App
