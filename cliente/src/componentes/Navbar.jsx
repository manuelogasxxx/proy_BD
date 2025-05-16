import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const NavigationBar=()=> {
    const navigate = useNavigate();
    const usuario = sessionStorage.getItem('usuario');
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <label>Bienvenido {usuario}</label>
      <div>
        <Link to="/inicio" style={{ margin: '0 10px', textDecoration: 'none' }}>Inicio</Link>
        <Link to="Usuario" style={{ margin: '0 10px', textDecoration: 'none' }}>Cuenta</Link>
        <button onClick={()=>{
            sessionStorage.clear();
            navigate('/');
        }}>LogOut</button>
      </div>
    </nav>
  );
}
