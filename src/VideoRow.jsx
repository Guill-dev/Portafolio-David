import { useRef, useState } from 'react';
import { VIDEOS } from './videos';
import Movement from './Movement';
import EscenaScroll from './EscenaScroll';

const miniatura = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
      <img src={miniatura(video.id)} alt="" draggable={false} />
      <span className="play-icon">▶</span>
    </button>
  );
}

function VideoRow() {
  const total = VIDEOS.length;
  // Posición de la rueda. No tiene límite: después del último video sigue
  // girando hacia el mismo lado. El video que queda al frente es "indice".
  const [posicion, setPosicion] = useState(0);
  const [videoActivo, setVideoActivo] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const cilindroRef = useRef(null);
  const arrastre = useRef(null); // { inicioX, dx, ancho } mientras se arrastra
  const huboArrastre = useRef(false); // para no reproducir el video al soltar

  const indice = ((posicion % total) + total) % total;
  const videoActual = VIDEOS[indice];

  function moverA(nuevaPosicion) {
    setPosicion(nuevaPosicion);
    setVideoActivo(null); // detiene el video que estaba sonando
  }

  const siguiente = () => moverA(posicion + 1);
  const anterior = () => moverA(posicion - 1);

  // Va al video i por el camino más corto de la rueda
  function irA(i) {
    let pasos = (((i - indice) % total) + total) % total;
    if (pasos > total / 2) pasos -= total;
    if (pasos !== 0) moverA(posicion + pasos);
  }

  // ---------- Arrastrar la rueda con el mouse o el dedo ----------
  function alPresionar(e) {
    if (e.button !== 0) return;
    arrastre.current = { inicioX: e.clientX, dx: 0, ancho: e.currentTarget.offsetWidth };
    huboArrastre.current = false;
  }

  function alMover(e) {
    const a = arrastre.current;
    if (!a) return;
    a.dx = e.clientX - a.inicioX;

    // Un movimiento muy pequeño cuenta como clic, no como arrastre
    if (!huboArrastre.current) {
      if (Math.abs(a.dx) < 8) return;
      huboArrastre.current = true;
      setArrastrando(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    // La rueda sigue al dedo: arrastrar el ancho de un video = girar un video
    cilindroRef.current.style.setProperty('--giro', posicion - a.dx / a.ancho);
  }

  function alSoltar() {
    const a = arrastre.current;
    arrastre.current = null;
    if (!a || !huboArrastre.current) return;
    setArrastrando(false);

    // Avanza los videos que se arrastraron (mínimo uno si se movió más de 50px)
    let pasos = Math.round(-a.dx / a.ancho);
    if (pasos === 0 && Math.abs(a.dx) > 50) pasos = a.dx < 0 ? 1 : -1;

    const destino = posicion + pasos;
    cilindroRef.current.style.setProperty('--giro', destino);
    if (pasos !== 0) moverA(destino);

    // El "clic" que llega justo al soltar ya pasó; los siguientes funcionan normal
    // (con el dedo a veces ese clic ni siquiera llega)
    setTimeout(() => {
      huboArrastre.current = false;
    }, 0);
  }

  // Después de arrastrar, soltar encima de un video no lo reproduce
  function alClic(e) {
    if (!huboArrastre.current) return;
    e.preventDefault();
    e.stopPropagation();
    huboArrastre.current = false;
  }

  const numero = (n) => String(n).padStart(2, '0');

  return (
    <Movement numeral="Movimiento II" title="Presentaciones">
      {/* El video se queda quieto en el centro y se va abriendo al hacer scroll
          (ver EscenaScroll.jsx y EscenaScroll.css).
          ancla="presentaciones": los enlaces a #presentaciones (el menú) llevan
          directo al video ya abierto, sin la animación */}
      <EscenaScroll className="video-escena" ancla="presentaciones">
        {/* Carrusel 3D: los videos van alrededor de una rueda que gira (ver VideoRow.css) */}
        <div
          className={`video-escenario ${arrastrando ? 'arrastrando' : ''}`}
          onPointerDown={alPresionar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
          onClickCapture={alClic}
        >
          <div className="video-cilindro" ref={cilindroRef} style={{ '--caras': total, '--giro': posicion }}>
            {VIDEOS.map((video, i) => {
              const activa = i === indice;

              return (
                <div
                  key={`${video.id}-${i}`}
                  className={`video-cara ${activa ? 'activa escena-ventana' : ''}`}
                  style={{ '--i': i }}
                  aria-hidden={!activa}
                >
                  {activa ? (
                    <VideoContenido
                      video={video}
                      reproduciendo={videoActivo === video.id}
                      onReproducir={() => setVideoActivo(video.id)}
                    />
                  ) : (
                    // Los videos de los lados: al tocarlos, la rueda gira hasta ellos
                    <button type="button" className="video-thumb" tabIndex={-1} onClick={() => irA(i)}>
                      <img src={miniatura(video.id)} alt="" draggable={false} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="video-info escena-aparece">
          <div className="video-textos">
            <p className="video-title">{videoActual.titulo}</p>
            <p className="video-author" style={{ whiteSpace: 'pre-line' }}>
              {videoActual.autor}
            </p>
          </div>

          <div className="video-controles">
            <span className="video-contador">
              {numero(indice + 1)} <span>/ {numero(total)}</span>
            </span>
            <button
              className="video-nav-arrow boton-hover"
              aria-label="Presentación anterior"
              onClick={anterior}
            >
              ←
            </button>
            <button
              className="video-nav-arrow boton-hover"
              aria-label="Siguiente presentación"
              onClick={siguiente}
            >
              →
            </button>
          </div>
        </div>

        <div className="video-dots escena-aparece">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              className={`video-dot ${i === indice ? 'active' : ''}`}
              aria-label={`Ver presentación ${i + 1}`}
              onClick={() => irA(i)}
            />
          ))}
        </div>
      </EscenaScroll>
    </Movement>
  );
}

export default VideoRow;
