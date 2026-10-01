import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import AmbientBackground from './AmbientBackground';
import Header from './Header';
import './Header.css';
import Hero from './Hero';
import './Hero.css';
import Footer from './Footer';
import './Footer.css';
import Contact from './Contact';
import './Contact.css';
import VideoRow from './VideoRow';
import './VideoRow.css';
import Events from './Events';
import Historia from './Historia';
import Awards from './Awards';
import './Awards.css'
import { activarRevelado } from './revelar';


function App() {
  useEffect(() => activarRevelado(), []);

  function alTerminarCarga() {
    // Dispara la animación de entrada de la portada (ver Hero.css)
    document.documentElement.classList.add('pagina-lista');

    const hash = window.location.hash;
    if (!hash) return;

    const destino = document.querySelector(hash);
    if (destino) destino.scrollIntoView({ behavior: 'instant' });
  }

  return (
    <div>
      <LoadingScreen onFinish={alTerminarCarga} />
      <AmbientBackground />
      <Header />
      <Hero />
      <Historia />
      <VideoRow />
      <Events />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
