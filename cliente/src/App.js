import {BrowserRouter,Routes,Route} from 'react-router-dom'

import {Formulario} from './componentes/crearUsuario'
import {Login} from './componentes/login1'
import { Instituciones } from './componentes/instituciones'
import { Layout } from './componentes/layout'
import { NavigationBar } from './componentes/Navbar'

//existen rutas normales y rutas anidadas
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login />}/> 
        <Route path="/registro" element={< Formulario />}/>
        <Route path="/inicio" element={< Layout/>}>  
          <Route path="instituciones" element={<Instituciones/>}/>
          <Route path="pruebita" element={<Formulario/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}