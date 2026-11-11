import { Sidebar } from './Sidebar';

export function Home() {
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
                <article>
                <h3>TOP 1:</h3>
                <img src="/placeholder.jpg" alt="Top 1" width="100" />
                <p><strong>CANCIÓN GENÉRICA</strong><br/>por ARTISTA</p>
                <div className="controles-cancion">
                    <button type="button" title="Reproducir ahora">▶</button>
                    <button type="button" title="Añadir a la cola">+ Cola</button>
                    <button type="button" title="Añadir a favoritos">+ Favoritos</button>
                </div>
                </article>
            </div>
        </section>

        <Sidebar />
        </main>
    );

}