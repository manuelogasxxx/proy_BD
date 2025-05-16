import React from 'react';
import { NavigationBar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const Layout=()=> {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export const Layout1=()=> {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}