document.addEventListener("DOMContentLoaded", () => {
    const loginDiv = document.querySelector('.login');
    const sesionIniciada = localStorage.getItem('sesionIniciada') === 'true';

    // Mensaje con sesion iniciada y opción de cerrar sesión
    if (sesionIniciada && loginDiv) {
        const usuario = localStorage.getItem('usuario');
        loginDiv.innerHTML = `<p>Bienvenido, <strong>${usuario}</strong> | <a href="#" id="logout">Cerrar sesión</a></p>`;

        //Limpia las variables con los datos del usuario y recarga la página para hacer un cierre de sesión.
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.reload();
        });
    }

    const formLogin = document.getElementById('form-login');

    // Valida correo y contraseña para guardar el estado en las variables locales.
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const correo = document.getElementById('correo').value;
            const pass = document.getElementById('pass').value;

            if (correo === "usuario@udp.cl" && pass === "123456") {
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('usuario', correo.split('@')[0]);
                window.location.href = "index.html";
            } else {
                alert("Usuario/contraseña incorrectos. | Use: usuario@udp.cl / 123456");
            }
        });
    }

    //catálogo de canciones con un arreglo
    const catalogoCanciones = [
        { id: 1, titulo: "Stairway to Heaven", artista: "Led Zeppelin", genero: "Rock", duracion: "8:02", imagen:"catalogoCanciones/id1.png", archivo:"catalogoCanciones/audios/id1.mp3" },
        { id: 2, titulo: "Tren al Sur", artista: "Los Prisioneros", genero: "Rock", duracion: "3:45", imagen: "catalogoCanciones/id2.jpg", archivo: "catalogoCanciones/audios/id2.mp3" }, 
        { id: 3, titulo: "Prayer", artista: "Kendrick Lamar", genero: "Hip-Hop", duracion: "4:12", imagen: "catalogoCanciones/id3.jpg", archivo: "catalogoCanciones/audios/id3.mp3" },
        { id: 4, titulo: "Funeral", artista: "Mon Laferte", genero: "Pop", duracion: "4:28", imagen: "catalogoCanciones/id4.jpg", archivo: "catalogoCanciones/audios/id4.mp3" },
        { id: 5, titulo: "cigarette smoke", artista: "Olivia Rodrigo", genero: "Pop", duracion: "4:28", imagen: "catalogoCanciones/id5.jpeg", archivo: "catalogoCanciones/audios/id5.mp3" },
        { id: 6, titulo: "Hate to See Your Heart Break", artista: "Paramore", genero: "Pop", duracion: "4:28", imagen: "catalogoCanciones/id6.jpg", archivo: "catalogoCanciones/audios/id6.mp3" },
        { id: 7, titulo: "purple (happy version)", artista: "Olivia Rodrigo", genero: "Pop", duracion: "4:28", imagen: "catalogoCanciones/id5.jpeg", archivo: "catalogoCanciones/audios/id71.mp3" },
        { id: 8, titulo: "Thinking Of You", artista: "Katy Perry", genero: "Pop", duracion: "4:28", imagen: "catalogoCanciones/id8.jpg", archivo: "catalogoCanciones/audios/id8.mp3" }
    ];

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
                    <button type="button" class="btn-cola" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" title="Añadir a la cola">+ Cola</button>
                    <button type="button" class="btn-favorito" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" title="Añadir a favoritos">+ Favoritos</button>
                    <button type="button" class="btn-add-playlist" data-titulo="${cancion.titulo}" data-artista="${cancion.artista}" title="Añadir a playlist">+ Playlist</button>
                </div>
            `;
            contenedorCatalogo.appendChild(article);

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
        });
    }

    // Funciones para la cola de reproducción
    let cola = JSON.parse(localStorage.getItem('colaReproduccion')) ?? [];
    let audioActual = new Audio();
    let indiceCancionActual = -1;
    const listaCola = document.getElementById('lista-cola');

    //renderizar la cola en html.
    function mostrarCola(){
        if (!listaCola) return;
        listaCola.innerHTML = '';
        if (cola.length === 0) {
            listaCola.innerHTML= '<li>No hay canciones en la cola.</li>';
            return;
        }
        cola.forEach((item, indice) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${indice + 1}. ${item.titulo} - ${item.artista} 
                <button type="button" class="btn-eliminar-cola" data-index="${indice}">X</button>
                `;
            listaCola.appendChild(li);
        });
    }

    //reproducir canción y mostrar el nombre en la barra de reproducción
    function reproducirCancion (titulo, artista, archivo) {
        const textoReproductor = document.getElementById('texto-reproductor');
        if (textoReproductor) {
            textoReproductor.innerHTML = `<strong>${titulo}</strong> - ${artista}`;
        }

        audioActual.src = archivo;
        audioActual.play();

        const btnPlay = document.getElementById('btn-play');
        if (btnPlay) {btnPlay.textContent = '⏸';}

        indiceCancionActual = catalogoCanciones.findIndex(c => c.archivo === archivo);
    }

    //agregar canciones a la cola
    function agregarACola (titulo, artista) {
        cola.push({ titulo, artista });
        localStorage.setItem('colaReproduccion', JSON.stringify(cola));
        mostrarCola();
    }

    //eliminar canciones de la cola
    function eliminarDeCola(indice) {
        cola.splice(indice, 1); 
        localStorage.setItem('colaReproduccion', JSON.stringify(cola));
        mostrarCola();
    }

    mostrarCola();

    //Escucha los clicks a los botones para hacer el evento correspondiente.
    document.addEventListener('click', (e) => {
        const titulo = e.target.getAttribute('data-titulo');
        const artista = e.target.getAttribute('data-artista');

        //reproducir 
        if (e.target.classList.contains('btn-reproducir')) {
            const archivo = e.target.getAttribute('data-archivo');
            reproducirCancion(titulo, artista, archivo);
        }

        //agregar a cola
        if (e.target.classList.contains('btn-cola')) {agregarACola(titulo, artista);}
        
        //eliminar de cola
        if (e.target.classList.contains('btn-eliminar-cola')) {
            const indice = e.target.getAttribute('data-index');
            eliminarDeCola(indice);
        }

        //botón de play/pausa
        if (e.target.id === 'btn-play') {
            if (audioActual.src) { 
                if (audioActual.paused) {
                    audioActual.play();
                    e.target.textContent = '⏸';
                } else {
                    audioActual.pause();
                    e.target.textContent = '▶';
                }
            } else {
                alert('No tienes nada para reproducir. Selecciona una canción del catálogo para poder reproducirla.');
            }
        }

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
                if (typeof mostrarPlaylists === 'function') mostrarPlaylists();} 
                else {alert("Selección inválida o cancelada.");}
        }
        
        //boton siguiente canción
        if (e.target.id === 'btn-next' && indiceCancionActual !== -1) {
            let sig = indiceCancionActual + 1 >= catalogoCanciones.length ? 0 : indiceCancionActual + 1;
            reproducirCancion(catalogoCanciones[sig].titulo, catalogoCanciones[sig].artista, catalogoCanciones[sig].archivo);
        }

        //boton cancion anterior
        if (e.target.id === 'btn-prev' && indiceCancionActual !== -1) {
            let prev = indiceCancionActual - 1 < 0 ? catalogoCanciones.length - 1 : indiceCancionActual - 1;
            reproducirCancion(catalogoCanciones[prev].titulo, catalogoCanciones[prev].artista, catalogoCanciones[prev].archivo);
        }

        //agregar a favoritos
        if (e.target.classList.contains('btn-favorito')) {
            let favoritos = JSON.parse(localStorage.getItem('favoritosUsuario')) ?? [];
            const titulo = e.target.getAttribute('data-titulo');
            const artista = e.target.getAttribute('data-artista');
            
            if (!favoritos.some(f => f.titulo === titulo)) {
                favoritos.push({ titulo, artista });
                localStorage.setItem('favoritosUsuario', JSON.stringify(favoritos));
                alert(`"${titulo}" añadida a favoritos.`);
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

    // PLAYLISTS
    let playlists = JSON.parse(localStorage.getItem('playlistsUsuario')) ?? [];
    const formPlaylist = document.getElementById('form-playlist');
    const contenedorPlaylists = document.getElementById('contenedor-playlists');
    const errorPlaylist = document.getElementById('error-playlist');

    function mostrarPlaylists() {
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
    mostrarFavoritos();
});