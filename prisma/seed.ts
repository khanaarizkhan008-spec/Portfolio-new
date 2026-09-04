import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rizz.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log('Admin user seeded.');

  // Seed Initial Profile
  await prisma.profile.upsert({
    where: { id: 'profile-1' }, // Use a fixed ID for the single profile record
    update: {},
    create: {
      id: 'profile-1',
      name: 'Mohammad Aariz Khan',
      role: 'Full-Stack Software Engineer & AI Builder',
      bio: 'Obsessed with creating high-performance software, autonomous AI systems, and elegant digital products. 3+ years building and shipping across modern stacks.',
      github: 'https://github.com/khanaarizkhan008-spec',
      linkedin: 'https://linkedin.com/in/rizz-khan',
      twitter: 'https://x.com/rizz-khan',
      email: adminEmail,
      location: 'India • Available Worldwide',
      availability: 'AVAILABLE FOR HIRE & FREELANCE',
      resumeUrl: '',
      yearsBuilding: 3,
      projectsShipped: 15,
      hackathonsEntered: 10,
    },
  });
  console.log('Profile seeded.');

  // Seed Skills
  const skills = [
    { name: 'Next.js', category: 'Framework' },
    { name: 'React', category: 'Library' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Express', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'Generative AI / RAG systems', category: 'AI' },
    { name: 'Figma', category: 'Design' },
  ];

  for (let i = 0; i < skills.length; i++) {
    await prisma.skill.upsert({
      where: { id: `skill-${i}` }, // Use predictable IDs for seed
      update: {},
      create: {
        ...skills[i],
        id: `skill-${i}`,
        order: i,
      },
    });
  }
  console.log('Skills seeded.');

  // Seed Projects
  const projects = [
    {
      id: 'proj-1',
      title: 'NajmAI — Intelligent Workspace',
      description: 'Next-gen AI assistant with multi-modal reasoning, real-time vector search, and customizable workflows.',
      tags: 'Next.js, TailwindCSS, OpenAI, Vector DB',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://najmai.demo',
      githubUrl: 'https://github.com/rizz-khan/najm-ai',
      featured: true,
      order: 1,
    },
    {
      id: 'proj-2',
      title: 'Damas — SaaS Analytics Suite',
      description: 'Ultra-fast business intelligence platform designed with sub-millisecond analytics and live charts.',
      tags: 'React, TypeScript, Prisma, PostgreSQL',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://damas.demo',
      githubUrl: 'https://github.com/rizz-khan/damas-analytics',
      featured: true,
      order: 2,
    },
    {
      id: 'proj-3',
      title: 'Majd — Developer OS & Portfolio',
      description: 'Futuristic portfolio and operating dashboard for modern engineers with micro-interactions.',
      tags: 'Next.js, Framer Motion, TailwindCSS',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://majd.demo',
      githubUrl: 'https://github.com/rizz-khan/majd-os',
      featured: true,
      order: 3,
    },
    {
      id: 'proj-4',
      title: 'GuardianOS — Cloud Security Hub',
      description: 'Autonomous zero-trust audit tool protecting microservices and container deployments in real-time.',
      tags: 'Go, Docker, Kubernetes, Next.js',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      liveUrl: 'https://guardianos.demo',
      githubUrl: 'https://github.com/rizz-khan/guardianos',
      featured: true,
      order: 4,
    }
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { id: proj.id },
      update: proj,
      create: proj,
    });
  }
  console.log('Projects seeded.');

  // Seed Experiences
  const experiences = [
    {
      id: 'exp-1',
      type: 'work',
      org: 'Vanguard Tech Labs',
      role: 'Full-Stack Software Engineer',
      description: 'Spearheaded frontend architecture modernization, reduced bundle sizes by 42%, and implemented generative AI workflows.',
      startDate: new Date('2024-06-01'),
      endDate: null,
      ongoing: true,
      url: 'https://example.com',
      location: 'Remote',
      skills: 'Next.js, TypeScript, AI Workflows, Performance',
      order: 1,
    },
    {
      id: 'exp-2',
      type: 'work',
      org: 'HackGlobal 2024',
      role: '1st Place Winner / Lead Builder',
      description: 'Built an AI-driven collaborative coding canvas in 36 hours competing against 450+ international developers.',
      startDate: new Date('2024-03-10'),
      endDate: new Date('2024-03-12'),
      ongoing: false,
      url: 'https://example.com',
      location: 'Global',
      skills: 'Full-Stack, Real-Time Collaboration, AI Canvas',
      order: 2,
    },
    {
      id: 'exp-3',
      type: 'work',
      org: 'Apex Open Source Initiative',
      role: 'Core Contributor',
      description: 'Maintained key developer tooling packages with over 50,000+ monthly downloads across the JavaScript ecosystem.',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2024-05-01'),
      ongoing: false,
      url: 'https://example.com',
      location: 'Open Source',
      skills: 'JavaScript, Open Source Tooling, Developer Ecosystem',
      order: 3,
    },
    {
      id: 'exp-edu-1',
      type: 'education',
      org: 'Bachelor of Technology (B.Tech)',
      role: 'Computer Science & Engineering',
      description: 'Focused on Autonomous AI Systems, High-Performance Distributed Systems, Data Structures & Algorithms, and Cloud Infrastructure. Actively leading developer communities and winning national collegiate hackathons.',
      startDate: new Date('2022-08-01'),
      endDate: null,
      ongoing: true,
      url: null,
      location: 'India',
      skills: 'Data Structures, Algorithms, Operating Systems, AI & ML, Web Architecture',
      order: 4,
    },
    {
      id: 'exp-edu-2',
      type: 'education',
      org: 'Senior Secondary Education (XII)',
      role: 'Physics, Chemistry & Mathematics (PCM) + CS',
      description: 'Graduated with distinction in Science and Computer Science with specialization in Python, Database Systems, and Object-Oriented Programming principles.',
      startDate: new Date('2020-04-01'),
      endDate: new Date('2022-05-01'),
      ongoing: false,
      url: null,
      location: 'India',
      skills: 'Mathematics, Physics, Computer Science, Python',
      order: 5,
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    });
  }
  // Seed Certifications
  const certs = [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: new Date('2024-05-15'),
      credentialUrl: 'https://aws.amazon.com',
      order: 1,
    },
    {
      id: 'cert-2',
      title: 'Meta Professional Front-End Developer',
      issuer: 'Meta / Coursera',
      issueDate: new Date('2024-01-20'),
      credentialUrl: 'https://coursera.org',
      order: 2,
    },
    {
      id: 'cert-3',
      title: 'Generative AI Specialization',
      issuer: 'DeepLearning.AI',
      issueDate: new Date('2023-11-10'),
      credentialUrl: 'https://deeplearning.ai',
      order: 3,
    }
  ];

  for (const cert of certs) {
    await prisma.certification.upsert({
      where: { id: cert.id },
      update: cert,
      create: cert,
    });
  }
  console.log('Certifications seeded.');

  // Seed Posts (Starred posts act as Featured Achievements)
  const posts = [
    {
      id: 'post-1',
      title: 'Architecting High Performance Next.js Apps with Server Actions & Edge Caching',
      slug: 'architecting-high-performance-nextjs-apps',
      excerpt: 'A deep dive into reducing TTFB, streaming UI components, and managing optimistic mutations with Server Actions.',
      content: '# High Performance Next.js Architecture\n\nOptimizing web applications requires a holistic view of rendering pipelines, caching layers, and asset delivery.\n\n### Key Concepts\n- Streaming SSR with Suspense\n- Route Handlers vs Server Actions\n- Edge Cache Invalidation strategies',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      published: true,
      featured: true, // Starred achievement post
    },
    {
      id: 'post-2',
      title: 'Building Real-Time Multi-Agent AI Workflows in TypeScript',
      slug: 'real-time-multi-agent-ai-workflows',
      excerpt: 'How we orchestrated multiple autonomous LLM sub-agents with state machines, streaming tool calls, and WebSocket feeds.',
      content: '# Multi-Agent Systems in Practice\n\nCoordinating multiple specialized AI agents requires deterministic tool interfaces, memory persistence, and fault-tolerant retry policies.',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
      published: true,
      featured: false,
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }
  console.log('Posts seeded.');

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
