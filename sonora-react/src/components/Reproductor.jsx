import {useRef, useEffect, useState} from 'react';

export function Reproductor({ cancionActual }){
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (cancionActual && audioRef.current)
        {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [cancionActual]);

    const playPause = () => {
        if (!audioRef.current || !cancionActual) return;
        if (isPlaying)
        {
            audioRef.current.pause();
        }
        else
        {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    }

    //Reproductor musical
    return (
    	<footer className="reproductor">
            <div className="info-cancion">
                {cancionActual ? (
                    <p id="texto-reproductor"><strong>{cancionActual.titulo}</strong> - {cancionActual.artista}</p>
                ) : (
                        <p id="texto-reproductor">No hay canción seleccionada</p>
                )}
            </div>

            {cancionActual && (
                <audio ref={audioRef} src={cancionActual.archivo} />
            )}

            <div className="controles-reproduccion">
                <button type="button" className="btn-control" id="btn-prev">&lt;</button>
                <button type="button" className="btn-control btn-play" id="btn-play" onClick={playPause}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button type="button" className="btn-control" id="btn-next">&gt;</button>
            </div>

            <div className="cierre-pagina">
                <p>Sonora. Pagina web de alumnos UDP.</p>
            </div>
    	</footer>
    );
}