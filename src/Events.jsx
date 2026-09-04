import Movement from './Movement';
import ImageCarousel from './ImageCarousel';
import { EVENT_POSTERS } from './eventPosters';

function Events() {
  return (
    <Movement numeral="Movimiento IV" title="Eventos" id="eventos">
      <p>¡Entérate de todo! Echa un vistazo a mis nuevos eventos:
      </p>
      <br></br>
      <ImageCarousel items={EVENT_POSTERS} />
    </Movement>
  );
}

export default Events;