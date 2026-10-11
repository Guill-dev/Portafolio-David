import { useEffect, useRef } from 'react';
import { HERO_VIDEO } from './videoPortada';

// Video de fondo de la portada: silenciado, en bucle y sin controles.
// El archivo y la imagen de espera se cambian en videoPortada.js;
// el encuadre (qué parte del video se ve) en Hero.css, en ".hero-video video".
function HeroVideo() {
  const { archivo, poster } = HERO_VIDEO;
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

  if (!archivo) return <div className="hero-video" />;

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        src={archivo}
        poster={poster || undefined}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export default HeroVideo;
