import { useState } from 'react';
import { SOCIALS } from './socialLinks';


const NAV_ITEMS = [
  { id: 'historia', label: 'Historia' },
  { id: 'presentaciones', label: 'Presentaciones' },
  { id: 'premios', label: 'Reconocimientos' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'contacto', label: 'Contacto' }

];



function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="brand-group">
          <a href="#top" className="brand">
            David <span>Pérez Pantoja</span>
          </a>
          <div className="header-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <button
          className="navtoggle"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((abierto) => !abierto)}
        >
          ☰
        </button>

        <ul className={`navlinks ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;