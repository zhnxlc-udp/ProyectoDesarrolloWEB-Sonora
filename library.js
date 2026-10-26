// PLAYLISTS
let playlists = JSON.parse(localStorage.getItem('playlistsUsuario')) ?? [];

function mostrarPlaylists() {
    const contenedorPlaylists = document.getElementById('contenedor-playlists');
    if (!contenedorPlaylists) return;
    contenedorPlaylists.innerHTML = playlists.length === 0 ? '<p>No tienes playlists aún.</p>' : '';

    playlists.forEach((lista, pIndex) => {
        let cancionesHTML = lista.canciones && lista.canciones.length > 0 
            ? lista.canciones.map((c, cIndex) => `<li>${c.titulo} <button class="btn-quitar-cancion" data-playlist="${pIndex}" data-cancion="${cIndex}">Quitar</button></li>`).join('')
            : '<li>Vacía</li>';

        contenedorPlaylists.innerHTML += `
            <article style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <h3>${lista.nombre} <button class="btn-eliminar-playlist" data-index="${pIndex}">Borrar Lista</button></h3>
                <ul>${cancionesHTML}</ul>
            </article>
        `;
    });
}

function mostrarFavoritos() {
    const contenedorFavs = document.getElementById('contenedor-favoritos');
    if (!contenedorFavs) return;
    let favs = JSON.parse(localStorage.getItem('favoritosUsuario')) ?? [];
    contenedorFavs.innerHTML = favs.length === 0 ? '<p>No hay favoritos aún.</p>' : '';
    favs.forEach((fav, index) => {
        contenedorFavs.innerHTML += `
            <article style="border: 1px solid #ddd; padding: 5px; text-align: center; border-radius: 8px; width: 140px;">
                <p><strong>${fav.titulo}</strong><br>por ${fav.artista}</p>
                <button type="button" class="btn-quitar-fav" data-index="${index}" style="margin-top: 5px; padding: 2px 5px; cursor:pointer;">Quitar</button>
            </article>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const formPlaylist = document.getElementById('form-playlist');
    const errorPlaylist = document.getElementById('error-playlist');

    if (formPlaylist) {
        formPlaylist.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputNombre = document.getElementById('nombre-playlist');
            if (inputNombre.value.trim().length < 3) {
                errorPlaylist.style.display = 'block';
            } else {
                errorPlaylist.style.display = 'none';
                playlists.push({ nombre: inputNombre.value.trim(), canciones: [] });
                localStorage.setItem('playlistsUsuario', JSON.stringify(playlists));
                mostrarPlaylists();
                formPlaylist.reset();
            }
        });
    }
    
    mostrarPlaylists();
    mostrarFavoritos();
});

//Escucha los clicks a los botones para hacer el evento correspondiente.
document.addEventListener('click', (e) => {
    const titulo = e.target.getAttribute('data-titulo');
    const artista = e.target.getAttribute('data-artista');

    //eliminar playlist completa
    if (e.target.classList.contains('btn-eliminar-playlist')) {
        const index = e.target.getAttribute('data-index');
        playlists.splice(index, 1);
        localStorage.setItem('playlistsUsuario', JSON.stringify(playlists));
        mostrarPlaylists();
    }

    //quitar cancion especifica de la playlist
    if (e.target.classList.contains('btn-quitar-cancion')) {
        const pIndex = e.target.getAttribute('data-playlist');
        const cIndex = e.target.getAttribute('data-cancion');
        playlists[pIndex].canciones.splice(cIndex, 1);
        localStorage.setItem('playlistsUsuario', JSON.stringify(playlists));
        mostrarPlaylists();
    }

    //agregar canción a playlist existente
    if (e.target.classList.contains('btn-add-playlist')) {
        if (playlists.length === 0) return alert("Crea una playlist en la Biblioteca primero.");
        
        const listaOpciones = playlists.map((p, i) => `${i + 1}: ${p.nombre}`).join('\n');
        const seleccion = prompt(`Ingresa el número de la playlist destino:\n${listaOpciones}`);
        
        if (seleccion && playlists[seleccion - 1]) {
            playlists[seleccion - 1].canciones.push({ titulo, artista });
            localStorage.setItem('playlistsUsuario', JSON.stringify(playlists));
            alert(`Canción agregada a "${playlists[seleccion - 1].nombre}"`);
            mostrarPlaylists();
        } else {
            alert("Selección inválida o cancelada.");
        }
    }

    //agregar a favoritos
    if (e.target.classList.contains('btn-favorito')) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosUsuario')) ?? [];
        
        if (!favoritos.some(f => f.titulo === titulo)) {
            favoritos.push({ titulo, artista });
            localStorage.setItem('favoritosUsuario', JSON.stringify(favoritos));
            alert(`"${titulo}" añadida a favoritos.`);
            mostrarFavoritos(); //Actualiza visualmente en tiempo real si estás en la biblioteca
        } else {
            alert('Ya está en favoritos.');
        }
    }

    //eliminar de favoritos
    if (e.target.classList.contains('btn-quitar-fav')) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosUsuario')) ?? [];
        favoritos.splice(e.target.getAttribute('data-index'), 1);
        localStorage.setItem('favoritosUsuario', JSON.stringify(favoritos));
        mostrarFavoritos();
    }
});