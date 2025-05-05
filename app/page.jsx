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

      {/* Subscription Plans Section */}
      <section className="subscription-section">
        <h2>Choose Your Plan</h2>
        <p>Unlock the full potential of your academic tracking with our subscription plans.</p>
        <div className="plan-grid">
          <div className="plan-card animate-slide-in">
            <h3>Free</h3>
            <p className="price">$0<span>/month</span></p>
            <ul className="features-list">
              <li><i className="fas fa-check"></i> Basic GPA Calculations</li>
              <li><i className="fas fa-check"></i> Multi-Semester Tracking</li>
              <li><i className="fas fa-check"></i> PDF Reports</li>
              <li><i className="fas fa-times"></i> Store GPA on Cache Memory</li>    
              <li><i className="fas fa-times"></i> Advanced Analytics</li>
            </ul>
            <Link href="/calculator">
              <button className="button button-blue plan-button">Get Started</button>
            </Link>
          </div>
          <div className="plan-card plan-highlight animate-slide-in">
            <h3>Pro</h3>
            <p className="price">$9.99<span>/month</span></p>
            <ul className="features-list">
              <li><i className="fas fa-check"></i> Advanced GPA Calculations</li>
              <li><i className="fas fa-check"></i> Multi-Semester Tracking</li>
              <li><i className="fas fa-check"></i> PDF Reports</li>
              <li><i className="fas fa-check"></i> Store GPA on Cache Memory</li>
              <li><i className="fas fa-times"></i> Advanced Analytics</li>
            </ul>
            <Link href="/subscribe">
              <button className="button button-green plan-button">Choose Pro</button>
            </Link>
          </div>
          <div className="plan-card animate-slide-in">
            <h3>Premium</h3>
            <p className="price">$19.99<span>/month</span></p>
            <ul className="features-list">
              <li><i className="fas fa-check"></i> Advanced GPA Calculations</li>
              <li><i className="fas fa-check"></i> Unlimited Semester Tracking</li>
              <li><i className="fas fa-check"></i> PDF Reports</li>
              <li><i className="fas fa-check"></i> Store GPA on Cache Memory</li>    
              <li><i className="fas fa-check"></i> Advanced Analytics</li>
            </ul>
            <Link href="/subscribe">
              <button className="button button-blue plan-button">Choose Premium</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}