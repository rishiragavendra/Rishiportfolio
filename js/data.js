/* ============================================================
   CONTENT DATA — domain panels and skill categories
   Edit here to change what the tabbed sections show.
   ============================================================ */
window.DOMAIN_DATA = {
  aiml: {
    title: "AI / Machine Learning",
    body: "I use ML where a decision has to be explainable, not just accurate — credit calls, risk scores, flagged listings. The model is one layer; the reasoning shown to the person acting on it matters just as much.",
    chips: ["XGBoost", "scikit-learn", "Pandas", "NumPy", "SHAP", "NLP"],
    points: [
      "<b>Gradient-boosted scoring</b> — XGBoost models for MSME financial health in CredEcho, with SHAP-style attribution behind every approve / reject.",
      "<b>Text &amp; signal classification</b> — coded-slang and emoji detection over marketplace listings in TRACE.",
      "<b>Geospatial ML</b> — flood-risk scoring from elevation, historical boundaries and precipitation trends in FloodFax AI.",
      "<b>Pipelines</b> — feature engineering, synthetic dataset generation and evaluation over Pandas and NumPy."
    ]
  },
  cyber: {
    title: "Cybersecurity",
    body: "My degree specialisation and the thing I compete in. CTFs keep the offensive instinct sharp; that same instinct is what makes me design auth, roles and audit trails properly on the build side.",
    chips: ["Burp Suite", "Wireshark", "Nmap", "Linux", "RBAC", "SHA-256"],
    points: [
      "<b>Competitive security</b> — Top 8 at Trivarna CTF 2.0 (1300+ entrants), finalist at Zodiak CTF (VIT Vellore), 3rd at ExoQuest CTF.",
      "<b>Practice areas</b> — web exploitation, cryptography, forensics and OSINT.",
      "<b>Defensive engineering</b> — role-based access control, secure authentication, append-only audit logs and SHA-256 evidence integrity in METRA and TRACE.",
      "<b>Fundamentals</b> — networking, Linux and protocol-level analysis underpinning both sides."
    ]
  },
  fullstack: {
    title: "Full-Stack Engineering",
    body: "End to end: schema, service, API, interface, container. Most of my projects exist because the domain logic and the interface had to be designed together — a compliance verdict or a provenance result is useless if the person reading it can't act on it.",
    chips: ["React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "Docker"],
    points: [
      "<b>Frontend</b> — React, Next.js, TypeScript, Tailwind CSS and Vite; responsive, accessible interfaces.",
      "<b>Backend</b> — Node.js / Express and Python FastAPI &amp; Flask services over PostgreSQL, MySQL, SQLite and Redis.",
      "<b>Delivery</b> — Docker and Docker Compose, Git-based workflow, testing with pytest.",
      "<b>Professional</b> — shipped production frontend and REST API integration work at SafeNServe Pvt Ltd."
    ]
  },
  blockchain: {
    title: "Blockchain",
    body: "I reach for a chain when the point is that no single party can quietly rewrite history. In Honey Chain that's exactly the requirement — a supply chain where each actor's claim has to survive later scrutiny by a regulator or a buyer.",
    chips: ["Solidity", "Hardhat", "Sepolia", "Web3", "On-chain RBAC"],
    points: [
      "<b>Smart contracts</b> — Solidity development with the Hardhat toolchain, deployed against the Sepolia testnet.",
      "<b>Access control on-chain</b> — role-gated writes so beekeepers, labs and processors can only record what they're authorised to.",
      "<b>Provenance modelling</b> — batch identity, custody transfers, split / merge and mass-balance validation to block phantom volume.",
      "<b>Verification</b> — consumer-facing QR resolution returning explicit verified / suspicious / recalled states."
    ]
  },
  fintech: {
    title: "Fintech",
    body: "Financial systems are where correctness stops being academic. I'm drawn to the inclusion side of it — scoring borrowers the formal system can't see, and making the resulting decision auditable rather than a black box.",
    chips: ["Credit scoring", "OCEN / AA", "Secure auth", "Transaction data", "XGBoost"],
    points: [
      "<b>Alternative-data credit scoring</b> — CredEcho scores thin-file MSMEs 0–100 from GST, UPI, bank statements, invoices and utility payments.",
      "<b>Explainable decisioning</b> — ten scoring dimensions with attributed reasoning behind approve / approve-with-conditions / reject.",
      "<b>India stack context</b> — designed against the ULI, OCEN and Account Aggregator frameworks.",
      "<b>Secure transaction systems</b> — authenticated full-stack financial dashboards over relational stores."
    ]
  }
};

window.SKILL_DATA = {
  languages: {
    title: "Languages",
    note: "What I write day to day, and the context each one shows up in.",
    items: [
      ["Python", ["AI / ML", "Backend", "Security"]],
      ["JavaScript", ["Frontend", "Full-Stack"]],
      ["TypeScript", ["Next.js", "BeeSure"]],
      ["C / C++", ["Systems", "DSA"]],
      ["SQL", ["Databases", "Backend"]],
      ["Solidity", ["Smart contracts"]]
    ]
  },
  frontend: {
    title: "Frontend & Web",
    note: "Interfaces built to be read and acted on, not just looked at.",
    items: [
      ["React.js", ["Dashboards", "Full-Stack"]],
      ["Next.js", ["CredEcho", "METRA"]],
      ["HTML / CSS", ["SafeNServe", "Responsive"]],
      ["Tailwind CSS", ["UI engineering"]],
      ["Vite", ["BeeSure"]],
      ["Responsive & Accessible UI", ["Cross-browser"]]
    ]
  },
  backend: {
    title: "Backend & APIs",
    note: "Services, schemas and the contracts between them.",
    items: [
      ["Node.js", ["Abyssal Sync", "BeeSure"]],
      ["Express.js", ["REST services"]],
      ["FastAPI", ["METRA", "TRACE"]],
      ["REST APIs", ["SafeNServe", "Full-Stack"]],
      ["PostgreSQL / MySQL / SQLite", ["Schema design"]],
      ["Redis", ["Caching"]],
      ["Docker", ["Deployment"]]
    ]
  },
  aiml: {
    title: "AI & Machine Learning",
    note: "Models chosen for explainability as much as accuracy.",
    items: [
      ["XGBoost", ["CredEcho", "Scoring models"]],
      ["scikit-learn", ["Classification"]],
      ["Pandas / NumPy", ["Data pipelines"]],
      ["Model Explainability (SHAP)", ["Lending decisions"]],
      ["Text & NLP Classification", ["TRACE"]],
      ["Geospatial ML", ["FloodFax AI"]]
    ]
  },
  cyber: {
    title: "Cybersecurity",
    note: "Competitive offence, and the defensive design it teaches.",
    items: [
      ["CTF Competition", ["Web", "Crypto", "Forensics", "OSINT"]],
      ["Burp Suite", ["Web testing"]],
      ["Wireshark / Nmap", ["Network analysis"]],
      ["Linux", ["Tooling"]],
      ["Secure Auth & RBAC", ["METRA", "BeeSure"]],
      ["Hashing & Integrity (SHA-256)", ["Evidence vault"]],
      ["Networking Fundamentals", ["Protocols"]]
    ]
  },
  chain: {
    title: "Blockchain & Fintech",
    note: "Foundational, project-backed work — not claimed expertise.",
    items: [
      ["Solidity", ["HoneyChain.sol"]],
      ["Hardhat", ["Testing", "Deployment"]],
      ["Ethereum / Sepolia Testnet", ["BeeSure"]],
      ["On-Chain Provenance & RBAC", ["Supply chain"]],
      ["Alternative-Data Credit Scoring", ["CredEcho"]],
      ["OCEN / Account Aggregator concepts", ["India stack"]]
    ]
  }
};
