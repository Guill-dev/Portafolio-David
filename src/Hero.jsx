import Shires from "./Shires";
import fotoDavid from './assets/Imagenes/perfil/DavidPortada.jpg';

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-photo" 
        src={fotoDavid}
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