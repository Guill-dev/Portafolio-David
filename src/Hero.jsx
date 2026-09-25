import Shires from "./Shires";
import Mascota from "./Mascota";
import fotoDavid from './assets/Imagenes/perfil/DavidPortada.jpg';

function Hero({ cargaLista }) {
  return (
    <section className="hero" id="top">
      <div className="hero-photo-wrap">
        <img className="hero-photo"
          src={fotoDavid}
          />
        <Mascota activo={cargaLista} />
      </div>
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
      <span className="scroll-cue">
        Desplázate
        <span className="scroll-cue-icono" aria-hidden="true">↓</span>
      </span>
    </section>
  );
}

export default Hero;