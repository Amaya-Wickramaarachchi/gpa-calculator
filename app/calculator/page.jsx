"use client";

import { useState, useEffect } from 'react';
import '../styles.css';

export default function Calculator() {
  const [user, setUser] = useState(null);
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

  // Load user and data
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(currentUser);
      const storedCourses = JSON.parse(localStorage.getItem(`courses_${currentUser}`) || '[]');
      const storedHistory = JSON.parse(localStorage.getItem(`semesterHistory_${currentUser}`) || '[]');
      setCourses(storedCourses);
      setSemesterHistory(storedHistory);
      calculateFgpa(storedHistory);
    } else {
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      setCourses(storedCourses);
    }
  }, []);

  // Save courses
  useEffect(() => {
    if (user) {
      localStorage.setItem(`courses_${user}`, JSON.stringify(courses));
    } else {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses, user]);

  // Save semester history
  useEffect(() => {
    if (user) {
      localStorage.setItem(`semesterHistory_${user}`, JSON.stringify(semesterHistory));
      calculateFgpa(semesterHistory);
    }
  }, [semesterHistory, user]);

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

  // Save semester (registered users)
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

  // Download report (registered users)
  const downloadReport = () => {
    if (!user || !gpa) {
      setError('Calculate GPA to download a report');
      return;
    }
    const report = `
GPA Calculator Report
--------------------
Username: ${user}
Academic Year: ${academicYear}
Semester: ${semester}
Label: ${semesterLabel || 'N/A'}
Date: ${new Date().toLocaleDateString()}

Semester Courses:
Course Name | Grade | Credits
${courses.map((course) => `${course.name.padEnd(20)} | ${course.grade.padEnd(5)} | ${course.credits}`).join('\n')}

Semester GPA: ${gpa}
Overall GPA: ${fgpa || 'N/A'}

Motivational Message:
${motivation}
    `;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gpa_report_${user}_${academicYear}_${semester}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear history
  const clearHistory = () => {
    setCourses([]);
    setGpa(null);
    setMotivation('');
    setError(null);
    if (user) {
      localStorage.removeItem(`courses_${user}`);
    } else {
      localStorage.removeItem('courses');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setCourses(JSON.parse(localStorage.getItem('courses') || '[]'));
    setSemesterHistory([]);
    setGpa(null);
    setFgpa(null);
    setMotivation('');
    setAcademicYear('');
    setSemester('');
  };

  return (
    <div className="container">
      <h1>GPA Calculator</h1>
      {user && (
        <div className="user-info">
          <p>Logged in as: {user}</p>
          <button onClick={handleLogout} className="button button-red">Logout</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {motivation && <div className="motivation">{motivation}</div>}

      {/* Academic Year and Semester Selection */}
      <form className="form">
        <div className="form-group">
          <label>Academic Year</label>
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
          <label>Semester</label>
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
            <label>Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Math 101"
            />
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
          <div className="form-group">
            <label>Grade</label>
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
            <label>Weight</label>
            <select value={weight} onChange={(e) => setWeight(e.target.value)}>
              <option value="Regular">Regular</option>
              <option value="Weight">Weight</option>
            </select>
          </div>
          <button type="submit" className="button button-blue">Add Course</button>
        </form>
      )}

      {/* Calculate GPA */}
      {courses.length > 0 && (
        <button onClick={calculateGpa} className="button button-green">Calculate GPA</button>
      )}

      {/* Semester Course Table and GPA */}
      {courses.length > 0 && (
        <div className="history">
          <h2>{semesterLabel || `${semester} Courses`}</h2>
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
              <h2>Semester GPA: {gpa}</h2>
            </div>
          )}
          <button onClick={clearHistory} className="button button-red">Clear Courses</button>
        </div>
      )}

      {/* Save Semester and Download Report (Registered Users) */}
      {user && gpa && (
        <div className="form">
          <form onSubmit={saveSemester} className="form">
            <div className="form-group">
              <label>Semester Label</label>
              <input
                type="text"
                value={semesterLabel}
                onChange={(e) => setSemesterLabel(e.target.value)}
                placeholder="e.g., Fall 2025"
              />
            </div>
            <button type="submit" className="button button-blue">Save Semester</button>
          </form>
          <button onClick={downloadReport} className="button button-green">Download Report</button>
        </div>
      )}

      {/* Overall GPA (Registered Users) */}
      {user && fgpa && (
        <div className="result">
          <h2>Overall GPA: {fgpa}</h2>
        </div>
      )}

      {/* Semester History (Registered Users) */}
      {user && semesterHistory.length > 0 && (
        <div className="history">
          <h2>Semester History</h2>
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
                <h2>Semester GPA: {sem.gpa}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grade Values Table (Bottom) */}
      <div className="grade-values">
        <h3>Grade Values</h3>
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