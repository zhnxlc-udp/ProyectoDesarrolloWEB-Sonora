export function Reproductor(){
    //Reproductor musical
    return (
    	<footer className="reproductor">
            <div className="info-cancion">
                <p id="texto-reproductor"><strong>Sin reproducir</strong> - Seleccione pista</p>
            </div>

            <div className="controles-reproduccion">
                <button type="button" className="btn-control" id="btn-prev">&lt;</button>
                <button type="button" className="btn-control btn-play" id="btn-play">▶</button>
                <button type="button" className="btn-control" id="btn-next">&gt;</button>
            </div>

            <div className="cierre-pagina">
                <p>Sonora. Pagina web de alumnos UDP.</p>
            </div>
    	</footer>
    );
}