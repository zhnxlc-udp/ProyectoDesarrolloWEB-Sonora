export function Library(){
    return (
        <main className="pagina-central">
            <section className="columna-principal">
                <h2>Biblioteca | Mis favoritos</h2>
                <p id="mensaje-favoritos"></p>

                <div className="galeria-portadas" id="contenedor-favoritos">
                </div>

                <hr style={{ margin: '25px 0' }} />

                <h2>Mis Playlists</h2>
                <form id="form-playlist" style={{ marginBottom: '15px' }} noValidate>
                    <label htmlFor="nombre-playlist">Nueva Playlist:</label>
                    <input type="text" id="nombre-playlist" placeholder="Ej: Rock para estudiar" required minLength={3} />
                    
                    <p id="error-playlist" style={{ color: 'red', display: 'none', fontSize: '0.9em', marginTop: '5px', marginBottom: '10px' }}>
                        Debes ingresar un nombre válido (mínimo 3 caracteres) para crear tu playlist.
                    </p>
                    
                    <button type="submit">Crear Playlist</button>
                </form>

                <p id="mensaje-playlist"></p>

                <div id="contenedor-playlists">
                </div>
            </section>

            <aside className="barra-lateral">
                <h3>Cola de reproducción</h3>
                <ul id="lista-cola">
                    <li>La cola está vacía.</li>
                </ul>

                <hr />

                <h3>Actividad reciente</h3>
                <ul id="lista-historial">
                    <li>Sin reproducciones recientes.</li>
                </ul>
            </aside>
        </main>
    );
}