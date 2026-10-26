// Funciones para la cola de reproducción
let cola = JSON.parse(localStorage.getItem('colaReproduccion')) ?? [];
let audioActual = new Audio();
let indiceCancionActual = -1;

//HISTORIAL DE REPRODUCCION
let historial = JSON.parse(localStorage.getItem('historialUsuario')) ?? [];

//renderizar la cola en html.
function mostrarCola(){
    const listaCola = document.getElementById('lista-cola');
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

function mostrarHistorial() {
    const listaHistorial = document.getElementById('lista-historial');
    if (!listaHistorial) return;
    listaHistorial.innerHTML = '';
    if (historial.length === 0) {
        listaHistorial.innerHTML = '<li>Sin reproducciones recientes.</li>';
        return;
    }
    historial.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = ` ${item.titulo} - ${item.artista}`;
        listaHistorial.appendChild(li);
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

    historial.unshift({ titulo, artista }); // Lo pone de primero
    if (historial.length > 10) historial.pop(); // Borra el más viejo si hay más de 10
    localStorage.setItem('historialUsuario', JSON.stringify(historial));
    mostrarHistorial();
}

//agregar canciones a la cola
function agregarACola (titulo, artista, archivo) {
    cola.push({ titulo, artista, archivo });
    localStorage.setItem('colaReproduccion', JSON.stringify(cola));
    mostrarCola();
}

//eliminar canciones de la cola
function eliminarDeCola(indice) {
    cola.splice(indice, 1); 
    localStorage.setItem('colaReproduccion', JSON.stringify(cola));
    mostrarCola();
}

document.addEventListener("DOMContentLoaded", () => {
    audioActual.addEventListener('ended', () => {
        if (cola.length > 0) {
            const siguiente = cola.shift(); // Saca la primera canción y la borra de la lista
            localStorage.setItem('colaReproduccion', JSON.stringify(cola));
            mostrarCola();
            reproducirCancion(siguiente.titulo, siguiente.artista, siguiente.archivo);
        } else {
            const textoReproductor = document.getElementById('texto-reproductor');
            if (textoReproductor) textoReproductor.innerHTML = '<strong>Fin de la cola</strong> - Seleccione pista';
            const btnPlay = document.getElementById('btn-play');
            if (btnPlay) btnPlay.textContent = '▶';
        }
    });

    mostrarCola();
    mostrarHistorial();
});

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
    if (e.target.classList.contains('btn-cola')) {
        const archivo = e.target.getAttribute('data-archivo');
        agregarACola(titulo, artista, archivo);
    }
    
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

    //boton siguiente canción que verifica primero la cola (si tiene canciones sigue con la cola) y luego reproduce el resto del catálogo
    if (e.target.id === 'btn-next') {
        if (cola.length > 0) {
            const siguiente = cola.shift();
            localStorage.setItem('colaReproduccion', JSON.stringify(cola));
            mostrarCola();
            reproducirCancion(siguiente.titulo, siguiente.artista, siguiente.archivo);
        } else if (typeof indiceCancionActual !== 'undefined' && indiceCancionActual !== -1) {
            let sig = indiceCancionActual + 1 >= catalogoCanciones.length ? 0 : indiceCancionActual + 1;
            reproducirCancion(catalogoCanciones[sig].titulo, catalogoCanciones[sig].artista, catalogoCanciones[sig].archivo);
        } else {
            alert('Selecciona una pista primero.');
        }
    }

    //boton cancion anterior
    if (e.target.id === 'btn-prev' && indiceCancionActual !== -1) {
        let prev = indiceCancionActual - 1 < 0 ? catalogoCanciones.length - 1 : indiceCancionActual - 1;
        reproducirCancion(catalogoCanciones[prev].titulo, catalogoCanciones[prev].artista, catalogoCanciones[prev].archivo);
    }
});
