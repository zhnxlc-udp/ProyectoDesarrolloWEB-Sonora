document.addEventListener("DOMContentLoaded", () => {
    const contenedorCatalogo = document.getElementById('contenedor-catálogo');

    if (contenedorCatalogo) {
        contenedorCatalogo.innerHTML = ''; 

        //recorrer arreglo de canciones y crear tarjetas que se mostrarán en el catálogo de HTML.
        catalogoCanciones.forEach((cancion, index) => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>TOP ${index + 1}:</h3>
                <img src="${cancion.imagen}" alt="Top ${index + 1}" width="100">
                <p><strong>${cancion.titulo}</strong><br>por ${cancion.artista}</p>
                <div class="controles-cancion">
                    <button type="button" class="btn-reproducir" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" data-archivo="${cancion.archivo}" title="Reproducir ahora">▶</button>
                    <button type="button" class="btn-cola" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" data-archivo="${cancion.archivo}" title="Añadir a la cola">+ Cola</button>
                    <button type="button" class="btn-favorito" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" title="Añadir a favoritos">+ Favoritos</button>
                    <button type="button" class="btn-add-playlist" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" title="Añadir a playlist">+ Playlist</button>
                </div>
            `;
            contenedorCatalogo.appendChild(article);
        });

        //buscador de canciones en el catálogo funcional jeje
        const inputBusqueda = document.getElementById('input-busqueda');
        if (inputBusqueda) {
            inputBusqueda.addEventListener('input', (e) => {
                const filtro = e.target.value.toLowerCase();
                const tarjetas = contenedorCatalogo.querySelectorAll('article');
                tarjetas.forEach(tarjeta => {
                    const texto = tarjeta.innerText.toLowerCase();
                    tarjeta.style.display = texto.includes(filtro) ? '' : 'none';
                });
            });
        }
    }
});