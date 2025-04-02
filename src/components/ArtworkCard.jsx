import "./ArtworkCard.css";

const ArtworkCard = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <div className="artwork-image">
        <img
          src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${
            artwork.image_path
          }`}
          alt={artwork.title}
        />
      </div>
      <div className="artwork-info">
        <h3>{artwork.title}</h3>
        <p className="artwork-artist">av {artwork.author}</p>
        <p className="artwork-description">
          {artwork.description || "Ingen beskrivning tillgänglig"}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
