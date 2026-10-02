import { Fragment, useEffect, useRef } from 'react';
import './TextoScroll.css';

// Letras que empiezan separadas y giradas y se van juntando a medida que
// se baja con el scroll (inspirado en "Text Scroll Animation" de 21st.dev,
// pero sin instalar librerías).
// Uso: <h2><TextoScroll texto="Historia" /></h2>

// En qué punto de la pantalla queda armada la frase:
// 0.5 = cuando su borde de arriba llega a la mitad de la pantalla.
// Súbelo (0.7) para que se arme antes; bájalo (0.3) para que tarde más.
const META = 0.5;

// Parte el texto en palabras y le da a cada letra su distancia al centro
// de la frase: negativa a la izquierda, positiva a la derecha.
function prepararLetras(texto) {
  const centro = (texto.length - 1) / 2;
  let posicion = 0;

  return texto.split(' ').map((palabra) => {
    const letras = [...palabra].map((letra, i) => ({
      letra,
      distancia: posicion + i - centro,
    }));
    posicion += palabra.length + 1; // +1 por el espacio
    return letras;
  });
}

function TextoScroll({ texto }) {
  const ref = useRef(null);
  const palabras = prepararLetras(texto);

  useEffect(() => {
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereReducido) return;

    const elemento = ref.current;
    let ultimo = null;

    function actualizar() {
      const alto = window.innerHeight;
      const arriba = elemento.getBoundingClientRect().top;

      // Si la página se acaba antes de que el texto llegue a la meta
      // (pasa con Contacto en pantallas altas), se arma donde quede al final.
      const scrollRestante = document.documentElement.scrollHeight - alto - window.scrollY;
      const meta = Math.max(alto * META, arriba - scrollRestante);
      const recorrido = alto - meta;

      // 0 = el texto apenas asoma por abajo · 1 = llegó a la meta
      const avance = recorrido > 0 ? Math.min(Math.max((alto - arriba) / recorrido, 0), 1) : 1;

      // Curva suave: las letras se mueven rápido al principio y frenan al final
      const suave = 1 - (1 - avance) ** 2;

      if (suave !== ultimo) {
        elemento.style.setProperty('--p', suave);
        ultimo = suave;
      }
    }

    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    window.addEventListener('resize', actualizar);

    return () => {
      window.removeEventListener('scroll', actualizar);
      window.removeEventListener('resize', actualizar);
    };
  }, []);

  return (
    <>
      {/* Los lectores de pantalla leen la frase completa, no letra por letra */}
      <span className="solo-lectores">{texto}</span>

      <span className="texto-scroll" ref={ref} aria-hidden="true">
        {palabras.map((letras, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="texto-scroll-palabra">
              {letras.map(({ letra, distancia }, j) => (
                <span key={j} className="texto-scroll-letra" style={{ '--d': distancia }}>
                  {letra}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

export default TextoScroll;
