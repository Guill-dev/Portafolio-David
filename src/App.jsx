import { useState } from 'react';
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


function App() {
  const [cargaLista, setCargaLista] = useState(false);

  function alTerminarCarga() {
    const hash = window.location.hash;
    if (hash) {
      const destino = document.querySelector(hash);
      if (destino) destino.scrollIntoView();
    }
    setCargaLista(true);
  }

  return (
    <div>
      <LoadingScreen onFinish={alTerminarCarga} />
      <AmbientBackground />
      <Header />
      <Hero cargaLista={cargaLista} />
      <Historia />
      <VideoRow />
      <Awards/>
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;