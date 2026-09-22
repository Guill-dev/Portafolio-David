import { useEffect, useRef, useState } from 'react';
import { SOCIALS } from './socialLinks';


const NAV_ITEMS = [
  { id: 'historia', label: 'Historia', href: '/#historia' },
  { id: 'presentaciones', label: 'Presentaciones', href: '/#presentaciones' },
  { id: 'premios', label: 'Reconocimientos', href: '/#premios' },
  { id: 'eventos', label: 'Eventos', href: '/#eventos' },
  { id: 'contacto', label: 'Contacto', href: '/#contacto' }

];

// Enlaces que en escritorio se agrupan bajo el desplegable "Más"
// para no amontonar el menú, y en celular aparecen como un ítem más.
const MORE_ITEMS = [
  { id: 'rutinas', label: 'Rutinas', href: '/rutinas.html' },
];



function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    function manejarClickFuera(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <div className="brand-group">
          <a href="/#top" className="brand">
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
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}

          {/* En celular estos enlaces aparecen dentro del mismo desplegable */}
          {MORE_ITEMS.map((item) => (
            <li key={item.id} className="nav-item-mobile-only">
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}

          {/* En escritorio estos enlaces viven detrás del desplegable "Más" */}
          <li className="nav-more" ref={moreRef}>
            <button
              type="button"
              className="nav-more-trigger"
              aria-haspopup="true"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((abierto) => !abierto)}
            >
              Más <span className="nav-more-arrow" aria-hidden="true">▾</span>
            </button>

            <ul className={`nav-more-dropdown ${moreOpen ? 'open' : ''}`}>
              {MORE_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={item.href} onClick={() => setMoreOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
