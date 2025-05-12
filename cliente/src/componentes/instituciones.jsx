import React from "react"
import {AppBar, Toolbar} from "@mui/material"
import { Link } from "react-router-dom"
import { NavigationBar } from "./Navbar"

export const Instituciones=()=>{
    return(
    <div>
        
        <header>
            <Link to="/inicio">Home</Link>
            <Link >info Usuaurio</Link>
            <button> LogOut</button>
        </header>
    </div> 
          
    )
}