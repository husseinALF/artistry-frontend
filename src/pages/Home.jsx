import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="home-page">
      <header className="hero">
        <div className="container">
          <h1>Välkommen till Artistry</h1>
          <p className="hero-subtitle">
            Utforska och dela vackra konstverk i vårt online-galleri
          </p>
          <div className="hero-buttons">
            <Link to="/gallery" className="btn btn-primary">
              Utforska galleri
            </Link>
            {!isLoggedIn ? (
              <Link to="/register" className="btn btn-secondary">
                Skapa konto
              </Link>
            ) : (
              <Link to="/upload" className="btn btn-secondary">
                Ladda upp konst
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Utforska konst online</h2>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3>Bläddra i galleriet</h3>
              <p>
                Utforska vår samling av unika konstverk från talangfulla
                konstnärer.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⬆️</div>
              <h3>Ladda upp konst</h3>
              <p>
                Dela dina egna kreationer med vår gemenskap och få feedback.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Gå med i gemenskapen</h3>
              <p>Anslut dig till andra konstälskare och diskutera konstverk.</p>
            </div>
          </div>
        </div>
      </section>

      {!isLoggedIn && (
        <section className="cta">
          <div className="container">
            <h2>Redo att dela din konst?</h2>
            <p>Registrera dig idag och börja ladda upp dina konstverk.</p>
            <Link to="/register" className="btn btn-accent">
              Kom igång nu
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
