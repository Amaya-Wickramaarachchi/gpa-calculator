"use client";

import Link from 'next/link';
import './styles.css';

export default function Home() {
  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="header">
        <h1>GPA Calculator</h1>
        <p>Your simple tool to calculate and manage your academic performance</p>
      </header>

      {/* Intro Section */}
      <section className="intro">
        <h2>Welcome to GPA Calculator</h2>
        <p>
          Easily calculate your GPA by adding courses, grades, and credits. Perfect for students who want a quick and reliable way to track their academic progress. Get started now or register to save your semester history!
        </p>
        <div className="button-group">
          <Link href="/calculator/">
            <button className="button button-blue">Get Started</button>
          </Link>
          <Link href="/auth">
            <button className="button button-green">Register/Login</button>
          </Link>
          <a href="#about">
            <button className="button button-outline">About</button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About the App</h2>
        <p>
          The GPA Calculator is a user-friendly web application built to help students compute their Grade Point Average with ease. Add your courses, select grades, input credits, and get instant GPA results. Free users can manage courses and calculate GPAs, while registered users (coming soon) will be able to save and track semester histories.
        </p>
        <p>
          Built with Next.js and LocalStorage, this app ensures your data stays secure in your browser. No complicated setup—just start calculating!
        </p>
      </section>
    </div>
  );
}