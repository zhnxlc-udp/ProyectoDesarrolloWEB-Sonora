export function Navbar ( {cambiarVista} ){
    return(
        <nav>
            <button onClick={() => cambiarVista('home')} className="btn-enlace">Inicio</button>  |  
            <button onClick={() => cambiarVista('library')} className="btn-enlace">Biblioteca</button>
        </nav>
    );
}