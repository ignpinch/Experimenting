import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function App() {
  const [visitors, setVisitors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getVisitors = async () => {
      try {
        const response = await fetch("/api/visitors", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Visitor API not available");
        }

        const data = await response.json();

        setVisitors(data.pageviews ?? 0);
        setConnected(true);
      } catch (error) {
        console.log(
          "Visitor API will work after deployment to Vercel.",
          error
        );

        setVisitors(0);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    getVisitors();
  }, []);

  return (
    <>
      <main className="visitor-page">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>

        <section className="visitor-card">
          <div className="live-badge">
            <span className="live-dot"></span>
            LIVE VISITOR COUNTER
          </div>

          <p className="small-title">TOTAL WEBSITE VISITS</p>

          <h1 className="visitor-number">
            {loading ? "..." : visitors.toLocaleString()}
          </h1>

          <p className="visitor-label">Visits</p>

          <div className="divider"></div>

          <p className="description">
            Every time someone visits this website,
            <br />
            the visit will be tracked automatically.
          </p>

          <div className="status-box">
            <span
              className="status-icon"
              style={{
                background: connected ? "#3dff8b" : "#ffb84d",
              }}
            ></span>

            <div>
              <p className="status-title">
                {connected ? "Analytics Connected" : "Tracking Status"}
              </p>

              <p className="status-text">
                {connected
                  ? "Visitor analytics is active"
                  : "Will connect after Vercel deployment"}
              </p>
            </div>
          </div>
        </section>

        <p className="footer-text">
          Visitor Counter • React + Vite + Vercel
        </p>
      </main>

      <Analytics />
    </>
  );
}

export default App;