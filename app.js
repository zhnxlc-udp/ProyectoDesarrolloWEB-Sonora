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
                    <button type="button" title="Añadir a favoritos">+ Favoritos</button>
                </div>
            `;
            contenedorCatalogo.appendChild(article);
        });
    }

    // Funciones para la cola de reproducción
    let cola = JSON.parse(localStorage.getItem('colaReproduccion')) ?? [];
    let audioActual = new Audio();
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

        if (e.target.classList.contains('btn-reproducir')) {
            const archivo = e.target.getAttribute('data-archivo');
            reproducirCancion(titulo, artista, archivo);
        }
        if (e.target.classList.contains('btn-cola')) {agregarACola(titulo, artista);}
        if (e.target.classList.contains('btn-eliminar-cola')) {
            const indice = e.target.getAttribute('data-index');
            eliminarDeCola(indice);
        }
    });

});