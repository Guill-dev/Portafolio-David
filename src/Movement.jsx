import './Movement.css';

function Movement({ numeral, title, id, className, children }) {
  return (
    <section className={`movement ${className || ''}`} id={id}>
      <div className="movement-head">
        <span className="movement-num">{numeral}</span>
        <h2>{title}</h2>
      </div>
      <div className="movement-body">{children}</div>
    </section>
  );
}

export default Movement;