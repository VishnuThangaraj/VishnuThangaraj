### Developer Profile

```json
{
  "name": "Vishnu Thangaraj",
  "title": "Software Development Engineer",
  "engineering_pillars": [
    "Modern Full-Stack Platforms (MERN & React/MUI)",
    "Native Android Ecosystems"
  ],
  "persistence_cache": ["MongoDB", "PostgreSQL", "MySQL"]
}
```

- **Modern Full-Stack Applications:** Engineering responsive web frontends in **React & MUI** backed by asynchronous, low-latency APIs built using the **MERN Stack** (MongoDB, Express.js, React, Node.js).
- **Containerization & Deployment:** Building containerized multi-stage deployments and managing environments with **Docker**.

---

### Technical Arsenal

<div align="center">
  <p><strong>Curated Technologies, Stacks, Runtimes & Glass Tooling</strong></p>
  <br>

  <!-- Frontend & UI Layer -->
  <p><code>CLIENT & INTERFACE LAYER</code></p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=react%2Credux%2Ctailwind%2Cvite%2Chtml%2Ccss%2Cjs%2Cts%2Cbootstrap&theme=dark&perline=9">
    <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=react%2Credux%2Ctailwind%2Cvite%2Chtml%2Ccss%2Cjs%2Cts%2Cbootstrap&theme=light&perline=9">
    <img src="https://skillicons.dev/icons?i=react,redux,tailwind,vite,html,css,js,ts,bootstrap&perline=9" alt="Frontend Arsenal" />
  </picture>
  <br><br>

  <!-- Backend, Mobile & Systems -->
  <p><code>BACKEND, MOBILE & SYSTEMS ENGINE</code></p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nodejs%2Cexpress%2Cfastapi%2Cpy%2Candroidstudio&theme=dark&perline=5">
    <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nodejs%2Cexpress%2Cfastapi%2Cpy%2Candroidstudio&theme=light&perline=5">
    <img src="https://skillicons.dev/icons?i=nodejs,express,fastapi,py,androidstudio&perline=5" alt="Backend & Mobile Arsenal" />
  </picture>
  <br><br>

  <!-- Databases, DevOps & Cloud Persistence -->
  <p><code>PERSISTENCE & INFRASTRUCTURE</code></p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=mongodb%2Cmysql%2Cpostgres%2Cdocker%2Cgit%2Cgithub%2Cpostman%2Clinux&theme=dark&perline=8">
    <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=mongodb%2Cmysql%2Cpostgres%2Cdocker%2Cgit%2Cgithub%2Cpostman%2Clinux&theme=light&perline=8">
    <img src="https://skillicons.dev/icons?i=mongodb,mysql,postgres,docker,git,github,postman,linux&perline=8" alt="Databases & DevOps Arsenal" />
  </picture>
  <br><br>
</div>

<details>
<summary><b>View Comprehensive Matrix & Technology Specifications (Click to expand)</b></summary>
<br>

| Domain                  | Technologies & Stacks                                                                        | Capabilities & Engineering Focus                                                                                                |
| :---------------------- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend & Web**      | `React` `MUI` `Redux Toolkit` `Vite` `Tailwind CSS` `JavaScript` `TypeScript` `HTML5` `CSS3` | Single Page Apps (SPA), State Management, Responsive Design, Component Lifecycle, Asynchronous UI, Liquid Glass Aesthetics      |
| **Mobile & Android**    | `Android Studio` `Material Design` `Room DB` `Firebase`                                      | MVVM Architecture, Jetpack Components, Local SQLite/Room Caching, Retrofit REST Clients, Push Notifications, Background Workers |
| **Backend & APIs**      | `Node.js` `Express.js` `FastAPI` `Python`                                                    | RESTful API Architecture, JWT/OAuth2 Authentication, Asynchronous Processing, Middleware Design, Microservices Ecosystem        |
| **Databases & Storage** | `MongoDB` `MySQL` `PostgreSQL`                                                               | NoSQL Document Modeling, Relational Normalization & Indexing, Query Optimization, ACID Transactions                             |
| **DevOps & Tooling**    | `Docker` `Git` `GitHub` `Postman` `Linux` `Gradle`                                           | Containerization, Version Control & GitFlow, Automated API Testing, Unix CLI Automation, Dependency Management                  |

</details>

---

### System Architecture Workflow

<div align="center">
  <p><strong>End-to-End Enterprise & Liquid-Clean Data Flow</strong></p>
</div>

```mermaid
flowchart LR
    %% Presentation Tier
    subgraph Presentation["Presentation & Client Tier"]
        direction TB
        Web["React.js SPA<br/>(Vite • MUI • Redux)"]
        Mobile["Native Android App<br/>(Android Studio • MVVM)"]
    end

    %% Security & Gateway
    subgraph Gateway["Security & API Gateway"]
        direction TB
        Auth["Reverse Proxy & JWT Auth<br/>(Rate Limiting • CORS • SSL)"]
    end

    %% Microservices Tier
    subgraph Services["Backend Microservices"]
        direction TB
        FastAPIService["FastAPI (Python)<br/>High-Speed Asynchronous API"]
        NodeService["Express.js / Node.js<br/>Real-Time Business Logic"]
    end

    %% Persistence Tier
    subgraph Persistence["Persistence & Storage Tier"]
        direction TB
        MongoDB[("MongoDB<br/>Document Store")]
        RelationalDB[("PostgreSQL / MySQL<br/>ACID Relational Data")]
    end

    %% Flow Connections
    Presentation ==> Gateway
    Gateway ==> Services

    FastAPIService --> MongoDB
    NodeService --> MongoDB
    NodeService --> RelationalDB
```

</div>
