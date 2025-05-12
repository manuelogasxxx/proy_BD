import React from "react"
import {AppBar, Toolbar} from "@mui/material"
import { Link } from "react-router-dom"
import { NavigationBar } from "./Navbar"

export const Instituciones=()=>{
    return(
    <div>
        
        <header>
            <Link to="instituciones">Home</Link>
            <Link to ="crearInstitucion">CrearInstitucion</Link>  
        </header>
        <div>
            jijija
        </div>
    </div> 
    )
}