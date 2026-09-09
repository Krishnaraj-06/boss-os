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
      "Streamlit",
      "CSV",
    ],
    problem:
      "Junior network engineers can struggle to connect network symptoms with root causes across VLAN, gateway, DHCP, DNS, routing, ACL, NAT, and wireless failures.",
    solution:
      "NetSage accepts structured network evidence and symptoms, generates an evidence-bound AI diagnosis, independently validates findings using deterministic Python checks, and routes the diagnosis through mandatory human review before verification.",
    architecture: [
      "Cisco Packet Tracer scenarios",
      "Structured evidence input",
      "AI diagnosis and reasoning",
      "Deterministic Python validation",
      "Structured diagnosis output",
      "Human Accept / Edit / Reject review",
      "Fix and connectivity verification",
      "Results dashboard",
    ],
    highlights: [
      "30 structured troubleshooting cases",
      "Deterministic Python validation independent of the AI",
      "Evidence-bound diagnosis with confidence scoring",
      "Explicit insufficient-evidence handling",
      "OSI-layer-based troubleshooting reasoning",
      "Human review and correction workflow",
      "AI-human agreement analysis",
      "Cisco Packet Tracer network scenarios",
    ],
    github: "",
  },

  {
    name: "AttendIQ",
    type: "Smart Attendance Management System",
    description:
      "A full-stack attendance management platform combining QR attendance, face verification, geolocation validation, real-time updates, analytics, and attendance-risk prediction.",
    tech: [
      "Node.js",
      "Express",
      "JavaScript",
      "SQLite",
      "MySQL",
      "JWT",
      "Socket.IO",
      "face-api.js",
    ],
    problem:
      "Traditional attendance workflows can be slow to manage and difficult to monitor. A modern system needs reliable attendance verification, role-based access, real-time visibility, and useful analytics.",
    solution:
      "AttendIQ provides separate student and faculty workflows with QR-based attendance, face verification, geolocation checks, real-time updates, attendance history, leave management, exports, and an ML-based attendance-risk prediction engine.",
    architecture: [
      "Student / Faculty client",
      "Node.js + Express backend",
      "JWT authentication and role-based access",
      "QR attendance verification",
      "Face verification with face-api.js",
      "Geolocation validation",
      "SQLite / MySQL persistence",
      "Socket.IO real-time updates",
      "Analytics and attendance-risk prediction",
    ],
    highlights: [
      "QR-based attendance workflow",
      "Face verification for attendance validation",
      "Location-based attendance verification",
      "Student and faculty dashboards",
      "JWT authentication with bcrypt password hashing",
      "Real-time updates using Socket.IO",
      "Attendance history and statistics",
      "Leave request workflow",
      "CSV / Excel attendance export",
      "ML-based LOW / MEDIUM / HIGH attendance-risk prediction",
    ],
    github: "",
  },
];