const { describe, it, expect } = require('@jest/globals');

function calculateGpa(courses) {
  const totalPoints = courses.reduce((sum, course) => sum + course.points, 0);
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
}

describe('calculateGpa', () => {
  it('calculates GPA correctly', () => {
    const courses = [
      { points: 12, credits: 3 }, // A (4.0) * 3 credits
      { points: 9, credits: 3 },  // B (3.0) * 3 credits
    ];
    expect(calculateGpa(courses)).toBe('3.50');
  });
});