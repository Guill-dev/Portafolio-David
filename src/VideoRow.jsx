import { useRef, useState } from 'react';
import { VIDEOS } from './videos';
import Movement from './Movement';

const DURACION_TRANSICION = 500;

function VideoContenido({ video, reproduciendo, onReproducir }) {
  return reproduciendo ? (
    <iframe
      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
      title={video.titulo}
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  ) : (
    <button
      className="video-thumb"
      onClick={onReproducir}
      aria-label={`Reproducir ${video.titulo}`}
    >
      <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" />
      <span className="play-icon">▶</span>
    </button>
  );
}

function VideoRow() {
  const total = VIDEOS.length;
  const [indice, setIndice] = useState(0);
  const [saliente, setSaliente] = useState(null); // { indice, direccion }
  const [videoActivo, setVideoActivo] = useState(null);
  const animando = useRef(false);
  const inicioX = useRef(null);

  function irA(destino, direccion) {
    const nuevoIndice = (destino + total) % total;
    if (animando.current || nuevoIndice === indice) return;

    animando.current = true;
    setSaliente({ indice, direccion });
    setIndice(nuevoIndice);

    setTimeout(() => {
      setSaliente(null);
      animando.current = false;
    }, DURACION_TRANSICION);
  }

  const siguiente = () => irA(indice + 1, 'siguiente');
  const anterior = () => irA(indice - 1, 'anterior');

  function manejarInicioToque(e) {
    inicioX.current = e.touches[0].clientX;
  }

  function manejarFinToque(e) {
    if (inicioX.current === null) return;
    const diferencia = inicioX.current - e.changedTouches[0].clientX;

    if (diferencia > 50) siguiente();
    else if (diferencia < -50) anterior();

    inicioX.current = null;
  }

  const indiceSaliente = saliente ? saliente.indice : indice;
  const videoSaliente = VIDEOS[indiceSaliente];
  const videoActual = VIDEOS[indice];

  return (
    <Movement numeral="Movimiento II" title="Presentaciones" id="presentaciones">
      <div
        className="video-frame"
        onTouchStart={manejarInicioToque}
        onTouchEnd={manejarFinToque}
      >
        <button
          className="video-nav-arrow left"
          aria-label="Presentación anterior"
          onClick={anterior}
        >
          ‹
        </button>

        {saliente && (
          <div className={`video-layer entrante ${saliente.direccion}`}>
            <VideoContenido
              video={videoActual}
              reproduciendo={videoActivo === videoActual.id}
              onReproducir={() => setVideoActivo(videoActual.id)}
            />
          </div>
        )}

        <div className={`video-layer ${saliente ? `saliente ${saliente.direccion}` : ''}`}>
          <VideoContenido
            video={videoSaliente}
            reproduciendo={videoActivo === videoSaliente.id}
            onReproducir={() => setVideoActivo(videoSaliente.id)}
          />
        </div>

        <button
          className="video-nav-arrow right"
          aria-label="Siguiente presentación"
          onClick={siguiente}
        >
          ›
        </button>

        <div className="video-dots">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              className={`video-dot ${i === indice ? 'active' : ''}`}
              aria-label={`Ver presentación ${i + 1}`}
              onClick={() => irA(i, i > indice ? 'siguiente' : 'anterior')}
            />
          ))}
        </div>
      </div>

      <p className="video-title">{videoActual.titulo}</p>
      <p className="video-author" style={{ whiteSpace: 'pre-line' }}>
        {videoActual.autor}
      </p>
    </Movement>
  );
}

export default VideoRow;
