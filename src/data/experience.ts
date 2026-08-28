import {ExperienceItem} from "@/types";

export const work: ExperienceItem[] = [
  {
    role: "DevOps Engineer Co-op",
    org: "Camis Inc, Guelph, ON",
    date: "Jan. – Aug. 2026",
    points: [
      "Maintained and extended Azure infrastructure with Terraform to support new feature rollouts",
      "Rebuilt internal tools and dashboards used by engineering teams and call centers",
      "Built an alerting system to detect and notify respective teams of app downtime and slow response times",
      "Developed and maintained scheduled task jobs for reporting, automated restarts, and scaling",
      "Contributed to CI/CD deployment pipelines - scripts, GitHub Actions, Octopus Deploy",
    ],
  },
  {
    role: "IT Manager and Software Developer Co-op",
    org: "Perpetual Motion Sports, Guelph, ON",
    date: "Apr. – Sept. 2025",
    points: [
      "Migrated legacy PHP/JS schedule and standings system to React/TypeScript, eliminating manual iFrame URL updates across all sports web pages, improving both administrative and customer UX",
      "Built an email template system with dynamic placeholders, automating generation of context-specific emails (score disputes, waiver reminders, payment requests, etc) for 500+ teams per season",
      "Developed a waiver-tracking tool that cross-references registered players against a MySQL database to flag non-compliant teams and trigger automated follow-up emails",
    ],
    link: {
      href: "/blogs/perpetual-motion",
      label: "I wrote a blog post about this job"
    },
  },
  {
    role: "Freelance/Volunteer Software Developer",
    org: "Home, Brantford, ON",
    date: "2020 – Present",
    points: [
      "Work on a variety of open and closed source projects; both paid, and voluntary work",
      "Given a set of requirements, develop server side plugins/software to perform the required tasks as efficiently and reliably as possible",
      "Perform tests to ensure every customer gets a final product that exceed their expectations",
    ],
  },
  {
    role: "Lifeguard",
    org: "Brant Conservation Area, Brantford, ON",
    date: "2021 – 2024",
    points: [
      "Perform rescues and first aid in the event of injuries, and/or emergencies, following proper procedures in accordance with NLS",
      "Preformed hourly pool tests to ensure chlorine and pH levels are safe",
      "Adapted to fast-paced environment and formed strong relationships with all staff members",
    ],
  },
  {
    role: "Dishwasher",
    org: "Sociable Kitchen & Tavern, Brantford, ON",
    date: "2020 – 2021",
    points: [
      "Part time dishwasher at Sociable Kitchen",
      "In addition to washing dishes, would also help portion food, and assist in closing",
    ],
  },
];

export const education: ExperienceItem[] = [
  {
    role: "Bachelor of Engineering, Engineering Systems & Computing (Co-op)",
    org: "University of Guelph, Guelph, ON",
    date: "2023 – Present",
    points: [],
  },
  {
    role: "Ontario Secondary School Diploma",
    org: "St. John's College, Brantford, ON",
    date: "2019 – 2023",
    points: [],
  },
];

export const certifications: { name: string, date: string }[] = [
  {name: "NLS (National Lifeguard)", date: "Re-certified Dec. 2023"},
  {name: "First Aid & CPR-C", date: "Re-certified May 2024"},
  {name: "RPAS Pilot License", date: "June 2020"},
];
