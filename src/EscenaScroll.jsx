import { useEffect, useRef, useState } from 'react';
import './EscenaScroll.css';

// Bloque que se abre solo cuando aparece en pantalla (inspirado en
// "Animated Video on Scroll" de 21st.dev, pero sin instalar librerías).
// - Bajando: cuando se ve bien en pantalla, se abre con una animación.
// - Subiendo: cuando vuelve a quedar por debajo de la pantalla, se cierra.
// - Bajando más allá de la escena, se queda abierta (no se repite).
// Las piezas que se animan se marcan con clases (ver EscenaScroll.css):
//   escena-ventana  se abre desde una píldora pequeña en el centro
//   escena-aparece  aparece desenfocada desde abajo cuando la ventana va por la mitad
//
// ancla (opcional): id para los enlaces, por ejemplo "presentaciones".
// Los enlaces a #presentaciones (el menú) llevan a la escena ya abierta,
// sin animación.
//
// Uso:
//   <EscenaScroll ancla="presentaciones">
//     <div className="escena-ventana"> ...video... </div>
//     <div className="escena-aparece"> ...texto... </div>
//   </EscenaScroll>

// Qué parte de la escena tiene que verse para que se abra (0.3 = 30%)
const UMBRAL = 0.3;

function EscenaScroll({ ancla, className = '', children }) {
  const escenaRef = useRef(null);

  // Si la página se abre con #presentaciones en la dirección, empieza abierta
  const llegaConAncla = () => Boolean(ancla) && window.location.hash === `#${ancla}`;
  const [abierta, setAbierta] = useState(llegaConAncla);
  // true = se abre de golpe, sin animación (al llegar desde el menú)
  const [deGolpe, setDeGolpe] = useState(llegaConAncla);

  useEffect(() => {
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereReducido) return;

    // true mientras la página viaja hacia la escena después de tocar el menú:
    // en ese viaje no se debe cerrar aunque asome poquito
    let forzado = Boolean(ancla) && window.location.hash === `#${ancla}`;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.intersectionRatio >= UMBRAL) {
          setAbierta(true);
          forzado = false; // ya llegó
          return;
        }

        if (forzado) return;

        // Se cierra solo si quedó por debajo de la pantalla (la persona subió).
        // Si quedó por arriba (siguió bajando), se queda abierta.
        if (entrada.boundingClientRect.top > 0) setAbierta(false);
      },
      { threshold: [0, UMBRAL] }
    );
    observador.observe(escenaRef.current);

    // Al tocar un enlace que apunta al ancla (el menú, por ejemplo)
    function alHacerClic(e) {
      const enlace = e.target.closest('a');
      if (!ancla || !enlace || enlace.hash !== `#${ancla}`) return;
      forzado = true;
      setDeGolpe(true);
      setAbierta(true);
    }

    // Si la persona mueve la página a mano, todo vuelve a lo normal
    function soltar() {
      forzado = false;
      setDeGolpe(false);
    }

    document.addEventListener('click', alHacerClic);
    window.addEventListener('wheel', soltar, { passive: true });
    window.addEventListener('touchstart', soltar, { passive: true });
    window.addEventListener('keydown', soltar);
    window.addEventListener('pointerdown', soltar);

    return () => {
      observador.disconnect();
      document.removeEventListener('click', alHacerClic);
      window.removeEventListener('wheel', soltar);
      window.removeEventListener('touchstart', soltar);
      window.removeEventListener('keydown', soltar);
      window.removeEventListener('pointerdown', soltar);
    };
  }, [ancla]);

  const clases = ['escena', className, abierta && 'abierta', deGolpe && 'de-golpe'];

  return (
    <div id={ancla} className={clases.filter(Boolean).join(' ')} ref={escenaRef}>
      <div className="escena-contenido">{children}</div>
    </div>
  );
}

export default EscenaScroll;
