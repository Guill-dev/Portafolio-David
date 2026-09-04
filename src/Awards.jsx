import Movement from './Movement';
import { AWARDS } from './reconocimientos';

function LaurelIcon() {
  return (
    <svg className="laurel" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20c3-6 3-12 0-17M6 18c2-5 2-9 0-13M20 20c-3-6-3-12 0-17M18 18c-2-5-2-9 0-13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Awards() {
  return (
    <Movement numeral="Movimiento IV" title="Premios y Reconocimientos" id="premios">
      <div className="awards-grid">
        {AWARDS.map((award, i) => (
          <div key={i} className="award-card">
            <div className="award-medal">
              <LaurelIcon />
              <span className="award-year">{award.year}</span>
            </div>
            <div className="award-text">
              <p className="award-title">{award.title}</p>
              <p className="award-org">{award.org}</p>
            </div>
          </div>
        ))}
      </div>
    </Movement>
  );
}

export default Awards;