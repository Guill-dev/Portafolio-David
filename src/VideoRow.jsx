
import { useState } from 'react';
import { VIDEOS } from './videos';
import Movement from './Movement';

function VideoCard({ video, reproduciendo, onReproducir }) {
  return (
    <div className="video-card">
      <div className="video-frame">
        {reproduciendo ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.titulo}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            className="video-thumb"
            onClick={onReproducir}
            aria-label={`Reproducir ${video.titulo}`}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
            />
            <span className="play-icon">▶</span>
          </button>
        )}
      </div>

      <p className="video-title">{video.titulo}</p>

      <p
        className="video-author"
        style={{ whiteSpace: 'pre-line' }}
      >
        {video.autor}
      </p>
    </div>
  );
}

function VideoRow() {
  const [videoActivo, setVideoActivo] = useState(null);

  return (
    <Movement numeral="Movimiento II" title="Presentaciones" id="presentaciones">
      <div className="video-row">
        {VIDEOS.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            reproduciendo={videoActivo === video.id}
            onReproducir={() => setVideoActivo(video.id)}
          />
        ))}
      </div>
    </Movement>
  );
}

export default VideoRow;
