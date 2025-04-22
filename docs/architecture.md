# System Architecture

```mermaid
graph TD
    A[Student] -->|Uses| B[GPA Calculator Web App]
    B -->|Runs in| C[Web Browser]
    B -->|Fetches icons| D[Font Awesome CDN]
    B -->|Fetches font| E[Google Fonts]
    B -->|Deployed on| F[Vercel]

    classDef system fill:#1A3C5A,stroke:#2DD4BF,color:#FFFFFF;
    classDef user fill:#F97316,stroke:#1A3C5A,color:#FFFFFF;
    classDef external fill:#D1D5DB,stroke:#1A3C5A,color:#1F2937;

    class A user;
    class B system;
    class C,D,E,F external;