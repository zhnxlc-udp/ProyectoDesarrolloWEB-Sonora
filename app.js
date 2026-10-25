// local storage//
const catalogoInicial = [
    { id: 1, top: "TOP 1", titulo: "Tren al Sur", artista: "Los Prisioneros", genero: "Rock", imagen: "placeholder.jpg" },
    { id: 2, top: "TOP 2", titulo: "Starway to heaven", artista: "Led Zeppelin", genero: "Rock", imagen: "placeholder.jpg" },
    { id: 3, top: "TOP 3", titulo: "Tu Falta de Querer", artista: "Mon Laferte", genero: "Pop", imagen: "placeholder.jpg" },
    { id: 4, top: "TOP 4", titulo: "Prayer", artista: "Kendrick Lamar", genero: "Urbano", imagen: "placeholder.jpg" }
];

let cola = JSON.parse(localStorage.getItem("sonora_cola")) ?? [];
let historial = JSON.parse(localStorage.getItem("sonora_historial")) ?? [];
let favoritos = JSON.parse(localStorage.getItem("sonora_favoritos")) ?? [];
let playlists = JSON.parse(localStorage.getItem("sonora_playlists")) ?? [];
let estadoReproductor = JSON.parse(localStorage.getItem("sonora_reproductor")) ?? {
    cancionActual: null,
    reproduciendo: false
};

function guardarEstado() {
    localStorage.setItem("sonora_cola", JSON.stringify(cola));
    localStorage.setItem("sonora_historial", JSON.stringify(historial));
    localStorage.setItem("sonora_favoritos", JSON.stringify(favoritos));
    localStorage.setItem("sonora_playlists", JSON.stringify(playlists));
    localStorage.setItem("sonora_reproductor", JSON.stringify(estadoReproductor));
}

// login y registro//
function inicializarSesion() {
    const loginDiv = document.querySelector(".login");
    if (loginDiv && localStorage.getItem("sesionIniciada") === "true") {
        const usuario = localStorage.getItem("usuario");
        const rol = localStorage.getItem("rol") ?? "Oyente";
        loginDiv.innerHTML = `<p>Bienvenido, <strong>${usuario}</strong> (${rol}) | <a href="#" id="logout">Cerrar sesión</a></p>`;

        document.querySelector("#logout").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("sesionIniciada");
            localStorage.removeItem("usuario");
            localStorage.removeItem("rol");
            window.location.reload();
        });
    }

    const formLogin = document.querySelector("#form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", (event) => {
            event.preventDefault();
            const correo = document.querySelector("#correo").value.trim();
            const password = document.querySelector("#pass").value.trim();
            const usuariosGuardados = JSON.parse(localStorage.getItem("sonora_usuarios")) ?? [];

            const usuarioEncontrado = usuariosGuardados.find(u => u.correo === correo && u.password === password);

            if ((correo === "usuario@udp.cl" && password === "123456") || usuarioEncontrado) {
                localStorage.setItem("sesionIniciada", "true");
                localStorage.setItem("usuario", usuarioEncontrado ? usuarioEncontrado.nombre : correo.split("@")[0]);
                localStorage.setItem("rol", usuarioEncontrado ? usuarioEncontrado.rol : "Oyente");
                window.location.href = "index.html";
            } else {
                document.querySelector("#mensaje-login").textContent = "Credenciales incorrectas. Usa: usuario@udp.cl / 123456";
            }
        });
    }

    const formRegistro = document.querySelector("#form-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombre = document.querySelector("#reg-nombre").value.trim();
            const correo = document.querySelector("#reg-correo").value.trim();
            const password = document.querySelector("#reg-pass").value.trim();
            const rol = document.querySelector("#reg-rol").value;

            const usuariosGuardados = JSON.parse(localStorage.getItem("sonora_usuarios")) ?? [];
            usuariosGuardados.push({ id: Date.now(), nombre, correo, password, rol });
            localStorage.setItem("sonora_usuarios", JSON.stringify(usuariosGuardados));

            localStorage.setItem("sesionIniciada", "true");
            localStorage.setItem("usuario", nombre);
            localStorage.setItem("rol", rol);
            window.location.href = "index.html";
        });
    }
}