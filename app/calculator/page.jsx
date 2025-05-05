"use client";

import { useState, useEffect, useRef } from "react";
import '../style.css';

export default function GPACalculator() {
  const [academicYear, setAcademicYear] = useState("1");
  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: "Semester 1",
      courses: [{ id: 1, name: "", credits: 3, grade: "A" }],
      gpa: 0,
    },
  ]);
  const [fgpa, setFgpa] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const gradePoints = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  const grades = Object.keys(gradePoints);

  const calculateGPA = (courses) => {
    if (!courses.length) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits) || 0;
      totalCredits += credits;
      totalPoints += credits * (gradePoints[course.grade] || 0);
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateAllGPAs = () => {
    // Calculate individual semester GPAs
    const updatedSemesters = semesters.map((semester) => {
      return {
        ...semester,
        gpa: calculateGPA(semester.courses),
      };
    });

    // Calculate FGPA (Final GPA) across all semesters
    let totalPoints = 0;
    let totalCredits = 0;

    updatedSemesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        const credits = parseFloat(course.credits) || 0;
        totalCredits += credits;
        totalPoints += credits * (gradePoints[course.grade] || 0);
      });
    });

    const calculatedFGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    
    return {
      updatedSemesters,
      calculatedFGPA
    };
  };


  useEffect(() => {
    const { updatedSemesters, calculatedFGPA } = calculateAllGPAs();
    setSemesters(updatedSemesters);
    setFgpa(calculatedFGPA);
  }, [JSON.stringify(semesters.map(s => s.courses))]);

  const addSemester = () => {
    const newId = semesters.length + 1;
    setSemesters([
      ...semesters,
      {
        id: newId,
        name: `Semester ${newId}`,
        courses: [{ id: 1, name: "", credits: 3, grade: "A" }],
        gpa: 0,
      },
    ]);
  };

  const removeSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((semester) => semester.id !== semesterId));
    }
  };

  const addCourse = (semesterId) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          const newCourseId =
            semester.courses.length > 0
              ? Math.max(...semester.courses.map((c) => c.id)) + 1
              : 1;
          return {
            ...semester,
            courses: [
              ...semester.courses,
              { id: newCourseId, name: "", credits: 3, grade: "A" },
            ],
          };
        }
        return semester;
      })
    );
  };

  const removeCourse = (semesterId, courseId) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          // Only remove if there's more than one course
          if (semester.courses.length > 1) {
            return {
              ...semester,
              courses: semester.courses.filter((course) => course.id !== courseId),
            };
          }
        }
        return semester;
      })
    );
  };

  const handleCourseChange = (semesterId, courseId, field, value) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            courses: semester.courses.map((course) => {
              if (course.id === courseId) {
                return { ...course, [field]: value };
              }
              return course;
            }),
          };
        }
        return semester;
      })
    );
  };

  const handleSemesterNameChange = (semesterId, newName) => {
    setSemesters(
      semesters.map((semester) => {
        if (semester.id === semesterId) {
          return { ...semester, name: newName };
        }
        return semester;
      })
    );
  };

  const getLetterGradeClass = (gpa) => {
    if (gpa >= 3.7) return "text-green-600";
    if (gpa >= 3.0) return "text-blue-600";
    if (gpa >= 2.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getLetterGrade = (gpa) => {
    if (gpa >= 4.0) return "A";
    if (gpa >= 3.7) return "A-";
    if (gpa >= 3.3) return "B+";
    if (gpa >= 3.0) return "B";
    if (gpa >= 2.7) return "B-";
    if (gpa >= 2.3) return "C+";
    if (gpa >= 2.0) return "C";
    if (gpa >= 1.7) return "C-";
    if (gpa >= 1.3) return "D+";
    if (gpa >= 1.0) return "D";
    return "F";
  };

  const generatePDF = () => {
    // Use the browser's print functionality to save as PDF
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert("Please allow pop-ups to generate the PDF report");
      return;
    }

    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GPA Report - ${studentName || "Student"}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            color: #003366;
            margin-bottom: 20px;
          }
          .student-info {
            margin-bottom: 20px;
          }
          .fgpa-summary {
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 4px;
          }
          .semester {
            margin-bottom: 30px;
          }
          .semester-header {
            background-color: #dcdcdc;
            padding: 8px;
            font-weight: bold;
            border-radius: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background-color: #f0f0f0;
            padding: 8px;
            text-align: left;
            border: 1px solid #ddd;
          }
          td {
            padding: 8px;
            border: 1px solid #ddd;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
          }
          .grade-a {
            color: #2b8a3e;
          }
          .grade-b {
            color: #1864ab;
          }
          .grade-c {
            color: #e67700;
          }
          .grade-d, .grade-f {
            color: #c92a2a;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>GPA Report</h1>
        </div>
        
        <div class="student-info">
          <p><strong>Name:</strong> ${studentName || "Not Provided"}</p>
          <p><strong>Student ID:</strong> ${studentId || "Not Provided"}</p>
          <p><strong>Academic Year:</strong> Year ${academicYear}</p>
        </div>
        
        <div class="fgpa-summary">
          <h2>Final GPA: ${fgpa.toFixed(2)} (${getLetterGrade(fgpa)})</h2>
        </div>
        
        ${semesters.map(semester => `
          <div class="semester">
            <div class="semester-header">
              ${semester.name}: GPA ${semester.gpa.toFixed(2)} (${getLetterGrade(semester.gpa)})
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                ${semester.courses.map(course => `
                  <tr>
                    <td>${course.name || "Unnamed Course"}</td>
                    <td>${course.credits}</td>
                    <td>${course.grade}</td>
                    <td>${(gradePoints[course.grade] * course.credits).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(reportContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            GPA Calculator
          </h1>

          {/* Student Information */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Your ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
                <option value="6">Year 6</option>
              </select>
            </div>
          </div>

          {/* Final GPA Display */}
          <div className="mb-8 bg-blue-50 p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-1">Final GPA</h2>
            <div className={`text-4xl font-bold ${getLetterGradeClass(fgpa)}`}>
              {fgpa.toFixed(2)}
            </div>
          </div>

          {/* Report Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={generatePDF}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              <span className="mr-2">⬇️</span>
              Download GPA Report
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              <span className="mr-2">🖨️</span>
              Print Report
            </button>
          </div>

          {/* Semesters */}
          <div className="space-y-8">
            {semesters.map((semester) => (
              <div
                key={semester.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="font-semibold text-lg bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      value={semester.name}
                      onChange={(e) =>
                        handleSemesterNameChange(semester.id, e.target.value)
                      }
                    />
                    <div className="ml-4 bg-blue-100 px-3 py-1 rounded">
                      GPA: {semester.gpa.toFixed(2)} ({getLetterGrade(semester.gpa)})
                    </div>
                  </div>
                  <button
                    onClick={() => removeSemester(semester.id)}
                    disabled={semesters.length === 1}
                    className={`text-red-500 ${
                      semesters.length === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:text-red-700"
                    }`}
                  >
                    <span className="text-xl">🗑️</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Course Name</th>
                        <th className="px-4 py-2 text-left">Credits</th>
                        <th className="px-4 py-2 text-left">Grade</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={course.name}
                              onChange={(e) =>
                                handleCourseChange(
                                  semester.id,
                                  course.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Course Name"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <select
                              className="w-full p-1 border border-gray-300 rounded"
                              value={course.credits}
                              onChange={(e) =>
                                handleCourseChange(
                                  semester.id,
                                  course.id,
                                  "credits",
                                  e.target.value
                                )
                              }
                            >
                              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(
                                (credit) => (
                                  <option key={credit} value={credit}>
                                    {credit}
                                  </option>
                                )
                              )}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            <select
                              className={`w-full p-1 border border-gray-300 rounded ${
                                course.grade === "F"
                                  ? "text-red-600"
                                  : course.grade === "A" || course.grade === "A+"
                                  ? "text-green-600"
                                  : ""
                              }`}
                              value={course.grade}
                              onChange={(e) =>
                                handleCourseChange(
                                  semester.id,
                                  course.id,
                                  "grade",
                                  e.target.value
                                )
                              }
                            >
                              {grades.map((grade) => (
                                <option key={grade} value={grade}>
                                  {grade}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => removeCourse(semester.id, course.id)}
                              disabled={semester.courses.length === 1}
                              className={`text-red-500 ${
                                semester.courses.length === 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:text-red-700"
                              }`}
                            >
                              <span className="text-lg">🗑️</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => addCourse(semester.id)}
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="mr-1 text-lg">➕</span>
                  Add Course
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={addSemester}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center mx-auto"
            >
              <span className="mr-2 text-lg">➕</span>
              Add Semester
            </button>
          </div>
        </div>

        {/* GPA Scale Reference */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <span className="mr-2 text-blue-800 text-lg">📄</span>
            <h2 className="text-xl font-semibold">GPA Scale Reference</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gradePoints).map(([grade, point]) => (
              <div key={grade} className="border rounded p-2 text-center">
                <div className="font-bold">{grade}</div>
                <div>{point.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}