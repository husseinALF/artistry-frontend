import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadArtwork from "../components/UploadArtwork";
import "./Upload.css";

const Upload = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kontrollera inloggningsstatus
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Returnera inget medan omdirigering sker
  }

  return (
    <div className="upload-page">
      <div className="container">
        <header className="upload-header">
          <h1>Ladda upp konstverk</h1>
          <p className="subtitle">Dela dina skapelser med vår gemenskap</p>
        </header>

        <div className="upload-content">
          <UploadArtwork />

          <div className="upload-tips">
            <h2>Tips för uppladdning</h2>
            <ul>
              <li>
                Använd högkvalitativa bilder som visar ditt konstverk tydligt
              </li>
              <li>Ge en beskrivande titel som fångar konstverkets essens</li>
              <li>
                Lägg till en detaljerad beskrivning som berättar om din
                inspiration och teknik
              </li>
              <li>Ladda bara upp konstverk som du har upphovsrätten till</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
