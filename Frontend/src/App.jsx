
import './App.css'
import Navbar from './Componenets/navbar'
import Homepage from './Pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import MoviePage from './Pages/MoviePage'
import SignIn from './Pages/Signin'
import SignUp from './Pages/Signup'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import AIRecommendations from './Pages/AiRecommendation'
import SearchPage from './Pages/SearchPage'
import CategoryPage from './Pages/CategoryPage'
import GamesPage from './Pages/GamesPage'
import HelpCenter from './Pages/HelpCenter'
import Settings from './Pages/Settings'

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
    <Route path='/tv/:id' element={<MoviePage type="tv"/>}/>
    <Route path='/movies' element={<CategoryPage type="movies"/>}/>
    <Route path='/tv-shows' element={<CategoryPage type="tv-shows"/>}/>
    <Route path='/anime' element={<CategoryPage type="anime"/>}/>
    <Route path='/games' element={<GamesPage/>}/>
    <Route path='/new-popular' element={<CategoryPage type="new-popular"/>}/>
    <Route path='/upcoming' element={<CategoryPage type="upcoming"/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/ai-recommendations' element={<AIRecommendations/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/help' element={<HelpCenter/>}/>
    <Route path='/settings' element={<Settings/>}/>
  </Routes>
</div>
    </>
  )
}

export default App
