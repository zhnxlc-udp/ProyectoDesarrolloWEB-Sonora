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
        { id: 1, titulo: "Stairway to Heaven", artista: "Led Zeppelin", genero: "Rock", duracion: "8:02", imagen:"id1.png" },
        { id: 2, titulo: "Tren al Sur", artista: "Los Prisioneros", genero: "Rock", duracion: "3:45", imagen: "id2.jpg"}, 
        { id: 3, titulo: "Prayer", artista: "Kendrick Lamar", genero: "Hip-Hop", duracion: "4:12", imagen: "id3.jpg"},
        { id: 4, titulo: "Funeral", artista: "Mon Laferte", genero: "Pop", duracion: "4:28", imagen: "id4.jpg"}
    ];
});