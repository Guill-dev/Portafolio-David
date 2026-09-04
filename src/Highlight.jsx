function Highlight({ children, href }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="highlight">
        {children}
      </a>
    );
  }

  return <span className="highlight">{children}</span>;
}

export default Highlight;