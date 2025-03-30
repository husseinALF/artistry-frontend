import { useState, useEffect } from "react";
import ArtworkCard from "../components/ArtworkCard";
import "./Gallery.css";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/gallery/`
        );

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setArtworks(data);
        setError(null);
      } catch (err) {
        console.error("Fel vid hämtning av konstverk:", err);
        setError("Kunde inte ladda konstverken. Försök igen senare.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="gallery-page">
      <div className="container">
        <header className="gallery-header">
          <h1>Konstgalleri</h1>
          <p>Utforska vackra konstverk från talangfulla konstnärer</p>
        </header>

        {isLoading && <p className="loading">Laddar konstverk...</p>}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && artworks.length === 0 && (
          <p className="empty-gallery">
            Inga konstverk tillgängliga. Logga in för att ladda upp det första
            konstverket!
          </p>
        )}

        <div className="artwork-grid">
          {!isLoading &&
            !error &&
            artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
