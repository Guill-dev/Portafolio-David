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
  return (
    <div>
      <Header />
      <Hero />  
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