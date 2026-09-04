import { SOCIALS } from './socialLinks';

function Contact() {
  return (
    <section className="contact" id="contacto">
      <h2>Hablemos de música</h2>
      <p>Para contrataciones, presentaciones o colaboraciones, escríbeme por cualquiera de estos medios.</p>

      <div className="social-row">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d={s.path} />
            </svg>
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;