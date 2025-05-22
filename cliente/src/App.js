import {BrowserRouter,Routes,Route} from 'react-router-dom'
import RutaProtegida from './rutaProtegida'
import {Formulario} from './componentes/crearUsuario'
import { FormularioInstitucion } from './componentes/crearInstitucion'
import { VerUsuario } from './componentes/actUsuario'
import {Login} from './componentes/login1'
import { Instituciones } from './componentes/instituciones'
import { Layout,Layout1 } from './componentes/layout'
import { NavigationBar } from './componentes/Navbar'
import { Materias } from './componentes/materias'
import { CrearMaterias } from './componentes/crearMateria'
import { Alumnos,CrearAlumno } from './componentes/alumnos'
import { Asistencias } from './componentes/alumnosAsistencias'
import { VerSesiones,VerAsistencias } from './componentes/verSesiones'

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
          <Route path="Usuario"  element={<VerUsuario/>}/>
          <Route path="crearInstitucion" element={<FormularioInstitucion/>}/>
          <Route path="materias" element={
            <RutaProtegida>
              < Layout1/>
            </RutaProtegida>
          }>
            <Route index element ={<Materias/>}/>
            <Route path= "crearMaterias" element={<CrearMaterias/>}/>
            <Route path="alumnos" element={
              <RutaProtegida>
                < Layout1/>
              </RutaProtegida>
            }>
                <Route index element={<Alumnos/>}/>
                <Route path="crearAlumno" element={<CrearAlumno/>}/>
                <Route path="asistencias" element={<Asistencias/>}/>
                <Route path="verSesiones" element={<VerSesiones/>}/>
                <Route path="verAsistencias" element={<VerAsistencias/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}