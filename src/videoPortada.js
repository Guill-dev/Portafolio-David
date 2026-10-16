// Video de la portada (lo primero que se ve al entrar a la página).
//
// El video está en "public/video/portada.mp4". Esa carpeta está en el
// .gitignore: NO se sube a GitHub, solo existe en este computador.
// Al hacer "npm run build" se copia a dist/ y de ahí se sube a Hostinger.
//
// Para cambiarlo:
//   1. Reemplaza "public/video/portada.mp4" por el nuevo (mismo nombre).
//      Recomendado: horizontal 16:9, 1080p, 15 a 30 segundos, sin audio
//      y de menos de 10 MB para que cargue rápido en celular.
//   2. Reemplaza también "public/video/portada.jpg" por una foto del primer
//      cuadro del nuevo video: se ve mientras el video carga. Si no la
//      cambias, al arrancar el video se notará un salto de imagen.
//   3. Si David queda en otra parte del cuadro, ajusta el encuadre en
//      Hero.css (object-position de ".hero-video video").
export const HERO_VIDEO = {
  archivo: '/video/portada.mp4',
  // Primer cuadro del video: se ve mientras el video carga
  poster: '/video/portada.jpg',
};
