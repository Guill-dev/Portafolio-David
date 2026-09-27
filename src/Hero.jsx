import { useEffect, useState } from 'react';
import Shires from "./Shires";
import HeroVideo from './HeroVideo';
import fotoDavid from './assets/Imagenes/perfil/DavidPortada-avatar.jpg';

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
      <div className="hero-titulos hero-anim">
        <h1>David Pérez Pantoja</h1>
        <p className="hero-linea">
          Trombón bajo <PalabraRotativa palabras={PALABRAS} />
        </p>
      </div>

      <a className="scroll-cue hero-anim" href="#historia">
        Desplázate
        <span className="scroll-cue-icono" aria-hidden="true">↓</span>
      </a>

      <div className="hero-meta hero-anim">
        <div className="hero-perfil">
          <img className="hero-photo" src={fotoDavid} alt="David Pérez Pantoja" />
          <p className="tag">
            <strong>Trombonista Colombiano</strong>
            <span>Orquesta Sinfónica Nacional de Colombia</span>
          </p>
        </div>
        <Shires />
      </div>

      <div className="hero-video-wrap hero-anim">
        <HeroVideo />
      </div>
    </section>
  );
}

export default Hero;
