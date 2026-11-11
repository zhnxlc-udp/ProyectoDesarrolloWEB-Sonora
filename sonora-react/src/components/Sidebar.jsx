export function Sidebar()
{
    return (
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
    );
}