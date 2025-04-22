# Journey Maps - GPA Calculator Micro SaaS

## Journey Map 1: Dasun, the College Student

### Overview
Dasun, a 26-year-old sophomore, needs to calculate her Semester 2 GPA (~3.64) and track progress to maintain her scholarship. She discovers the GPA Calculator online, uses it offline, and integrates it into her study routine.

### Stages

**Awareness:**

Actions: Searches “GPA calculator online” on Google during a study break. Finds GPA Calculator via Vercel link (https://gpa-calculator-git-feature-enhanced-landing-page.vercel.app).
Emotions: Curious, hopeful.
Pain Points: Overwhelmed by ad-heavy competitor sites.
Touchpoints: Google, social media (e.g., Reddit posts about GPA tools).
Opportunities: Improve SEO with keywords like “offline GPA calculator”.


**Consideration:**

Actions: Lands on homepage (app/page.jsx). Explores hero section, feature cards (GPA tracking, offline support), and “Get Started” button.
Emotions: Impressed by modern UI (navy-teal-orange, Poppins font).
Pain Points: Unsure if app works offline without testing.
Touchpoints: Landing page, feature cards.
Opportunities: Add a demo video showcasing offline mode.


**Decision:**

Actions: Clicks “Get Started”, navigates to calculator (app/calculator/page.jsx). Tests with one course (IT: A+, 3 credits).
Emotions: Relieved (intuitive form), confident (GPA displays correctly).
Pain Points: Initial confusion about weight options (Regular vs. Weight).
Touchpoints: Calculator page, course form.
Opportunities: Add tooltips explaining grade weights.


**Usage:**

Actions:
Inputs Semester 2 courses (IT: A+, 3 credits; MATH: A, 3 credits).
Calculates GPA (~3.64), saves semester as “Fall 2025” (saveSemester).
Clears history (clearSemesterHistory) to test reset.
Uses offline during study session (LocalStorage).


Emotions: Satisfied (accurate, fast), empowered (tracks progress).
Pain Points: No exportable PDF report for sharing.
Touchpoints: Course form, GPA display, save/clear buttons.
Opportunities:
Future: Add PDF report generation (AWS S3).
Future: Sync data across devices (AWS DynamoDB).




**Retention:**

Actions: Bookmarks app, uses weekly to update grades. Recommends to peers.
Emotions: Loyal, trusting.
Pain Points: No reminders for grade updates.
Touchpoints: Browser bookmark, peer chats.
Opportunities:
Future: Add push notifications for grade input.
Future: Gamify progress (e.g., GPA improvement badges).



**Metrics**

Success: Calculates GPA in <1 minute, saves semester, uses offline.
Engagement: Returns 2x/week, recommends to 3 peers.
Churn Risk: Stops if UI becomes clunky or data is lost.

## Journey Map 2: Dr. Patel, the Academic Advisor

### Overview

Ms. Amarasooriya, a 45-year-old advisor, needs to verify student GPAs and generate reports for advising sessions. He adopts the GPA Calculator for quick calculations and hypothetical scenarios.

### Stages

**Awareness:**  

Actions: Hears about GPA Calculator from a student during advising. Visits Vercel URL on desktop.
Emotions: Skeptical (prefers university systems), curious.
Pain Points: Distrust of non-official tools.
Touchpoints: Student recommendation, university email.
Opportunities: Partner with universities for credibility.


**Consideration:**

Actions: Reviews landing page (app/page.jsx). Notes clean design and feature cards (GPA calculation, report generation).
Emotions: Cautiously optimistic.
Pain Points: Unclear if tool supports multiple students.
Touchpoints: Landing page, “Get Started” button.
Opportunities: Highlight multi-student use cases on homepage.


**Decision:**

Actions: Navigates to calculator, inputs a student’s Semester 2 data (IT: A+, 3 credits; MATH: A, 3 credits) to test GPA (~3.64).
Emotions: Pleased (easy to use), reassured (accurate).
Pain Points: Grade system table unclear without context.
Touchpoints: Calculator page, grade table.
Opportunities: Add inline grade system explanation.


**Usage:**

Actions:
Inputs data for multiple students, calculates GPAs.
Saves semesters (saveSemester) for reference.
Downloads text report (downloadReport) for one student.
Tests “what if” scenarios (e.g., B+ instead of A).


Emotions: Efficient, satisfied.
Pain Points: Text reports lack professional formatting.
Touchpoints: Course form, report button, LocalStorage.
Opportunities:
Future: Generate PDF reports (AWS S3).
Future: Multi-user support (AWS DynamoDB).


**Retention:**

Actions: Uses app during advising sessions, shares with colleagues.
Emotions: Confident, reliant.
Pain Points: No cloud backup for data across devices.
Touchpoints: Advising sessions, email.
Opportunities:
Future: Cloud storage for advisor accounts.
Future: Analytics for student trends (Datadog).


**Metrics**

Success: Calculates GPA for 5 students in <5 minutes, downloads report.
Engagement: Uses in 80% of advising sessions.
Churn Risk: Abandons if data management becomes cumbersome.

