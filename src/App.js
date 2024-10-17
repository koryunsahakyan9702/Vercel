import { useDispatch, useSelector } from "react-redux";
import "./App.scss"
import { useEffect, useState } from "react";
import { fetchMovie } from "./redux/MovieSlice";
import MoviesCarousel from "./components/MoviesCarousel/MoviesCarousel";
import Menu from "./components/Menu/Menu";
function App() {
  const dispatch=useDispatch()
  const data=useSelector(state=>state.movies)
  useEffect(()=>{
    dispatch(fetchMovie())
  },[])
  return (
    <div className="App">
      <div className="container">
        <div className="top_cont">
          <Menu/>
        </div>
        <div className="carousel">
          <MoviesCarousel/>
        </div>
      </div>
    </div>
  );
}

export default App;
