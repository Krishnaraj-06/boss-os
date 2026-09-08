export type Project = {
  name: string;
  type: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "NetSage",
    type: "AI Network Troubleshooting",
    description:
      "An AI-assisted network troubleshooting project focused on diagnosing and analyzing network issues.",
    tech: [
      "AI",
      "Networking",
      "Python",
      "Packet Tracer",
    ],
  },
  {
    name: "AttendIQ",
    type: "Attendance Intelligence",
    description:
      "An attendance analytics project designed to analyze attendance patterns and generate useful insights.",
    tech: [
      "Python",
      "Data Analytics",
      "Machine Learning",
    ],
  },
  {
    name: "Payment System",
    type: "Payment Processing",
    description:
      "A payment-system project focused on understanding payment flows, backend architecture and transaction processing.",
    tech: [
      "Node.js",
      "API",
      "Database",
      "Backend",
    ],
  },
];