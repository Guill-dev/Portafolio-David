import Shires from "./Shires";
function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero-photo"
        src="https://davidperezpantoja.com/images/david.jpg"
        alt="David Pérez Pantoja con su trombón"
      />
      <Shires />
      <br />
      <h1>
        David Pérez Pantoja
      </h1>
      <p className="tag">
        Trombonista Colombiano
        <br></br>
        Orquesta Sinfónica Nacional de Colombia
      </p>
      <span className="scroll-cue">Desplázate ↓</span>
    </section>
  );
}

export default Hero;