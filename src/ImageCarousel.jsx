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

  return (
    <>
      <div
        className="carousel-frame"
        onTouchStart={manejarInicioToque}
        onTouchEnd={manejarFinToque}
      >
        <button className="carousel-arrow left" aria-label="Anterior" onClick={() => irA(indice - 1)}>
          ‹
        </button>

        {/* 🌟 NUEVO CONTENEDOR: Se desplaza según el índice actual */}
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {items.map((item, i) => (
            <img key={i} src={item.src} alt={item.caption} />
          ))}
        </div>

        <button className="carousel-arrow right" aria-label="Siguiente" onClick={() => irA(indice + 1)}>
          ›
        </button>

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
      </div>

      {/* Mostramos la descripción de la imagen activa */}
      <p className="carousel-caption">{items[indice]?.caption}</p>
    </>
  );
}

export default ImageCarousel;
