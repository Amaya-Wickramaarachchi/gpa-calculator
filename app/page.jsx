import Link from 'next/link';
import './styles.css';

export default function Home() {
  return (
    <div className="landing-container">
      <div className="header">
        <h1>Welcome to GPA Calculator</h1>
        <p>Track your academic progress with ease and precision</p>
      </div>
      <div className="intro">
        <h2>Calculate Your GPA Effortlessly</h2>
        <p>
          Our GPA Calculator helps you compute your semester and overall GPA with a user-friendly interface. Input your grades, track your progress, and download detailed reports to stay on top of your academic goals.
        </p>
        <div className="button-group">
          <Link href="/calculator">
            <button className="button button-blue">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}