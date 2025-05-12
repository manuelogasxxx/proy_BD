import {BrowserRouter,Routes,Route} from 'react-router-dom'
import RutaProtegida from './rutaProtegida'
import {Formulario} from './componentes/crearUsuario'
import { FormularioInstitucion } from './componentes/crearInstitucion'
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
        <Route path="/inicio" element={
          <RutaProtegida>
            < Layout/>
          </RutaProtegida>
          }>
          <Route index element={<Instituciones/>}/>
          <Route path="instituciones" element={<Instituciones/>}/>
          <Route path="pruebita"  element={<Formulario/>}/>
          <Route path="crearInstitucion" element={<FormularioInstitucion/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}