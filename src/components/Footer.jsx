import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Artistry</h3>
          <p>
            Ett online-galleri där alla kan dela sina bilder.
            Utforska, dela och hitta inspiration.
          </p>
        </div>

        <div className="footer-section">
          <h3>Länkar</h3>
          <ul>
            <li>
              <a href="/">Hem</a>
            </li>
            <li>
              <a href="/gallery">Galleri</a>
            </li>
            <li>
              <a href="/about">Om oss</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Kontakt</h3>
          <address>
            <p>Isafjordsgatan 30A</p>
            <p>164 40 Kista</p>
            <p>Email: info@artistry.se</p>
            <p>Tel: 08-123 45 67</p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {currentYear} Artistry. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
