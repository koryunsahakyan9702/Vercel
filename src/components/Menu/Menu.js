import { useDispatch, useSelector } from "react-redux"
import "./Menu.scss"
import React, { useEffect, useState } from 'react'
import { fetchFeature, showMenu } from "../../redux/MovieSlice"
import Featured from "./Featured/Featured"
import searchIcon from "../../assets/icons/ICON - Search.png"
import homeIcon from "../../assets/icons/Group 46.png"
import reelIcon from "../../assets/icons/Group 56.png"
import trIcon from "../../assets/icons/Group 54.png"
import catIcon from "../../assets/icons/Group 53.png"
import timeIcon from "../../assets/icons/Group 47.png"
export default function Menu() {
    const[active,setActive]=useState(null)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchFeature())
    },[])
    const featuredMovie=useSelector(state=>state.movies.featured)
    const show=useSelector(state=>state.movies.menuView)

  return (
    <div className="Menu" 
        
    >
        <div className={`icons_menu ${show?"full":""}`} 
            onMouseEnter={()=>{
                dispatch(showMenu())
            }}
            onMouseLeave={()=>{
                dispatch(showMenu())
    
            }}
        >
            <div className="icon">
                <img src={searchIcon}/><span className={show?"menu_view":"menu_none"}>Search</span>
            </div>
            <div className={`icon ${active=="1"?"active":""}`} id="1" onClick={(e)=>{
                setActive(e.currentTarget.id)
            }}>
            <img src={homeIcon}  />
            <span className={show?"menu_view":"menu_none"}>Home</span>
            </div>
            <div className={`icon ${active=="2"?"active":""}`} id="2" onClick={(e)=>{
                setActive(e.currentTarget.id)
            }}>
            <img src={reelIcon}  />
            <span className={show?"menu_view":"menu_none"}>TV Shows</span>
            </div>
            <div className={`icon ${active=="3"?"active":""}`} id="3" onClick={(e)=>{
                setActive(e.currentTarget.id)
            }}>
            <img src={trIcon}  />
            <span className={show?"menu_view":"menu_none"}>Movies</span>
            </div>
            <div className={`icon ${active=="4"?"active":""}`} id="4" onClick={(e)=>{
                setActive(e.currentTarget.id)
            }}>
            <img src={catIcon}  />
            <span className={show?"menu_view":"menu_none"}>Geners</span>
            </div>
            <div className={`icon ${active=="5"?"active":""}`} id="5" onClick={(e)=>{
                setActive(e.currentTarget.id)
            }}>
            <img src={timeIcon}  />
            <span className={show?"menu_view":"menu_none"}>Watch Later</span>
            </div>
            {show&&(
                <div className="options">
                    <span>LANGUAGE</span><span>GET HELP</span><span>EXIT</span>
                </div>
            )}
        </div>    

        <Featured movie={featuredMovie}/>
    </div>
  )
}
