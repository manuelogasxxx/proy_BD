import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './componentes/login'
import {Formulario} from './componentes/prueba'
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Formulario />}/> 
      </Routes>
    </BrowserRouter>
  )
}