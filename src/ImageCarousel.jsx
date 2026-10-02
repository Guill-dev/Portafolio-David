import './ImageCarousel.css';
import { useState, useEffect, useRef } from 'react';

function ImageCarousel({ items, autoplayMs = 5000 }) {
  const [indice, setIndice] = useState(0);
  // true mientras el usuario está mirando los afiches (tocó o hizo clic en el carrusel)
  const [pausado, setPausado] = useState(false);
  // true cuando el carrusel se ve en pantalla
  const [visible, setVisible] = useState(false);
  const inicioX = useRef(null);

  // Las tres partes del carrusel (afiche, flechas y barra), para saber
  // si un toque fue dentro o fuera de él
  const frameRef = useRef(null);
  const infoRef = useRef(null);
  const dotsRef = useRef(null);

  // Avance automático: solo si se ve en pantalla y nadie lo está usando
  useEffect(() => {
    if (pausado || !visible) return;

    const temporizador = setInterval(() => {
      setIndice((actual) => (actual + 1) % items.length);
    }, autoplayMs);

    return () => clearInterval(temporizador);
  }, [items.length, autoplayMs, pausado, visible]);

  // Un toque o clic dentro del carrusel lo pausa; fuera de él, lo reanuda
  useEffect(() => {
    function alTocar(e) {
      const partes = [frameRef.current, infoRef.current, dotsRef.current];
      const dentro = partes.some((parte) => parte?.contains(e.target));
      setPausado(dentro);
    }

    document.addEventListener('pointerdown', alTocar);
    return () => document.removeEventListener('pointerdown', alTocar);
  }, []);

  // Al salir de la pantalla se quita la pausa, para que vuelva a avanzar
  // solo cuando el visitante regrese
  useEffect(() => {
    const observador = new IntersectionObserver(
      ([entrada]) => {
        setVisible(entrada.isIntersecting);
        if (!entrada.isIntersecting) setPausado(false);
      },
      { threshold: 0.3 }
    );

    observador.observe(frameRef.current);
    return () => observador.disconnect();
  }, []);

  // Cambio hecho por el usuario (flechas, barra, deslizar o teclado)
  function irA(nuevoIndice) {
    setPausado(true);
    setIndice((nuevoIndice + items.length) % items.length);
  }

  function manejarInicioToque(e) {
    inicioX.current = e.touches[0].clientX;
  }

  function manejarFinToque(e) {
    if (inicioX.current === null) return;
    const finX = e.changedTouches[0].clientX;
    const diferencia = inicioX.current - finX;

    if (diferencia > 50) irA(indice + 1);
    else if (diferencia < -50) irA(indice - 1);

    inicioX.current = null;
  }

  const numero = (n) => String(n).padStart(2, '0');

  return (
    <>
      <div
        ref={frameRef}
        className="carousel-frame"
        data-reveal
        onTouchStart={manejarInicioToque}
        onTouchEnd={manejarFinToque}
      >
        {/* Se desplaza según el índice actual */}
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="carousel-slide">
              {/* Copia desenfocada del afiche que rellena los lados */}
              <img className="carousel-fondo" src={item.src} alt="" aria-hidden="true" />
              <img className="carousel-img" src={item.src} alt={item.caption || ''} />
            </div>
          ))}
        </div>
      </div>

      <div ref={infoRef} className="carousel-info" data-reveal>
        <p className="carousel-caption">{items[indice]?.caption}</p>

        <div className="carousel-controles">
          <span className="carousel-contador">
            {numero(indice + 1)} <span>/ {numero(items.length)}</span>
          </span>
          <button className="carousel-arrow boton-hover" aria-label="Anterior" onClick={() => irA(indice - 1)}>
            ←
          </button>
          <button className="carousel-arrow boton-hover" aria-label="Siguiente" onClick={() => irA(indice + 1)}>
            →
          </button>
        </div>
      </div>

      <div ref={dotsRef} className="carousel-dots" data-reveal>
        {items.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === indice ? 'active' : ''}`}
            aria-label={`Ver imagen ${i + 1}`}
            onClick={() => irA(i)}
          />
        ))}
      </div>
    </>
  );
}

export default ImageCarousel;
