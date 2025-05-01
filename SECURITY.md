# Security Policy

## Supported Versions

The following versions of the **GPA Calculator Micro SaaS** are currently supported with security updates. Only the latest minor releases in supported major versions receive security patches.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| 0.9.x   | :x:                |
| 0.8.x   | :white_check_mark: |
| < 0.8   | :x:                |

*Note*: The current implementation (as of April 2025) is on the `feature/enhanced-landing-page` branch, considered version 1.0.x. Older branches or releases may not receive security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in the GPA Calculator, we appreciate your help in responsibly disclosing it to us. Please follow these steps:

1. **Where to Report**:
   - Submit a private report via a [GitHub Issue](https://github.com/Amaya-Wickramaarachchi/gpa-calculator/issues) with the label "Security Vulnerability."
   - Alternatively, contact the maintainer directly through the course platform (System Administration & Maintenance, IT31023) for sensitive issues.

2. **What to Include**:
   - A detailed description of the vulnerability (e.g., XSS in course input, LocalStorage data exposure).
   - Steps to reproduce the issue (e.g., specific inputs, browser version).
   - Potential impact (e.g., data leakage, UI manipulation).
   - Any suggested mitigations, if applicable.

3. **Response Timeline**:
   - **Acknowledgment**: You will receive an acknowledgment within **48 hours** of your report.
   - **Initial Assessment**: We will evaluate the vulnerability within **5 business days** and provide an update on its validity.
   - **Resolution**: If accepted, a fix will be prioritized and deployed within **14 days**, depending on severity. You will be notified of the fix release.
   - **Declined Reports**: If the vulnerability is not applicable (e.g., outside project scope or low impact), we will explain the reason and close the issue.

4. **Expectations**:
   - **Accepted Vulnerabilities**: Critical issues (e.g., XSS affecting user data) will be fixed promptly, with credit given in release notes (unless you prefer anonymity).
   - **Declined Vulnerabilities**: Issues not affecting security (e.g., UI bugs) or not reproducible will be declined with an explanation.
   - **Confidentiality**: Please do not disclose the vulnerability publicly until we have released a fix and notified users.

5. **Security Scope**:
   - **In Scope**: Client-side vulnerabilities (e.g., XSS in `app/calculator/page.jsx`, LocalStorage misuse), dependency issues (e.g., outdated Next.js), and deployment misconfigurations (e.g., Vercel CORS settings).
   - **Out of Scope**: Server-side vulnerabilities (no backend in current implementation), user device security, or third-party services (e.g., Font Awesome, Google Fonts).

For questions or assistance, open an issue on [GitHub](https://github.com/Amaya-Wickramaarachchi/gpa-calculator/issues) or contact the maintainer via the course platform.

*This policy is part of the GPA Calculator project, developed for IT31023, Intake 11 Term 1.*
