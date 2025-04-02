import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserArtworks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/gallery/user/artworks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            mode: "cors",
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            throw new Error("Sessionen har utgått. Logga in igen.");
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data.user);
        setArtworks(data.artworks);
        setError(null);
      } catch (err) {
        console.error("Fel vid hämtning av användardata:", err);
        setError(
          err.message || "Kunde inte ladda användardata. Försök igen senare."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArtworks();
  }, [navigate]);

  const handleEditClick = (artwork) => {
    setEditingArtwork(artwork);
    setEditForm({
      title: artwork.title,
      description: artwork.description || "",
    });
  };

  const handleDeleteClick = async (artworkId) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta bild?")) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/gallery/${artworkId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Kunde inte ta bort bilden");
      }

      setArtworks(artworks.filter((artwork) => artwork.id !== artworkId));
    } catch (err) {
      console.error("Fel vid borttagning:", err);
      alert("Kunde inte ta bort konstverket. Försök igen senare.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/gallery/${editingArtwork.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        throw new Error("Kunde inte uppdatera konstverket");
      }

      const updatedArtwork = await response.json();

      setArtworks(
        artworks.map((artwork) =>
          artwork.id === updatedArtwork.id ? updatedArtwork : artwork
        )
      );

      setEditingArtwork(null);
    } catch (err) {
      console.error("Fel vid uppdatering:", err);
      alert("Kunde inte uppdatera konstverket. Försök igen senare.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <header className="profile-header">
          <h1>Min profil</h1>
          {userData && <p>{userData.username}</p>}
        </header>

        {isLoading && <p className="loading">Laddar användardata...</p>}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && (
          <div className="user-artworks">
            <h2>Mina konstverk</h2>

            {artworks.length === 0 ? (
              <div className="no-artworks">
                <p>Du har inte laddat upp några konstverk ännu.</p>
              </div>
            ) : (
              <div className="artwork-grid">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="artwork-item">
                    <div className="artwork-image">
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL ||
                          "http://localhost:5000"
                        }${artwork.image_path}`}
                        alt={artwork.title}
                      />
                    </div>
                    <div className="artwork-info">
                      <h3>{artwork.title}</h3>
                      <p className="artwork-description">
                        {artwork.description || "Ingen beskrivning"}
                      </p>
                      <div className="artwork-actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditClick(artwork)}
                        >
                          Redigera
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteClick(artwork.id)}
                        >
                          Ta bort
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {editingArtwork && (
          <div className="edit-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Redigera konstverk</h2>
                <button
                  className="close-button"
                  onClick={() => setEditingArtwork(null)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Titel</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editForm.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Beskrivning</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={editForm.description}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setEditingArtwork(null)}
                  >
                    Avbryt
                  </button>
                  <button type="submit" className="btn-save">
                    Spara ändringar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
