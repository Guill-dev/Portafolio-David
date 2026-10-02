import { SOCIALS } from './socialLinks';
import TextoScroll from './TextoScroll';

function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-inner">
        <span className="contact-label" data-reveal>Contacto</span>
        <h2>
          <TextoScroll texto="Hablemos" />{' '}
          <span className="contact-resalte">
            <TextoScroll texto="de música." />
          </span>
        </h2>
        <p data-reveal>Para contrataciones, presentaciones o colaboraciones, escríbeme por cualquiera de estos medios.</p>

        <div className="social-row" data-reveal>
          {SOCIALS.map((s) => (
            <a key={s.label} className="boton-hover" href={s.href} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24">
                <path d={s.path} />
              </svg>
              {s.label}
              <span className="social-flecha" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
