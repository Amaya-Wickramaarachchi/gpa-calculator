"use client";

import { useState, useEffect } from 'react';
import '../../styles.css';

export default function Calculator() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [credits, setCredits] = useState('');
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState(null);

  // Grade values for display
  const gradeValues = {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  // Load courses from LocalStorage on mount
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(storedCourses);
  }, []);

  // Save courses to LocalStorage when they change
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // Add course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseName || !grade || !credits) {
      setError('Please fill in all fields');
      return;
    }
    if (!gradeValues[grade]) {
      setError('Invalid grade');
      return;
    }
    const course = {
      name: courseName,
      grade,
      credits: parseFloat(credits),
      points: gradeValues[grade] * parseFloat(credits),
    };
    setCourses([...courses, course]);
    setCourseName('');
    setGrade('');
    setCredits('');
    setError(null);
  };

  // Calculate GPA
  const calculateGpa = () => {
    if (courses.length === 0) {
      setError('No courses to calculate GPA');
      return;
    }
    const totalPoints = courses.reduce((sum, course) => sum + course.points, 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const gpa = (totalPoints / totalCredits).toFixed(2);
    setGpa(parseFloat(gpa));
    setError(null);
  };

  // Clear history
  const clearHistory = () => {
    setCourses([]);
    setGpa(null);
    setError(null);
    localStorage.removeItem('courses');
  };

  return (
    <div className="container">
      <h1>GPA Calculator</h1>
      {error && <div className="error">{error}</div>}

      {/* Grade Values Display */}
      <div className="grade-values">
        <h3>Grade Values</h3>
        <ul>
          {Object.entries(gradeValues).map(([grade, value]) => (
            <li key={grade}>{grade} = {value}</li>
          ))}
        </ul>
      </div>

      {/* Course Form */}
      <form onSubmit={handleAddCourse} className="form">
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g., Math 101"
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>
        <div className="form-group">
          <label>Credits</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="e.g., 3"
            step="0.5"
            min="0"
          />
        </div>
        <button type="submit" className="button button-blue">Add Course</button>
      </form>

      {/* Calculate GPA */}
      <button onClick={calculateGpa} className="button button-green">Calculate GPA</button>

      {/* GPA Result */}
      {gpa && (
        <div className="result">
          <h2>Your GPA: {gpa}</h2>
        </div>
      )}

      {/* Course History */}
      {courses.length > 0 && (
        <div className="history">
          <h2>Course History</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                {course.name}: {course.grade} ({course.credits} credits)
              </li>
            ))}
          </ul>
          <button onClick={clearHistory} className="button button-red">Clear History</button>
        </div>
      )}
    </div>
  );
}