import {BrowserRouter,Routes,Route} from 'react-router-dom'

import {Formulario} from './componentes/crearUsuario'
import {Login} from './componentes/login1'
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login />}/>
        <Route path="/registro" element={< Formulario />}/>  
      </Routes>
    </BrowserRouter>
  )
}