// Video de la portada (lo primero que se ve al entrar a la página).
//
// Mientras no exista el video propio se muestra, como ejemplo, una
// presentación de YouTube silenciada y en bucle.
//
// Para poner tu video:
//   1. Guárdalo en la carpeta "public/video/" con el nombre "portada.mp4".
//      Recomendado: horizontal 16:9, 1080p, 15 a 30 segundos, sin audio
//      y de menos de 10 MB para que cargue rápido en celular.
//   2. (Opcional) Guarda una imagen del primer cuadro como
//      "public/video/portada.jpg" y ponla en "poster": se ve mientras carga.
//   3. Cambia "archivo" a '/video/portada.mp4'.
export const HERO_VIDEO = {
  archivo: '',
  poster: '',

  // Solo se usa mientras "archivo" esté vacío
  youtubeEjemplo: 'PXkibZee4gg',
  // Segundo del video de YouTube desde el que empieza el ejemplo
  inicioEjemplo: 213,
};
