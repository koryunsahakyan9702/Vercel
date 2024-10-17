import "./Featured.scss"
import React, { useEffect, useState } from 'react'
import { IoMdPlay } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Featured({movie}) {
  let play=useSelector(state=>state.movies.play)
  let show=useSelector(state=>state.movies.showVideo)

  const [videoPlay,setVideoPlay]=useState(false)
  let backgroundImage=`url(${movie.CoverImage})`
  useEffect(()=>{
    setVideoPlay(false)
    if(play){
      setTimeout(()=>{
      setVideoPlay(true)
      },2000)
    }
  },[show])
  console.log(play)
  return (
    <div className="Featured"

    >
    {!videoPlay?(<div className="videoCont" 
    style={{backgroundImage,backgroundSize: 'cover',}}>
      
    </div>):<video className="video"
          src={movie.VideoUrl}
          autoPlay
          loop
          muted>
      </video>}

        <div className="about_movie">
        <div className="category">{movie.Category}</div>
        <div className="imgTit"><img src={movie.TitleImage} /></div>
        <div className="about"><span>{movie.ReleaseYear} </span><span>{movie.MpaRating}</span> 
        <span>{movie.Duration/60}h {movie.Duration%60>0?movie.Duration%60>0:""}</span></div>
        <div className="desc">{movie.Description}</div>
        <div className="buttons">
            <div className="play_butt"><IoMdPlay />Play</div>
            <div className="info_butt">More Info</div>
        </div>
        </div>
    </div>
  )
}
