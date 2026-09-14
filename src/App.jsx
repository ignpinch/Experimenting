import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const countVisit = async () => {
      try {
        const response = await fetch(
          "https://counterapi.com/api/user-viewer.vercel.app/view/home"
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
    <main className="visitor-page">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <section className="visitor-card">
        <div className="live-badge">
          <span className="live-dot"></span>
          LIVE VISITOR COUNTER
        </div>

        <p className="small-title">
          TOTAL WEBSITE VISITS
        </p>

        <h1 className="visitor-number">
          {loading ? "..." : visitors.toLocaleString()}
        </h1>

        <p className="visitor-label">
          Visits
        </p>

        <div className="divider"></div>

        <p className="description">
          Every time someone visits this website,
          <br />
          the visitor count increases automatically.
        </p>

        <div className="status-box">
          <span
            className="status-icon"
            style={{
              background: "#3dff8b",
            }}
          ></span>

          <div>
            <p className="status-title">
              Counter Active
            </p>

            <p className="status-text">
              Global visitor tracking enabled
            </p>
          </div>
        </div>
      </section>

      <p className="footer-text">
        Visitor Counter • React + Vite
      </p>
    </main>
  );
}

export default App;
