import { useState } from 'react';
import AmbientBackground from './AmbientBackground';
import Header from './Header';
import './Header.css';
import Footer from './Footer';
import './Footer.css';
import './Rutinas.css';
import { RUTINAS } from './rutinas';

function RutinaVideo({ video, titulo }) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (!video) return null;

  return (
    <div className="rutina-video">
      {reproduciendo ? (
        <iframe
          src={`https://www.youtube.com/embed/${video}?autoplay=1`}
          title={titulo}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button
          className="rutina-video-thumb"
          onClick={() => setReproduciendo(true)}
          aria-label={`Reproducir ${titulo}`}
        >
          <img src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt="" />
          <span className="play-icon">▶</span>
        </button>
      )}
    </div>
  );
}

function RutinaCard({ rutina }) {
  return (
    <article className="rutina-card">
      <div className="rutina-head">
        <span className="rutina-num">Nº {String(rutina.numero).padStart(2, '0')}</span>
        <h2>{rutina.titulo}</h2>
      </div>

      <p className="rutina-descripcion">{rutina.descripcion}</p>

      <RutinaVideo video={rutina.videoId} titulo={rutina.titulo} />

      {rutina.pdf && (
        <a className="rutina-download" href={rutina.pdf} download>
          Descargar rutina (PDF)
        </a>
      )}
    </article>
  );
}

function Rutinas() {
  return (
    <div>
      <AmbientBackground />
      <Header />

      <section className="rutinas-hero">
        <a className="rutinas-volver" href="/">
          ← Volver al inicio
        </a>
        <span className="rutinas-numeral">Rutinas de práctica</span>
        <h1>Rutinas</h1>
        <p>
          Aquí encontrarás las rutinas de práctica de David: cada una con su
          video explicativo y el material en PDF para descargar y seguir
          desde tu instrumento.
        </p>
      </section>

      <section className="rutinas-list">
        {RUTINAS.length === 0 ? (
          <p className="rutinas-vacio">
            Muy pronto encontrarás aquí las rutinas de práctica.
          </p>
        ) : (
          RUTINAS.map((rutina) => <RutinaCard key={rutina.numero} rutina={rutina} />)
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Rutinas;
