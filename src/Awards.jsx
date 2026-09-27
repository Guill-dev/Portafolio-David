import Movement from './Movement';
import { AWARDS } from './reconocimientos';

function Awards() {
  return (
    <Movement numeral="Movimiento III" title="Premios y Reconocimientos" id="premios">
      <ol className="awards-list">
        {AWARDS.map((award, i) => (
          <li key={i} className="award-row" data-reveal>
            <span className="award-year">{award.year}</span>
            <p className="award-title">{award.title}</p>
            <p className="award-org">{award.org}</p>
          </li>
        ))}
      </ol>
    </Movement>
  );
}

export default Awards;
