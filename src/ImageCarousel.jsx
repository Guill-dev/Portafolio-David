import './ImageCarousel.css';
import { useState, useEffect, useRef } from 'react';

function ImageCarousel({ items, autoplayMs = 5000 }) {
  const [indice, setIndice] = useState(0);
  const inicioX = useRef(null);

  useEffect(() => {
    const temporizador = setInterval(() => {
      setIndice((actual) => (actual + 1) % items.length);
    }, autoplayMs);

    return () => clearInterval(temporizador);
  }, [items.length, autoplayMs]); // Eliminamos 'indice' de aquí para evitar reinicios bruscos del timer

  function irA(nuevoIndice) {
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
        className="carousel-frame"
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

      <div className="carousel-info">
        <p className="carousel-caption">{items[indice]?.caption}</p>

        <div className="carousel-controles">
          <span className="carousel-contador">
            {numero(indice + 1)} <span>/ {numero(items.length)}</span>
          </span>
          <button className="carousel-arrow" aria-label="Anterior" onClick={() => irA(indice - 1)}>
            ←
          </button>
          <button className="carousel-arrow" aria-label="Siguiente" onClick={() => irA(indice + 1)}>
            →
          </button>
        </div>
      </div>

      <div className="carousel-dots">
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
