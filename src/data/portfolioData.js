// =============================================
// PORTFOLIO DATA - Sahrudin
// =============================================

export const personalInfo = {
    name: "Sahrudin",
    title: "Data Engineer",
    tagline: "Production-Grade Data Platforms",
    shortBio: "I focused on Data Science and Machine Learning while studying at Institut Teknologi Garut, achieving one of the highest Python GPAs. Now building production-grade data pipelines and analytics systems.",
    fullBio: `A passionate Data Engineer with a strong foundation in Data Science and Machine Learning from Institut Teknologi Garut. I specialize in building scalable data platforms, ETL/ELT pipelines, and analytics solutions.

My journey started with a deep focus on Python programming, where I achieved one of the highest GPAs in my cohort. This strong technical foundation enables me to architect efficient data systems that transform raw data into actionable insights.

Currently focused on: Real-time data platforms, Lakehouse architecture, FinOps optimization, and building end-to-end data solutions with modern tools like Spark, Airflow, and Docker.`,
    email: "sahrudindev@gmail.com",
    phone: "+62 812 3456 7890",
    location: "Indonesia",
    linkedin: "https://www.linkedin.com/in/sahrudindev/",
    github: "https://github.com/sahrudindev",
    resumeUrl: "/resume.pdf",
    profilePhoto: "https://avatars.githubusercontent.com/u/92308156?v=4",
    available: true,
};

export const stats = [
    { value: "34+", label: "GitHub Repos", icon: "code" },
    { value: "4+", label: "Data Projects", icon: "database" },
    { value: "Python", label: "Top Skill", icon: "terminal" },
    { value: "2021", label: "Since", icon: "calendar_month" },
];

export const experience = [
    {
        id: 1,
        role: "Data Engineer",
        company: "Freelance / Projects",
        location: "Indonesia",
        period: "2024 - Present",
        type: "Projects",
        current: true,
        description: "Building production-grade data platforms and analytics solutions as portfolio projects.",
        achievements: [
            "Built NYC Taxi FinOps Dashboard with cost optimization analytics",
            "Developed Real-Time Data Platform with Lakehouse architecture",
            "Created Global E-Commerce Revenue Analyzer with dbt transformations",
            "Implemented Job Scraper with automated data collection pipelines",
        ],
        technologies: ["Python", "Spark", "Airflow", "dbt", "Docker", "PostgreSQL"],
    },
    {
        id: 2,
        role: "Data Science Student",
        company: "Institut Teknologi Garut",
        location: "Garut, Indonesia",
        period: "2021 - 2024",
        type: "Education",
        current: false,
        description: "Focused on Data Science and Machine Learning with one of the highest Python GPAs.",
        achievements: [
            "Achieved top Python GPA among cohort",
            "Developed Face Detection system using Computer Vision",
            "Built Sign Language Recognition model using Deep Learning",
            "Created Brain Tumor Classification system with CNN",
            "Completed multiple Machine Learning projects",
        ],
        technologies: ["Python", "TensorFlow", "OpenCV", "Scikit-learn", "Pandas", "NumPy"],
    },
];

export const certifications = [
    {
        name: "Data Science & Machine Learning",
        issuer: "Institut Teknologi Garut",
        date: "2024",
        icon: "school",
        color: "text-[#4285F4]",
        bgColor: "bg-[#4285F4]/10",
        credentialUrl: "https://github.com/sahrudindev/sertifikat",
    },
    {
        name: "Python Programming",
        issuer: "Top GPA Achievement",
        date: "2024",
        icon: "terminal",
        color: "text-[#3776AB]",
        bgColor: "bg-[#3776AB]/10",
        credentialUrl: "#",
    },
    {
        name: "Deep Learning",
        issuer: "Self-Taught Projects",
        date: "2023",
        icon: "psychology",
        color: "text-[#FF6F00]",
        bgColor: "bg-[#FF6F00]/10",
        credentialUrl: "https://github.com/sahrudindev",
    },
    {
        name: "Computer Vision",
        issuer: "Project-Based Learning",
        date: "2023",
        icon: "visibility",
        color: "text-[#00ACC1]",
        bgColor: "bg-[#00ACC1]/10",
        credentialUrl: "https://github.com/sahrudindev/Face_detection",
    },
];

export const techStack = [
    { name: "Python", icon: "terminal", hoverColor: "group-hover:text-[#3776AB]", category: "Languages" },
    { name: "SQL", icon: "database", hoverColor: "group-hover:text-[#336791]", category: "Languages" },
    { name: "Spark", icon: "auto_awesome", hoverColor: "group-hover:text-[#E25A1C]", category: "Processing" },
    { name: "Airflow", icon: "wind_power", hoverColor: "group-hover:text-[#017CEE]", category: "Orchestration" },
    { name: "Docker", icon: "deployed_code", hoverColor: "group-hover:text-[#2496ED]", category: "Infrastructure" },
    { name: "PostgreSQL", icon: "storage", hoverColor: "group-hover:text-[#336791]", category: "Database" },
    { name: "dbt", icon: "transform", hoverColor: "group-hover:text-[#FF694B]", category: "Transform" },
    { name: "TensorFlow", icon: "psychology", hoverColor: "group-hover:text-[#FF6F00]", category: "ML" },
];

export const competencies = [
    {
        title: "Data Engineering",
        icon: "schema",
        description: "Building ETL/ELT pipelines with Python, Spark, and Airflow. Docker-based workflows for reproducible data processing.",
    },
    {
        title: "Machine Learning",
        icon: "psychology",
        description: "Computer Vision, Deep Learning, and predictive modeling. Experience with TensorFlow, OpenCV, and Scikit-learn.",
    },
    {
        title: "Analytics & FinOps",
        icon: "analytics",
        description: "Building dashboards and analytics platforms. Cost optimization and business intelligence solutions.",
    },
];

export const projects = [
    {
        id: 1,
        title: "Real-Time Data Platform Lakehouse",
        category: "Data Platform / Lakehouse",
        industry: "Analytics",
        icon: "layers",
        description: "Built a modern Lakehouse architecture with Bronze/Silver/Gold layers. Implements real-time data processing with streaming capabilities.",
        techStack: ["Python", "Spark", "Delta Lake", "Docker", "PostgreSQL"],
        dockerHighlight: "Docker",
        metrics: [
            { value: "3-Layer", label: "Architecture" },
            { value: "Real-Time", label: "Processing" },
            { value: "1.1MB", label: "Codebase" },
        ],
        challenge: "Need for a scalable data platform that handles both batch and streaming workloads.",
        solution: "Implemented medallion architecture with Docker-based development environment.",
        diagram: ["Ingestion", "Bronze Layer", "Silver Layer", "Gold Layer"],
        repoUrl: "https://github.com/sahrudindev/Real-Time-Data-Platform-Lakehouse",
        caseStudyUrl: "#",
    },
    {
        id: 2,
        title: "NYC Taxi FinOps Dashboard",
        category: "FinOps / Analytics",
        industry: "Transportation",
        icon: "savings",
        description: "Cost optimization dashboard for NYC Taxi data. Analyzes spending patterns and provides actionable insights for cost reduction.",
        techStack: ["Python", "Streamlit", "PostgreSQL", "Docker", "dbt"],
        dockerHighlight: "Docker",
        metrics: [
            { value: "FinOps", label: "Focus" },
            { value: "2.2MB", label: "Dataset" },
            { value: "MIT", label: "License" },
        ],
        challenge: "No visibility into data processing costs and optimization opportunities.",
        solution: "Built interactive dashboard with cost attribution and optimization recommendations.",
        diagram: ["Data Ingestion", "dbt Transform", "Analytics", "Dashboard"],
        repoUrl: "https://github.com/sahrudindev/NYC-Taxi-FinOps",
        caseStudyUrl: "#",
    },
    {
        id: 3,
        title: "Global E-Commerce Revenue Analyzer",
        category: "Analytics / dbt",
        industry: "E-Commerce",
        icon: "shopping_cart",
        description: "Revenue analytics platform for global e-commerce data. Uses dbt for transformations and creates insights for business decision-making.",
        techStack: ["Python", "dbt", "PostgreSQL", "Streamlit", "Docker"],
        dockerHighlight: "Docker",
        metrics: [
            { value: "Global", label: "Scope" },
            { value: "dbt", label: "Transform" },
            { value: "58KB", label: "Codebase" },
        ],
        challenge: "Complex revenue data from multiple regions needed unified analysis.",
        solution: "Implemented dbt models for consistent transformations and Streamlit dashboard.",
        diagram: ["Raw Data", "dbt Models", "Analytics", "Revenue Dashboard"],
        repoUrl: "https://github.com/sahrudindev/Global-E-Commerce-Revenue-Analyzer",
        caseStudyUrl: "#",
    },
    {
        id: 4,
        title: "Job Scraper Pipeline",
        category: "Data Collection / ETL",
        industry: "HR Tech",
        icon: "work",
        description: "Automated job listing scraper with data pipeline for collecting and processing job market data.",
        techStack: ["Python", "Playwright", "PostgreSQL", "Docker"],
        dockerHighlight: "Docker",
        metrics: [
            { value: "Auto", label: "Collection" },
            { value: "Multi-Site", label: "Sources" },
            { value: "411KB", label: "Codebase" },
        ],
        challenge: "Manual job search across multiple platforms is time-consuming.",
        solution: "Built automated scraper with anti-detection and data normalization pipeline.",
        diagram: ["Scraper", "Data Cleaning", "PostgreSQL", "Analysis"],
        repoUrl: "https://github.com/sahrudindev/jobscraper",
        caseStudyUrl: "#",
    },
];

export const architectures = [
    {
        title: "Lakehouse Architecture",
        icon: "layers",
        description: "Medallion architecture with Bronze/Silver/Gold layers for data quality progression.",
        features: ["ACID transactions", "Schema evolution", "Docker: Delta Lake + MinIO"],
    },
    {
        title: "ETL Pipeline",
        icon: "sync_alt",
        description: "Automated data extraction, transformation, and loading with orchestration.",
        features: ["Airflow scheduling", "dbt transformations", "Docker Compose stack"],
    },
    {
        title: "Analytics Platform",
        icon: "analytics",
        description: "End-to-end analytics from data ingestion to interactive dashboards.",
        features: ["Streamlit dashboards", "FinOps insights", "Docker deployment"],
    },
];

export const testimonials = [
    {
        id: 1,
        quote: "Sahrudin demonstrates exceptional problem-solving skills and a strong foundation in Python programming. His data projects show production-level quality.",
        author: "Academic Advisor",
        role: "Professor",
        company: "Institut Teknologi Garut",
        avatar: "ITG",
    },
    {
        id: 2,
        quote: "The Lakehouse architecture implementation shows deep understanding of modern data engineering principles. Well-documented and production-ready.",
        author: "GitHub Community",
        role: "Open Source",
        company: "GitHub Stars",
        avatar: "GH",
    },
];

export const blogPosts = [
    {
        id: 1,
        title: "Building a Real-Time Lakehouse Architecture",
        excerpt: "How I implemented a medallion architecture with Bronze/Silver/Gold layers using Python and Docker.",
        category: "Architecture",
        readTime: "8 min read",
        date: "2024-12-12",
        slug: "lakehouse-architecture",
    },
    {
        id: 2,
        title: "FinOps for Data Engineers",
        excerpt: "Cost optimization strategies for data platforms with practical examples from NYC Taxi project.",
        category: "FinOps",
        readTime: "6 min read",
        date: "2024-12-10",
        slug: "finops-data-engineers",
    },
    {
        id: 3,
        title: "From ML Student to Data Engineer",
        excerpt: "My journey transitioning from Machine Learning focus to building production data pipelines.",
        category: "Career",
        readTime: "5 min read",
        date: "2024-12-01",
        slug: "ml-to-data-engineer",
    },
];

export const skills = {
    languages: ["Python", "SQL", "Bash"],
    processing: ["Apache Spark", "dbt", "Pandas", "NumPy"],
    ml: ["TensorFlow", "Scikit-learn", "OpenCV", "Deep Learning"],
    databases: ["PostgreSQL", "Delta Lake", "SQLite"],
    tools: ["Docker", "Git", "Streamlit", "Jupyter"],
    orchestration: ["Apache Airflow", "Cron"],
};
