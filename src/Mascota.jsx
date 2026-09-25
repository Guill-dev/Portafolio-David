import { useEffect, useRef, useState } from 'react';
import './Mascota.css';

const RUTA_AUDIO = '/mascota/concerto.mp3';
const DURACION_AUDIO_MS = 16400;

function Mascota({ activo }) {
  const [visible, setVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);

  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const yaEjecutado = useRef(false);

  function limpiarTemporizadores() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function ocultar() {
    limpiarTemporizadores();
    setSaliendo(true);
    audioRef.current?.pause();

    const t = setTimeout(() => setVisible(false), 400);
    timersRef.current.push(t);
  }

  function irAPresentaciones() {
    document.getElementById('presentaciones')?.scrollIntoView();
    ocultar();
  }

  useEffect(() => {
    if (!activo || yaEjecutado.current) return undefined;
    yaEjecutado.current = true;

    let cancelado = false;

    // Chrome y Safari no dejan sonar audio hasta que el visitante ha
    // interactuado con el sitio (por ejemplo, al volver de Rutinas con un clic).
    // Si todavía no lo permiten, no mostramos nada: la bocina solo aparece
    // cuando de verdad puede sonar.
    const espera = setTimeout(() => {
      audioRef.current
        ?.play()
        .then(() => {
          if (cancelado) {
            audioRef.current?.pause();
            return;
          }
          setVisible(true);
          timersRef.current.push(setTimeout(ocultar, DURACION_AUDIO_MS));
        })
        .catch(() => {});
    }, 0.1);

    timersRef.current.push(espera);

    return () => {
      cancelado = true;
      limpiarTemporizadores();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo]);

  return (
    <>
      <audio ref={audioRef} src={RUTA_AUDIO} preload="auto" />

      {visible && (
        <button
          type="button"
          className={`mascota ${saliendo ? 'mascota-saliendo' : ''}`}
          onClick={irAPresentaciones}
          aria-label="Sigue escuchando a David: haz clic para ver sus presentaciones."
        >
          <span className="mascota-lienzo">
            <span className="mascota-halo" aria-hidden="true" />
            <svg className="mascota-svg" viewBox="0 0 120 100" aria-hidden="true">
              <defs>
                <linearGradient id="mascota-metal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f3d98f" />
                  <stop offset="0.55" stopColor="#C9A24C" />
                  <stop offset="1" stopColor="#8f7538" />
                </linearGradient>
              </defs>

              <g className="mascota-bocina">
                <path className="mascota-bocina-cuerpo" d="M14 38 H30 L54 19 V81 L30 62 H14 Z" />
                <path className="mascota-bocina-division" d="M30 39 V61" />
                <path className="mascota-bocina-brillo" d="M34 38 L50 25" />
                <path className="mascota-bocina-brillo" d="M16 42 V49" />
              </g>

              <path className="mascota-onda" d="M66 38 A16 16 0 0 1 66 62" />
              <path className="mascota-onda mascota-onda-2" d="M74 30 A26 26 0 0 1 74 70" />
              <path className="mascota-onda mascota-onda-3" d="M82 22 A36 36 0 0 1 82 78" />

              <text className="mascota-nota" x="84" y="16">♪</text>
              <text className="mascota-nota mascota-nota-2" x="98" y="10">♫</text>
              <text className="mascota-nota mascota-nota-3" x="90" y="22">♪</text>
            </svg>
          </span>

          <span className="mascota-burbuja">
            <span className="mascota-burbuja-l1">Sigue escuchando</span>
            <span className="mascota-burbuja-l2">Presiona aquí</span>
            <span className="mascota-burbuja-chevron" aria-hidden="true">⌄</span>
            <span className="mascota-pulso" aria-hidden="true" />
          </span>
        </button>
      )}
    </>
  );
}

export default Mascota;
