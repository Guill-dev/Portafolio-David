function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {año} David Pérez Pantoja — Todos los derechos reservados</p>
        <a className="footer-arriba" href="#top">
          Volver arriba <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
