import './BotonHover.css';

// Botón píldora con un punto dorado. Al pasar el mouse el punto crece hasta
// llenar el botón, el texto se corre a la derecha y entra una copia en negro
// (inspirado en "Interactive Hover Button" de 21st.dev, sin librerías).
// El relleno dorado viene de la clase "boton-hover" (ver index.css).
//
// Uso:
//   <BotonHover onClick={...}>Leer más</BotonHover>                         → <button>
//   <BotonHover como="a" href="#contacto" flecha="→">Contacto</BotonHover>  → <a>
//
//   como    etiqueta HTML que se dibuja: 'button' (por defecto) o 'a'
//   flecha  ícono que solo aparece en la copia, al pasar el mouse
function BotonHover({ como: Etiqueta = 'button', flecha, className = '', children, ...props }) {
  return (
    <Etiqueta className={`boton-hover boton-cambio ${className}`} {...props}>
      <span className="boton-cambio-texto">{children}</span>

      {/* Copia que entra al pasar el mouse. aria-hidden para que no se lea dos veces */}
      <span className="boton-cambio-copia" aria-hidden="true">
        {children}
        {flecha && <span>{flecha}</span>}
      </span>
    </Etiqueta>
  );
}

export default BotonHover;
