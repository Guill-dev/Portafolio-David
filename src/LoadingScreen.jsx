import { useEffect, useEffectEvent, useState } from 'react';
import './LoadingScreen.css';

const LINEAS = [0, 1, 2, 3, 4];

// Posición de cada nota sobre el pentagrama (% horizontal y vertical)
const NOTAS = [
  { simbolo: '♪', izquierda: 34, arriba: 75 },
  { simbolo: '♩', izquierda: 47, arriba: 25 },
  { simbolo: '♫', izquierda: 60, arriba: 50 },
  { simbolo: '♩', izquierda: 73, arriba: 0 },
  { simbolo: '♪', izquierda: 86, arriba: 50 },
];

function LoadingScreen({ onFinish }) {
  const [saliendo, setSaliendo] = useState(false);
  const [terminado, setTerminado] = useState(false);

  // Si onFinish cambiara entre renders, el efecto no debe reiniciarse:
  // eso volvería a bloquear el scroll otros 4 segundos.
  const avisarFin = useEffectEvent(() => onFinish?.());

  useEffect(() => {
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duracion = prefiereReducido ? 800 : 3400;

    document.body.style.overflow = 'hidden';

    const salida = setTimeout(() => setSaliendo(true), duracion);
    const fin = setTimeout(() => {
      setTerminado(true);
      document.body.style.overflow = '';
      avisarFin();
    }, duracion + 600);

    return () => {
      clearTimeout(salida);
      clearTimeout(fin);
      document.body.style.overflow = '';
    };
  }, []);

  if (terminado) return null;

  return (
    <div className={`loader ${saliendo ? 'loader-saliendo' : ''}`} role="status" aria-label="Cargando">
      <div className="loader-escena">
        <div className="loader-pentagrama">
          {LINEAS.map((i) => (
            <span
              key={i}
              className="loader-linea"
              style={{ top: `${i * 11}px`, animationDelay: `${i * 0.09}s` }}
            />
          ))}

          <span className="loader-clave" aria-hidden="true">𝄢</span>

          {NOTAS.map((nota, i) => (
            <span
              key={i}
              className="loader-nota"
              aria-hidden="true"
              style={{ left: `${nota.izquierda}%`, top: `${nota.arriba}%`, '--i': i }}
            >
              {nota.simbolo}
            </span>
          ))}
        </div>

        <p className="loader-marca">
          David <span>Pérez Pantoja</span>
        </p>
        <p className="loader-oficio">Trombonista Colombiano</p>

        <svg className="loader-progreso" viewBox="0 0 60 60" aria-hidden="true">
          <circle className="loader-progreso-fondo" cx="30" cy="30" r="27" />
          <circle className="loader-progreso-relleno" cx="30" cy="30" r="27" />
        </svg>
      </div>
    </div>
  );
}

export default LoadingScreen;
