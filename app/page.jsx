import Link from 'next/link';
import './styles.css';

export default function Home() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>GPA Calculator</h1>
          <p className="tagline">Track your academic success with ease and precision</p>
          <Link href="/calculator">
            <button className="button button-blue cta-button">
              <i className="fas fa-rocket"></i> Get Started
            </button>
          </Link>
        </div>
        <div className="wave-animation"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Our GPA Calculator?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fas fa-calculator"></i>
            <h3>Accurate GPA Calculation</h3>
            <p>Compute your semester and overall GPA with weighted grades and precise calculations.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-history"></i>
            <h3>Semester Tracking</h3>
            <p>Save and review your semester history to monitor your academic progress over time.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-download"></i>
            <h3>Detailed Reports</h3>
            <p>Download formatted reports with your grades, GPA, and motivational insights.</p>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="motivation-section">
        <h2>Stay Motivated, Achieve More</h2>
        <p>Our GPA Calculator empowers you to set goals, track progress, and celebrate your academic wins!</p>
      </section>
    </div>
  );
}