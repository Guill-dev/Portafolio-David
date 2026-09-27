import { SOCIALS } from './socialLinks';

function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-inner">
        <span className="contact-label">Contacto</span>
        <h2 data-reveal>
          Hablemos <span>de música.</span>
        </h2>
        <p>Para contrataciones, presentaciones o colaboraciones, escríbeme por cualquiera de estos medios.</p>

        <div className="social-row">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
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
