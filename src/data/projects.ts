export type Project = {
  name: string;
  type: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  architecture: string[];
  highlights: string[];
  github: string;
};

export const projects: Project[] = [
  {
    name: "NetSage",
    type: "AI Network Troubleshooting",
    description:
      "An AI-assisted network troubleshooting system that combines evidence-based AI diagnosis, deterministic validation, Cisco Packet Tracer scenarios, and human review.",
    tech: [
      "Python",
      "AI / LLM",
      "Networking",
      "Cisco Packet Tracer",
      "Data / CSV",
    ],
    problem:
      "Network troubleshooting can require manual inspection of symptoms, configuration, topology, and command output. The system was designed to make diagnosis more structured, evidence-driven, and verifiable.",
    solution:
      "NetSage takes structured network evidence, applies AI reasoning within an evidence-bound workflow, validates diagnoses with a deterministic Python checker, and routes results through human review before accepting the diagnosis.",
    architecture: [
      "Packet Tracer network scenarios",
      "Structured evidence input",
      "AI diagnosis and reasoning",
      "Deterministic Python validation",
      "Human review",
      "Fix and verification workflow",
      "Results dashboard",
    ],
    highlights: [
      "30 structured troubleshooting cases",
      "Deterministic Python checker with automated validation",
      "Evidence-bound diagnosis with confidence scoring",
      "Explicit insufficient-evidence handling instead of forced guessing",
      "OSI-layer-based troubleshooting reasoning",
      "Human review built into the workflow",
    ],
    github: "",
  },
  {
    name: "AttendIQ",
    type: "Attendance Intelligence",
    description:
      "An attendance analytics project designed to analyze attendance patterns and generate useful insights.",
    tech: ["Python", "Data Analytics", "Machine Learning"],
    problem:
      "Attendance data can contain patterns that are difficult to identify through manual inspection alone.",
    solution:
      "AttendIQ analyzes attendance data to identify patterns and generate structured insights that can support better understanding of attendance behavior.",
    architecture: [
      "Attendance data",
      "Data preprocessing",
      "Exploratory analysis",
      "Analytics / modeling",
      "Insights and visualization",
    ],
    highlights: [
      "Attendance-focused data analysis",
      "Pattern and relationship analysis",
      "Structured analytical workflow",
    ],
    github: "",
  },
  {
    name: "Payment System",
    type: "Payment Processing",
    description:
      "A payment-system project focused on understanding payment flows, backend architecture, and transaction processing.",
    tech: ["Node.js", "API", "Database", "Backend"],
    problem:
      "Payment workflows require reliable handling of requests, transaction state, backend services, and data persistence.",
    solution:
      "The project explores the backend flow of a payment system, including API-driven processing, transaction handling, and database interaction.",
    architecture: [
      "Client request",
      "Backend API",
      "Payment processing flow",
      "Database",
      "Transaction response",
    ],
    highlights: [
      "Backend-oriented payment workflow",
      "API-based architecture",
      "Transaction and database concepts",
    ],
    github: "",
  },
];
