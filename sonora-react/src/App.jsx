import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Navbar } from './components/Nav';
import { Home } from './components/Home';
import { Library } from './components/Library';
import { Login } from './components/Login';
import { Reproductor } from './components/Reproductor';

function App() {
  const [vistaActual, setVistaActual] = useState('home');
  return (
    <div className="contenedor-sonora">
      <Header cambiarVista={setVistaActual} />
      <Navbar cambiarVista={setVistaActual} />
      {vistaActual === 'home' && <Home />}
      {vistaActual === 'library' && <Library />}
      {vistaActual === 'login' && <Login />}
      <Reproductor />
    </div>
  );
}

export default App;