import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar=()=> {
    const ejemplo = sessionStorage()
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <label>Mi Aplicación</label>
      <div>
        <Link to="instituciones" style={{ margin: '0 10px', textDecoration: 'none' }}>Botón 1</Link>
        <Link to="pruebita" style={{ margin: '0 10px', textDecoration: 'none' }}>Botón 2</Link>
      </div>
    </nav>
  );
}
