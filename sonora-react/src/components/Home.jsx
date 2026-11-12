import { Sidebar } from './Sidebar';
import { catalogoCanciones } from '../data';

export function Home({ setCancionActual }) {
  return (
    <main className="pagina-central">
        <section className="columna-principal">
            
            {/* BARRA DE BÚSQUEDA */}
            <div className="barra-busqueda">
                <p>
                    <label htmlFor="input-busqueda"><h3>Buscador:</h3></label>
                    <input type="text" id="input-busqueda" placeholder="Busca tus canciones, artistas o géneros:" />
                </p>
            </div>
        
            {/* TOP CANCIONES */}
            <h2>☆ LO + NUEVO: ☆</h2>
            <p id="mensaje-catalogo"></p>

            <div className="galeria-portadas" id="contenedor-catálogo">
            {catalogoCanciones.map((cancion, index) => (
                <article key={cancion.id}>
                    <h3>TOP {index + 1}:</h3>
                    <img src={cancion.imagen} alt={cancion.titulo} width="100" />
                    <p><strong>{cancion.titulo}</strong><br/>por {cancion.artista}</p>
                
                    <div className="controles-cancion">
                        <button type="button" title="Reproducir ahora" onClick={() => setCancionActual(cancion)}>▶</button>
                        <button type="button" title="Añadir a la cola">+ Cola</button>
                        <button type="button" title="Añadir a favoritos">+ Favoritos</button>
                    </div>
                </article>
            ))}
            </div>
        </section>

        <Sidebar />
        </main>
    );
}