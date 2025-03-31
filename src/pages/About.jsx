import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <header className="about-header">
          <h1>Om Artistry</h1>
          <p className="subtitle">Vår historia och uppdrag</p>
        </header>

        <section className="about-content">
          <div className="about-section">
            <h2>Vårt uppdrag</h2>
            <p>
            Artistry skapades som en plattform där människor kan dela sina bilder och berättelser, 
            uttrycka sin kreativitet och inspirera andra världen över.
            
            </p>
            <p>
            Vårt mål med Artistry är att skapa en inspirerande och inkluderande plattform där människor fritt kan dela sin konst och sina berättelser. 
            Vi vill bygga en global gemenskap där kreativitet, uttryck och samhörighet står i fokus.
            </p>
          </div>

          <div className="about-section">
            <h2>Våra värderingar</h2>
            <ul className="values-list">
              <li>
                <h3>Kreativitet</h3>
                <p>Vi uppmuntrar konstnärlig frihet och originella uttryck.</p>
              </li>
              <li>
                <h3>Tillgänglighet</h3>
                <p>
                  Artistry bör vara tillgänglig för alla, oavsett bakgrund eller
                  utbildning.
                </p>
              </li>
              <li>
                <h3>Gemenskap</h3>
                <p>
                  Vi främjar en stödjande miljö där alla kan växa och
                  utvecklas tillsammans.
                </p>
              </li>
              <li>
                <h3>Kvalitet</h3>
                <p>
                  Vi strävar efter att erbjuda en plattform som framhäver glädje
                  av hög kvalitet.
                </p>
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Vårt team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">👨‍🎨</div>
                <h3>Akbar Gholami</h3>
                <p className="team-role">Grundare & Kreativ direktör</p>
              </div>


              <div className="team-member">
                <div className="team-avatar">👨‍💼</div>
                <h3>Francis Chew</h3>
                <p className="team-role">Affärsutveckling</p>
              </div>

              <div className="team-member">
                <div className="team-avatar">👩‍🎨</div>
                <h3>Hussein Alfartoussi</h3>
                <p className="team-role">Konstexpert & Kurator</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
