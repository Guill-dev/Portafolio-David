// Afiches de Eventos, en el orden en que aparecen en el carrusel.
// Para agregar uno: guarda la imagen en src/assets/Imagenes/eventos/,
// impórtala aquí arriba y agrégala a la lista de abajo.
// Sirve .jpg, .png o .webp (en WebP pesa menos de la mitad).
import evento6 from './assets/Imagenes/eventos/davidevento6.webp';
import evento5 from './assets/Imagenes/eventos/davidevento5.webp';
import evento4 from './assets/Imagenes/eventos/davidevento4.webp';
import evento3 from './assets/Imagenes/eventos/davidevento3.webp';

export const EVENT_POSTERS = [
  { src: evento6 /*, caption: 'Nombre del evento — 15 Dic, Teatro X' */ },
  { src: evento5 },
  { src: evento4 },
  { src: evento3 }
];