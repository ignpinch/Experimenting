import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const countVisit = async () => {
      try {
        const response = await fetch(
          "https://counterapi.com/api/kenneth-user-viewer-2026/view/home"
        );

        const data = await response.json();

        setVisitors(data.value || 0);
      } catch (error) {
        console.error("Counter error:", error);
      } finally {
        setLoading(false);
      }
    };

    countVisit();
  }, []);

  return (
    <main className="page">
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <div className="container">
        <header className="header">
          <div className="brand">
            <div className="brand-icon">V</div>

            <span className="brand-name">
              visitly
            </span>
          </div>

          <div className="online-badge">
            <span className="online-dot"></span>
            LIVE
          </div>
        </header>

        <section className="hero">
          <div className="mascot">
            👋
          </div>

          <p className="eyebrow">
            WEBSITE VISITOR COUNTER
          </p>

          <h1>
            Every visit
            <span> counts!</span>
          </h1>

          <p className="hero-description">
            See how many times people have visited this website.
          </p>
        </section>

        <section className="counter-card">
          <div className="counter-top">
            <div>
              <p className="counter-label">
                TOTAL VISITS
              </p>

              <h2>
                {loading
                  ? "..."
                  : visitors.toLocaleString()}
              </h2>
            </div>

            <div className="counter-icon">
              👀
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <div className="progress-info">
              <span>Growing every day</span>
              <span>🔥</span>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              🌎
            </div>

            <div>
              <p className="stat-title">
                Global
              </p>

              <p className="stat-description">
                Shared counter
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              ⚡
            </div>

            <div>
              <p className="stat-title">
                Live
              </p>

              <p className="stat-description">
                Updates on visits
              </p>
            </div>
          </div>
        </section>

        <section className="message-card">
          <div className="message-icon">
            🎉
          </div>

          <div>
            <h3>Thanks for visiting!</h3>

            <p>
              You just helped increase the visitor count.
            </p>
          </div>
        </section>

        <footer>
          Built with React + Vite
        </footer>
      </div>
    </main>
  );
}

export default App;
