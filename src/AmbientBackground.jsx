import { useEffect, useRef } from 'react';
import './AmbientBackground.css';

const SIMBOLOS = ['♪', '♫', '♬', '𝄞', '𝄡', '𝄢', '𝄫', '♮', '♭', '♯'];

function aleatorioEntre(min, max) {
  return min + Math.random() * (max - min);
}

function crearNota(ancho, alto, alTerminarArriba = false) {
  return {
    x: Math.random() * ancho,
    y: alTerminarArriba ? Math.random() * alto : alto + aleatorioEntre(40, 240),
    simbolo: SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)],
    tamano: aleatorioEntre(25, 25),
    velocidad: aleatorioEntre(0.1, 3),
    deriva: aleatorioEntre(-0.12, 0.2),
    angulo: aleatorioEntre(0, Math.PI * 2),
    //giro: aleatorioEntre(-0.003, 0.003),
    fase: 'subiendo',
    opacidad: 0,
    tiempoPentagrama: 0,
  };
}

function crearEstrella(ancho, alto) {
  return {
    x: Math.random() * ancho,
    y: Math.random() * alto,
    radio: aleatorioEntre(1, 2.0),
    fase: aleatorioEntre(0, Math.PI * 2),
    velocidadTitileo: aleatorioEntre(0.004, 0.014),
  };
}

/**
 * Fondo decorativo: notas que ascienden, se posan un instante sobre un
 * pentagrama que atraviesa la pantalla y luego se disuelven hacia
 * un cielo de puntos, como si la música viajara del pentagrama al universo.
 * Vive detrás de todo el contenido (z-index negativo) y no captura eventos.
 */
function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ancho = window.innerWidth;
    let alto = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function ajustarTamano() {
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas.width = ancho * dpr;
      canvas.height = alto * dpr;
      canvas.style.width = `${ancho}px`;
      canvas.style.height = `${alto}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ajustarTamano();

    const totalEstrellas = Math.min(Math.max(Math.round((ancho * alto) / 24000), 26), 70);
    const estrellas = Array.from({ length: totalEstrellas }, () => crearEstrella(ancho, alto));

    const totalNotas = ancho < 760 ? 5 : 9;
    const notas = Array.from({ length: totalNotas }, () => crearNota(ancho, alto, true));

    const LINEAS_PENTAGRAMA = 5;
    const ESPACIO_LINEAS = 6;

    function yDelPentagrama(x, t) {
      const inclinacion = 0.16;
      const mecido = Math.sin(t * 0.00007 + x * 0.0006) * 26;
      return alto * 0.42 + (x - ancho / 2) * inclinacion + mecido;
    }

    function dibujarPentagrama(t) {
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 162, 76, 0.09)';
      ctx.lineWidth = 1;
      for (let i = 0; i < LINEAS_PENTAGRAMA; i++) {
        const offset = (i - (LINEAS_PENTAGRAMA - 1) / 2) * ESPACIO_LINEAS;
        ctx.beginPath();
        for (let x = 0; x <= ancho; x += 32) {
          const y = yDelPentagrama(x, t) + offset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    function dibujarEstrellas(t) {
      ctx.save();
      for (const estrella of estrellas) {
        const parpadeo = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * estrella.velocidadTitileo + estrella.fase));
        ctx.fillStyle = `rgba(241, 236, 224, ${0.3 * parpadeo})`;
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function actualizarNota(nota, t) {
      const objetivoY = yDelPentagrama(nota.x, t);

      if (nota.fase === 'subiendo') {
        nota.y -= nota.velocidad;
        nota.x += nota.deriva;
        nota.angulo += nota.giro;
        nota.opacidad = Math.min(nota.opacidad + 0.0035, 0.5);

        if (nota.y <= objetivoY + 3) {
          nota.fase = 'pentagrama';
          nota.tiempoPentagrama = 0;
        }
      } else if (nota.fase === 'pentagrama') {
        nota.tiempoPentagrama += 1;
        nota.y = objetivoY - Math.sin(nota.tiempoPentagrama * 0.045) * 2;
        nota.opacidad = Math.min(nota.opacidad + 0.008, 0.68);

        if (nota.tiempoPentagrama > 110) {
          nota.fase = 'disolviendo';
        }
      } else {
        nota.y -= nota.velocidad * 1.5;
        nota.x += nota.deriva * 1.3;
        nota.opacidad -= 0.005;

        if (nota.opacidad <= 0 || nota.y < -40) {
          Object.assign(nota, crearNota(ancho, alto, false));
        }
      }

      if (nota.x < -20) nota.x = ancho + 20;
      if (nota.x > ancho + 20) nota.x = -20;
    }

    function dibujarNota(nota) {
      ctx.save();
      ctx.translate(nota.x, nota.y);
      ctx.rotate(nota.angulo);
      ctx.fillStyle = `rgba(201, 162, 76, ${nota.opacidad})`;
      ctx.font = `${nota.tamano}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nota.simbolo, 0, 0);
      ctx.restore();
    }

    let t = 0;
    let raf = null;

    function dibujarCuadro() {
      ctx.clearRect(0, 0, ancho, alto);
      dibujarEstrellas(t);
      dibujarPentagrama(t);
      for (const nota of notas) {
        dibujarNota(nota);
      }
    }

    function loop() {
      t += 16;
      for (const nota of notas) {
        actualizarNota(nota, t);
      }
      dibujarCuadro();
      raf = requestAnimationFrame(loop);
    }

    if (prefiereReducido) {
      for (const nota of notas) nota.opacidad = 0.35;
      dibujarCuadro();
    } else {
      raf = requestAnimationFrame(loop);
    }

    function alRedimensionar() {
      ajustarTamano();
    }
    window.addEventListener('resize', alRedimensionar);

    return () => {
      window.removeEventListener('resize', alRedimensionar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-bg" aria-hidden="true" />;
}

export default AmbientBackground;
