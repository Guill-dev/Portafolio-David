import { useState } from 'react';
import Movement from './Movement';
import ImageCarousel from './ImageCarousel';
import { EVENT_POSTERS } from './eventPosters';

function Events() {
  // Guarda si el texto está desplegado (solo se usa en celular y tablet)
  const [abierto, setAbierto] = useState(false);

  return (
    <Movement numeral="Movimiento IV" title="Eventos" id="eventos" className="movement-eventos">
      {/* "tarjeta" le da el fondo y el borde, igual que en Historia */}
      <div className={`events-tarjeta tarjeta ${abierto ? 'abierta' : ''}`}>
        <p className="events-intro">¡Entérate de todo! Echa un vistazo a mis nuevos eventos:</p>
        <p>Hay encuentros que simplemente suceden, y hay otros que se convierten en momentos que recordamos.</p>

        {/* En celular y tablet este bloque queda oculto hasta tocar "Leer más".
            En computador siempre se ve (ver ImageCarousel.css) */}
        <div className="events-mas">
          <p>Los eventos son ese espacio para salir de la pantalla, encontrarnos cara a cara, compartir ideas, escuchar nuevas historias y, por qué no, pasar un buen rato. Cada encuentro tiene su propia energía, su propia gente y una oportunidad diferente de conectar.</p>
          <p>En esta sección encontrarás los próximos eventos, conferencias, encuentros, conversaciones y espacios en los que estaré participando. Algunos serán grandes escenarios, otros encuentros más cercanos, pero todos tendrán algo en común: la posibilidad de compartir, aprender y construir algo juntos.</p>
          <p>Me gusta pensar que un evento no termina cuando se apagan las luces o cuando termina una conversación. Muchas veces es justo ahí cuando empiezan nuevas ideas, proyectos, amistades y oportunidades.</p>
          <p>Así que, si llegaste hasta aquí porque quieres saber dónde nos veremos próximamente, este es el lugar.</p>
        </div>

        <div className="events-acciones">
          {/* Usa el mismo estilo que el botón de Historia (clase btn-leer-mas) */}
          <button
            type="button"
            className="btn-leer-mas events-leer-mas"
            aria-expanded={abierto}
            onClick={() => setAbierto(!abierto)}
          >
            <span>{abierto ? 'Ver menos' : 'Leer más'}</span>
            <span className="btn-leer-mas-icono" aria-hidden="true">▾</span>
          </button>
          <a className="events-enlace" href="#contacto">Sigamos en contacto</a>
        </div>
      </div>
      <ImageCarousel items={EVENT_POSTERS} />
    </Movement>
  );
}

export default Events;