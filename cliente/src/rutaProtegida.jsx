import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const usuario = sessionStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/" />;
};

export default RutaProtegida;