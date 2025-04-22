"use client";

import { useState, useEffect } from 'react';
import '../styles.css';

export default function Calculator() {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState('');
  const [grade, setGrade] = useState('');
  const [weight, setWeight] = useState('Regular');
  const [gpa, setGpa] = useState(null);
  const [fgpa, setFgpa] = useState(null);
  const [semesterLabel, setSemesterLabel] = useState('');
  const [semesterHistory, setSemesterHistory] = useState([]);
  const [error, setError] = useState(null);
  const [motivation, setMotivation] = useState('');

  // Grade system
  const gradeSystem = [
    { grade: 'A+', points: 4.00, marks: '85-100' },
    { grade: 'A', points: 4.00, marks: '75-84' },
    { grade: 'A-', points: 3.70, marks: '70-74' },
    { grade: 'B+', points: 3.30, marks: '65-69' },
    { grade: 'B', points: 3.00, marks: '60-64' },
    { grade: 'B-', points: 2.70, marks: '55-59' },
    { grade: 'C+', points: 2.30, marks: '50-54' },
    { grade: 'C', points: 2.00, marks: '40-49' },
    { grade: 'C-', points: 1.70, marks: '35-39' },
    { grade: 'D+', points: 1.30, marks: '30-34' },
    { grade: 'D', points: 1.00, marks: '25-29' },
    { grade: 'F', points: 0.00, marks: '<25' },
  ];

  // Load data
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const storedHistory = JSON.parse(localStorage.getItem('semesterHistory') || '[]');
    setCourses(storedCourses);
    setSemesterHistory(storedHistory);
    calculateFgpa(storedHistory);
  }, []);

  // Save courses
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // Save semester history
  useEffect(() => {
    localStorage.setItem('semesterHistory', JSON.stringify(semesterHistory));
    calculateFgpa(semesterHistory);
  }, [semesterHistory]);

  // Calculate FGPA
  const calculateFgpa = (history) => {
    if (history.length === 0) {
      setFgpa(null);
      return;
    }
    const totalPoints = history.reduce((sum, semester) => sum + semester.gpa * semester.totalCredits, 0);
    const totalCredits = history.reduce((sum, semester) => sum + semester.totalCredits, 0);
    const fgpa = (totalCredits > 0 ? totalPoints / totalCredits : 0).toFixed(2);
    setFgpa(parseFloat(fgpa));
  };

  // Get grade points
  const getGradePoints = (grade, isWeighted) => {
    const gradeInfo = gradeSystem.find((g) => g.grade === grade);
    if (!gradeInfo) return null;
    return isWeighted ? gradeInfo.points * 1.1 : gradeInfo.points;
  };

  // Add course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!academicYear || !semester) {
      setError('Please select academic year and semester');
      return;
    }
    if (!courseName || !credits || !grade) {
      setError('Please fill in all fields');
      return;
    }
    const points = getGradePoints(grade, weight === 'Weight');
    if (points === null) {
      setError('Invalid grade');
      return;
    }
    const creditValue = parseFloat(credits);
    if (isNaN(creditValue) || creditValue <= 0) {
      setError('Invalid credits');
      return;
    }
    const course = {
      name: courseName,
      credits: creditValue,
      grade,
      weight,
      points: points * creditValue,
    };
    setCourses([...courses, course]);
    setCourseName('');
    setCredits('');
    setGrade('');
    setWeight('Regular');
    setError(null);
  };

  // Calculate GPA
  const calculateGpa = () => {
    if (!academicYear || !semester) {
      setError('Please select academic year and semester');
      return;
    }
    if (courses.length === 0) {
      setError('No courses to calculate GPA');
      return;
    }
    const totalPoints = courses.reduce((sum, course) => sum + course.points, 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const gpa = (totalCredits > 0 ? totalPoints / totalCredits : 0).toFixed(2);
    setGpa(parseFloat(gpa));
    setError(null);
    // Motivational message
    if (gpa >= 3.70) {
      setMotivation('Outstanding work! Your GPA is exceptional—keep shining!');
    } else if (gpa >= 3.00) {
      setMotivation('Great job! Your GPA is strong—keep pushing forward!');
    } else if (gpa >= 2.00) {
      setMotivation('Good effort! There’s room to grow—stay focused and you’ll improve!');
    } else {
      setMotivation('Don’t give up! Let’s work on boosting that GPA together!');
    }
  };

  // Save semester
  const saveSemester = (e) => {
    e.preventDefault();
    if (!gpa) {
      setError('Calculate GPA first');
      return;
    }
    if (!semesterLabel) {
      setError('Enter a semester label');
      return;
    }
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const semester = {
      label: semesterLabel,
      academicYear,
      semester,
      gpa,
      totalCredits,
      courses: [...courses],
      date: new Date().toISOString(),
    };
    setSemesterHistory([...semesterHistory, semester]);
    setCourses([]);
    setGpa(null);
    setMotivation('');
    setSemesterLabel('');
    setAcademicYear('');
    setSemester('');
    setError(null);
  };

  // Download report
  const downloadReport = () => {
    if (!gpa) {
      setError('Calculate GPA to download a report');
      return;
    }
    const report = `
GPA Calculator Report
--------------------
Academic Year: ${academicYear}
Semester: ${semester}
Label: ${semesterLabel || 'N/A'}
Date: ${new Date().toLocaleDateString()}

Semester Courses:
${'Course Name'.padEnd(30)} | ${'Grade'.padEnd(7)} | ${'Credits'.padEnd(8)} | Weight
${'-'.repeat(30)} | ${'-'.repeat(7)} | ${'-'.repeat(8)} | -------
${courses.map((course) => `${course.name.padEnd(30)} | ${course.grade.padEnd(7)} | ${course.credits.toString().padEnd(8)} | ${course.weight}`).join('\n')}

Semester GPA: ${gpa}
${fgpa ? `Overall GPA: ${fgpa}` : ''}

Motivational Message:
${motivation}
    `;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gpa_report_${academicYear}_${semester}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear courses
  const clearHistory = () => {
    setCourses([]);
    setGpa(null);
    setMotivation('');
    setError(null);
    localStorage.removeItem('courses');
  };

  return (
    <div className="container">
      <h1><i className="fas fa-graduation-cap"></i> GPA Calculator</h1>
      {error && <div className="error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
      {motivation && <div className="motivation"><i className="fas fa-star"></i> {motivation}</div>}

      {/* Academic Year and Semester Selection */}
      <form className="form">
        <div className="form-group">
          <label><i className="fas fa-calendar"></i> Academic Year</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            disabled={courses.length > 0 || gpa}
          >
            <option value="">Select Year</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>
        <div className="form-group">
          <label><i className="fas fa-calendar-alt"></i> Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            disabled={courses.length > 0 || gpa}
          >
            <option value="">Select Semester</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
          </select>
        </div>
      </form>

      {/* Course Form */}
      {academicYear && semester && (
        <form onSubmit={handleAddCourse} className="form">
          <div className="form-group">
            <label><i className="fas fa-book"></i> Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Math 101"
            />
          </div>
          <div className="form-group">
            <label><i className="fas fa-credit-card"></i> Credits</label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="e.g., 3"
              step="0.5"
              min="0"
            />
          </div>
          <div className="form-group">
            <label><i className="fas fa-award"></i> Grade</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">Select Grade</option>
              {gradeSystem.map((g) => (
                <option key={g.grade} value={g.grade}>
                  {g.grade}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label><i className="fas fa-weight"></i> Weight</label>
            <select value={weight} onChange={(e) => setWeight(e.target.value)}>
              <option value="Regular">Regular</option>
              <option value="Weight">Weight</option>
            </select>
          </div>
          <button type="submit" className="button button-blue"><i className="fas fa-plus"></i> Add Course</button>
        </form>
      )}

      {/* Calculate GPA */}
      {courses.length > 0 && (
        <button onClick={calculateGpa} className="button button-green"><i className="fas fa-calculator"></i> Calculate GPA</button>
      )}

      {/* Semester Course Table and GPA */}
      {courses.length > 0 && (
        <div className="history">
          <h2><i className="fas fa-list"></i> {semesterLabel || `${semester} Courses`}</h2>
          <table className="course-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
                <th>Credits</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.grade}</td>
                  <td>{course.credits}</td>
                  <td>{course.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {gpa && (
            <div className="result">
              <h2><i className="fas fa-chart-line"></i> Semester GPA: {gpa}</h2>
            </div>
          )}
          <button onClick={clearHistory} className="button button-red"><i className="fas fa-trash"></i> Clear Courses</button>
        </div>
      )}

      {/* Save Semester and Download Report */}
      {gpa && (
        <div className="form">
          <form onSubmit={saveSemester} className="form">
            <div className="form-group">
              <label><i className="fas fa-tag"></i> Semester Label</label>
              <input
                type="text"
                value={semesterLabel}
                onChange={(e) => setSemesterLabel(e.target.value)}
                placeholder="e.g., Fall 2025"
              />
            </div>
            <button type="submit" className="button button-blue"><i className="fas fa-save"></i> Save Semester</button>
          </form>
          <button onClick={downloadReport} className="button button-green"><i className="fas fa-download"></i> Download Report</button>
        </div>
      )}

      {/* Overall GPA */}
      {fgpa && (
        <div className="result">
          <h2><i className="fas fa-trophy"></i> Overall GPA: {fgpa}</h2>
        </div>
      )}

      {/* Semester History */}
      {semesterHistory.length > 0 && (
        <div className="history">
          <h2><i className="fas fa-history"></i> Semester History</h2>
          {semesterHistory.map((sem, index) => (
            <div key={index} className="semester-block">
              <h3>{sem.label}</h3>
              <p>Academic Year: {sem.academicYear}, Semester: {sem.semester}</p>
              <table className="course-table">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Grade</th>
                    <th>Credits</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.courses.map((course, idx) => (
                    <tr key={idx}>
                      <td>{course.name}</td>
                      <td>{course.grade}</td>
                      <td>{course.credits}</td>
                      <td>{course.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="result">
                <h2><i className="fas fa-chart-line"></i> Semester GPA: {sem.gpa}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grade Values Table (Bottom) */}
      <div className="grade-values">
        <h3><i className="fas fa-table"></i> Grade Values</h3>
        <table className="grade-table">
          <thead>
            <tr>
              <th>Marks</th>
              <th>Grade</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            {gradeSystem.map((g, index) => (
              <tr key={index}>
                <td>{g.marks}</td>
                <td>{g.grade}</td>
                <td>{g.points.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}