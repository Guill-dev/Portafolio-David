import { useEffect, useState } from 'react';
import Shires from "./Shires";
import HeroVideo from './HeroVideo';

const PALABRAS = ['solista', 'sinfónico', 'de cámara', 'colombiano'];

function PalabraRotativa({ palabras, intervalo = 2400 }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const temporizador = setInterval(() => {
      setIndice((actual) => (actual + 1) % palabras.length);
    }, intervalo);

    return () => clearInterval(temporizador);
  }, [palabras.length, intervalo]);

  return (
    <span className="palabra-rotativa">
      <span key={indice} className="palabra-rotativa-texto">
        {palabras[indice]}
      </span>
    </span>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      {/* Video de fondo que cubre toda la primera pantalla */}
      <div className="hero-fondo hero-anim" aria-hidden="true">
        <HeroVideo />
        <div className="hero-velo" />
      </div>

      <div className="hero-contenido">
        <div className="hero-titulos hero-anim">
          <h1>David Pérez Pantoja</h1>
          <p className="hero-linea">
            Trombón bajo <PalabraRotativa palabras={PALABRAS} />
          </p>
        </div>

        <div className="hero-acciones hero-anim">
          <a className="hero-video-cta" href="#presentaciones">
            <span className="hero-video-cta-icono" aria-hidden="true">▶</span>
            Ver presentaciones
          </a>
          <Shires />
        </div>

        <a className="scroll-cue hero-anim" href="#historia">
          Desplázate
          <span className="scroll-cue-icono" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

export default Hero;
