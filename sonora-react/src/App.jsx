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
  const [cancionActual, setCancionActual] = useState(null);

  return (
    <div className="contenedor-sonora">
      <Header cambiarVista={setVistaActual} />
      <Navbar cambiarVista={setVistaActual} />

      {vistaActual === 'home' && <Home setCancionActual={setCancionActual} />}
      {vistaActual === 'library' && <Library />}
      {vistaActual === 'login' && <Login />}

      <Reproductor cancionActual={cancionActual} />
    </div>
  );
}

export default App;