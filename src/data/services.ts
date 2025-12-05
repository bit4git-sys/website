import { Globe, Smartphone, Cloud, Server, Shield, Briefcase, ShoppingCart, Palette, GraduationCap, Layers, Database, Code2, Activity, Lock, Eye, AlertTriangle, Zap } from 'lucide-react';

export type SubService = { icon: React.ComponentType<{ className?: string }>; name: string; desc: string };
export type Service = {
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'red' | 'indigo';
  highlight?: boolean;
  subServices: SubService[];
  hero?: { tagline?: string };
  about?: { title: string; content: string }[];
};

export const services: Service[] = [
  {
    slug: 'website-development',
    icon: Globe,
    title: 'Website Development',
    description: 'Stunning, high-performance websites tailored to your business needs',
    color: 'cyan',
    highlight: true,
    subServices: [
      { icon: Briefcase, name: 'Business Websites', desc: 'Professional corporate websites' },
      { icon: ShoppingCart, name: 'E-Commerce', desc: 'Full-featured online stores' },
      { icon: Palette, name: 'Portfolio Sites', desc: 'Beautiful portfolio showcases' },
      { icon: GraduationCap, name: 'LMS Platforms', desc: 'Education & learning systems' },
      { icon: Layers, name: 'Custom Web Applications', desc: 'Tailored app solutions' },
      { icon: Database, name: 'CMS Development', desc: 'WordPress, Webflow, Framer' },
      { icon: Code2, name: 'Full-Stack Dev', desc: 'End-to-end development' },
      { icon: Palette, name: 'UI/UX Design', desc: 'Design & prototyping' },
      { icon: Activity, name: 'SEO Architecture', desc: 'SEO-friendly site structure' },
    ],
    hero: { tagline: 'Build fast. Scale safely.' },
    about: [
      { title: 'Overview', content: 'We design and build modern, responsive websites optimized for speed, accessibility, and SEO. Our approach balances aesthetics with performance and scalability.' },
      { title: 'Tech Stack', content: 'React, Vite, Tailwind, Next.js, Headless CMS (WordPress, Webflow), best-practice CI/CD and hosting on modern platforms.' },
      { title: 'Why It Matters', content: 'A well-architected site drives conversions, ranks better, and provides a seamless experience across devices.' },
    ],
  },
  {
    slug: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications',
    color: 'purple',
    subServices: [
      { icon: Smartphone, name: 'Android Apps', desc: 'Native Android development' },
      { icon: Smartphone, name: 'iOS Apps', desc: 'Native iOS development' },
      { icon: Layers, name: 'Cross-Platform', desc: 'React Native, Flutter' },
      { icon: Code2, name: 'API Development', desc: 'REST/GraphQL backends' },
      { icon: Shield, name: 'Secure Backend Systems', desc: 'Authentication & hardening' },
      { icon: Briefcase, name: 'Admin Panels & Dashboards', desc: 'Management interfaces' },
    ],
    about: [
      { title: 'Overview', content: 'We build scalable, secure mobile applications with intuitive UI/UX, robust APIs, and cloud-integrated services.' },
      { title: 'Delivery', content: 'From MVPs to enterprise apps, we ship in iterative sprints with analytics, crash reporting, and store deployment.' },
      { title: 'Security', content: 'Authentication, secure storage, encrypted APIs, and OWASP-compliant practices throughout the stack.' },
    ],
  },
  {
    slug: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and migration',
    color: 'blue',
    subServices: [
      { icon: Cloud, name: 'Cloud Setup', desc: 'AWS, Azure, GCP' },
      { icon: Zap, name: 'Cloud Migration', desc: 'Seamless transitions' },
      { icon: Activity, name: 'DevOps Automation', desc: 'CI/CD pipelines' },
      { icon: Shield, name: 'Cloud Security', desc: 'Secure infrastructure' },
      { icon: Activity, name: 'CI/CD Pipeline Setup', desc: 'GitHub Actions, Jenkins' },
      { icon: Activity, name: 'Monitoring & Support', desc: 'Observability & alerts' },
      { icon: Shield, name: 'Security Hardening', desc: 'Best practices & audits' },
    ],
    about: [
      { title: 'Overview', content: 'We architect cloud-native systems for reliability, cost-efficiency, and scale, leveraging IaC and automation.' },
      { title: 'DevOps', content: 'CI/CD, containerization, environments, and blue/green deployments for safe, fast releases.' },
      { title: 'Observability', content: 'Metrics, logs, tracing, and alerting so teams can operate with confidence.' },
    ],
  },
  {
    slug: 'it-services',
    icon: Server,
    title: 'IT Services',
    description: 'Complete IT infrastructure and support solutions',
    color: 'green',
    subServices: [
      { icon: Server, name: 'Infrastructure Setup', desc: 'Server & network setup' },
      { icon: Activity, name: 'Networking', desc: 'Network design & optimization' },
      { icon: Briefcase, name: 'Managed IT', desc: '24/7 support' },
      { icon: Server, name: 'Server Deployments', desc: 'On-prem & cloud' },
      { icon: Activity, name: 'Remote Monitoring', desc: 'Proactive health checks' },
      { icon: Briefcase, name: 'Hardware & Software', desc: 'Procurement & rollout' },
      { icon: Briefcase, name: 'IT Consulting', desc: 'Strategy, audit, modernization' },
      { icon: Database, name: 'Backup & Recovery', desc: 'Data protection' },
    ],
    about: [
      { title: 'Overview', content: 'End-to-end IT services covering setup, maintenance, and support for secure, reliable operations.' },
      { title: 'Operations', content: 'Standardized processes, documentation, and SLAs to minimize downtime and maintain compliance.' },
      { title: 'Modernization', content: 'Gradual upgrades, cloud adoption, and cost-optimized licensing to keep systems current.' },
    ],
  },
  {
    slug: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity Services',
    description: 'Enterprise-grade security solutions and threat protection',
    color: 'red',
    subServices: [
      { icon: Lock, name: 'Penetration Testing', desc: 'Security assessment' },
      { icon: Eye, name: 'Vulnerability Assessment', desc: 'Identify weaknesses' },
      { icon: Activity, name: 'SOC Monitoring', desc: '24/7 threat monitoring' },
      { icon: Shield, name: 'SIEM Deployment', desc: 'Security event management' },
      { icon: Lock, name: 'Firewall & Endpoint', desc: 'Perimeter protection' },
      { icon: Cloud, name: 'Cloud Security', desc: 'Secure cloud environments' },
      { icon: AlertTriangle, name: 'Incident Response', desc: 'Rapid threat response' },
      { icon: Eye, name: 'Digital Forensics', desc: 'Investigation & analysis' },
      { icon: Activity, name: 'Security Awareness', desc: 'Training & workshops' },
      { icon: Shield, name: 'Red/Blue Team', desc: 'Simulations & defense' },
    ],
    about: [
      { title: 'Overview', content: 'Layered security programs combining preventive controls, detection, and rapid response.' },
      { title: 'Compliance', content: 'Policies, audits, and frameworks aligned to industry standards and regulations.' },
      { title: 'Threat Readiness', content: 'Runbooks, tabletop exercises, and continuous improvement to reduce risk.' },
    ],
  },
  {
    slug: 'it-consulting',
    icon: Briefcase,
    title: 'IT Consulting',
    description: 'Strategic guidance for technology planning and modernization',
    color: 'indigo',
    subServices: [
      { icon: Briefcase, name: 'Technology Planning', desc: 'Roadmaps & tooling' },
      { icon: Layers, name: 'System Integration', desc: 'Interoperability & migration' },
      { icon: Activity, name: 'Cloud & DevOps Strategy', desc: 'Adoption & maturity' },
      { icon: Code2, name: 'Software Architecture', desc: 'Design & best practices' },
      { icon: Shield, name: 'Security Compliance', desc: 'Policies & standards' },
      { icon: Briefcase, name: 'Digital Transformation', desc: 'Modernization initiatives' },
    ],
    about: [
      { title: 'Overview', content: 'We partner to align technology with business outcomes—roadmaps, architecture, and adoption strategies.' },
      { title: 'Value', content: 'Reduce risk and accelerate delivery with pragmatic, staged modernization plans.' },
      { title: 'Engagement', content: 'Workshops, assessments, and hands-on guidance tailored to your team and goals.' },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
