import Movement from './Movement';
import ImageCarousel from './ImageCarousel';
import { GALLERY_PHOTOS } from './galleryPhotos';

function Gallery() {
  return (
    <Movement numeral="Movimiento V" title="Galería" id="galeria">
      <ImageCarousel items={GALLERY_PHOTOS} />
    </Movement>
  );
}

export default Gallery;