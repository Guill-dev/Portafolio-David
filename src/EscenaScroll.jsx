import { useEffect, useRef } from 'react';
import './EscenaScroll.css';

// Bloque que se queda quieto en el centro de la pantalla mientras se hace
// scroll y va "abriendo" su contenido (inspirado en "Animated Video on Scroll"
// de 21st.dev, pero sin instalar librerías).
// Las piezas que se animan se marcan con clases (ver EscenaScroll.css):
//   escena-ventana  se abre desde una píldora pequeña en el centro
//   escena-aparece  aparece desenfocada desde abajo cuando la ventana va por la mitad
//
// ancla (opcional): id al que apuntan los enlaces, por ejemplo "presentaciones".
// Los enlaces a #presentaciones llevan directo a la escena ya abierta, sin
// mostrar la animación por el camino. Bajando con el scroll se ve normal.
//
// Uso:
//   <EscenaScroll ancla="presentaciones">
//     <div className="escena-ventana"> ...video... </div>
//     <div className="escena-aparece"> ...texto... </div>
//   </EscenaScroll>
function EscenaScroll({ ancla, className = '', children }) {
  const escenaRef = useRef(null);
  const fijaRef = useRef(null);
  const anclaRef = useRef(null);

  useEffect(() => {
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereReducido) return;

    const escena = escenaRef.current;
    const fija = fijaRef.current;

    let altoAnterior = null;
    // true mientras la página viaja hacia el ancla después de tocar un enlace
    let forzado = false;

    function actualizar() {
      const altoFija = fija.offsetHeight;

      // Guarda el alto del bloque quieto para poder centrarlo (--alto-fija en el CSS)
      if (altoFija !== altoAnterior) {
        escena.style.setProperty('--alto-fija', `${altoFija}px`);
        altoAnterior = altoFija;
      }

      // Viaje desde un enlace: la escena se queda abierta todo el camino
      // y vuelve a lo normal cuando llega al ancla
      if (forzado) {
        const margenArriba = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        const llego = Math.abs(anclaRef.current.getBoundingClientRect().top - margenArriba) < 2;
        if (llego) forzado = false;
        escena.style.setProperty('--p', 1);
        return;
      }

      const alto = window.innerHeight;
      const arriba = escena.getBoundingClientRect().top;
      const tope = parseFloat(getComputedStyle(fija).top); // dónde se queda quieta
      const recorrido = escena.offsetHeight - altoFija; // cuánto se queda quieta

      // Empieza cuando la mitad del bloque asoma por abajo y termina un poco
      // antes de que la escena se suelte (al 90% de la parte quieta)
      const inicio = alto - altoFija / 2;
      const fin = tope - recorrido * 0.9;
      const distancia = inicio - fin;

      // 0 = cerrado · 1 = abierto del todo
      const avance = distancia > 0 ? Math.min(Math.max((inicio - arriba) / distancia, 0), 1) : 1;
      escena.style.setProperty('--p', avance);
    }

    // Al tocar un enlace que apunta al ancla (el menú, por ejemplo)
    function alHacerClic(e) {
      const enlace = e.target.closest('a');
      if (!ancla || !enlace || enlace.hash !== `#${ancla}`) return;
      forzado = true;
      escena.style.setProperty('--p', 1);
    }

    // Si la persona mueve la página a mano durante el viaje, vuelve a lo normal
    function soltar() {
      forzado = false;
    }

    // Si el bloque cambia de alto (por ejemplo, un título de video más largo)
    // se vuelve a calcular todo sin esperar al scroll
    const observador = new ResizeObserver(actualizar);
    observador.observe(fija);

    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    window.addEventListener('resize', actualizar);
    document.addEventListener('click', alHacerClic);
    window.addEventListener('wheel', soltar, { passive: true });
    window.addEventListener('touchstart', soltar, { passive: true });
    window.addEventListener('keydown', soltar);
    window.addEventListener('pointerdown', soltar);

    return () => {
      observador.disconnect();
      window.removeEventListener('scroll', actualizar);
      window.removeEventListener('resize', actualizar);
      document.removeEventListener('click', alHacerClic);
      window.removeEventListener('wheel', soltar);
      window.removeEventListener('touchstart', soltar);
      window.removeEventListener('keydown', soltar);
      window.removeEventListener('pointerdown', soltar);
    };
  }, [ancla]);

  return (
    <div className={`escena ${className}`} ref={escenaRef}>
      {/* Marca invisible a la que llevan los enlaces (ver .escena-ancla en el CSS) */}
      {ancla && <span id={ancla} className="escena-ancla" ref={anclaRef} aria-hidden="true" />}

      <div className="escena-fija" ref={fijaRef}>
        {children}
      </div>
    </div>
  );
}

export default EscenaScroll;
