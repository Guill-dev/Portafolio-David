import { useEffect, useRef } from 'react';
import { HERO_VIDEO } from './videoPortada';

const API_YOUTUBE = 'https://www.youtube.com/iframe_api';

// Carga una sola vez la API oficial de YouTube para poder controlar
// el video de ejemplo (bucle y reintentos de reproducción).
function cargarApiYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise((resolve) => {
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      resolve(window.YT);
    };

    if (!document.querySelector(`script[src="${API_YOUTUBE}"]`)) {
      const script = document.createElement('script');
      script.src = API_YOUTUBE;
      document.head.appendChild(script);
    }
  });
}

// Video de YouTube silenciado y en bucle, usado como fondo de ejemplo
function FondoYouTube({ id, inicio }) {
  const contenedorRef = useRef(null);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    // YouTube reemplaza este div por su iframe; como React no lo maneja,
    // se puede crear y destruir libremente.
    const destino = document.createElement('div');
    contenedor.appendChild(destino);

    let reproductor = null;
    let listo = false;
    let cancelado = false;

    // Si la página cargó en segundo plano (otra pestaña, ventana minimizada)
    // YouTube no arranca solo: se vuelve a intentar al hacerse visible
    // o con la primera interacción del visitante.
    function intentarReproducir() {
      if (!listo || document.hidden) return;
      const estado = reproductor.getPlayerState();
      if (estado === window.YT.PlayerState.PLAYING || estado === window.YT.PlayerState.BUFFERING) return;
      reproductor.mute();
      reproductor.playVideo();
    }

    const eventosInteraccion = ['pointerdown', 'keydown', 'scroll'];
    document.addEventListener('visibilitychange', intentarReproducir);
    eventosInteraccion.forEach((evento) =>
      window.addEventListener(evento, intentarReproducir, { passive: true })
    );

    cargarApiYouTube().then((YT) => {
      if (cancelado) return;

      reproductor = new YT.Player(destino, {
        host: 'https://www.youtube-nocookie.com',
        videoId: id,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          start: inicio,
        },
        events: {
          onReady: (e) => {
            listo = true;
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            // Bucle manual para volver al segundo elegido y no al inicio
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(inicio, true);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelado = true;
      document.removeEventListener('visibilitychange', intentarReproducir);
      eventosInteraccion.forEach((evento) =>
        window.removeEventListener(evento, intentarReproducir)
      );
      reproductor?.destroy?.();
      contenedor.replaceChildren();
    };
  }, [id, inicio]);

  return <div ref={contenedorRef} className="hero-video-youtube" aria-hidden="true" />;
}

function HeroVideo() {
  const { archivo, poster, youtubeEjemplo, inicioEjemplo } = HERO_VIDEO;
  const videoRef = useRef(null);
  const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // iOS solo reproduce el video automáticamente si está silenciado de verdad
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    if (!prefiereReducido) video.play().catch(() => {});
  }, [prefiereReducido]);

  return (
    <div className="hero-video">
      {archivo ? (
        <video
          ref={videoRef}
          src={archivo}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        !prefiereReducido && <FondoYouTube id={youtubeEjemplo} inicio={inicioEjemplo} />
      )}
    </div>
  );
}

export default HeroVideo;
