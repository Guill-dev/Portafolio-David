// Hace aparecer con un deslizamiento suave los elementos marcados con
// el atributo data-reveal cuando entran en pantalla.
// Devuelve una función para limpiar el observador.
export function activarRevelado() {
  const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefiereReducido || !('IntersectionObserver' in window)) return () => {};

  document.documentElement.classList.add('revelado-activo');

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          // Se marca con un atributo propio y no con una clase: si React cambia
          // las clases del elemento (por ejemplo al abrir "Leer más"), borraría
          // una clase puesta aquí y el bloque volvería a quedar invisible.
          // Este atributo React no lo toca nunca.
          entrada.target.setAttribute('data-revelado', '');
          observador.unobserve(entrada.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observador.observe(el));

  return () => observador.disconnect();
}
