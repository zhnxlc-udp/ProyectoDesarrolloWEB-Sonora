export function Header( {cambiarVista} ) {
    return (
        <header className="encabezado">
             {/*Logo más nombre*/}
             <div className="logo">		
                 <img src="logonormal.png" alt="Logo Sonora" />
                 <h1>Sonora | Reproductor musical</h1>
             </div>

             {/*Inicio de sesión*/}
             <div className="login">
                 <p>
                     Inicia sesión o regístrate <button onClick={() => cambiarVista('login')} className="btn-enlace">aquí</button>
                 </p>
             </div>
        </header>
    );
}