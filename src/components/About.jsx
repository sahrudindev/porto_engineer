import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchGitHubProfile, fetchGitHubRepos } from '../services/github';
import { ProfileCard, GradientText } from './reactbits';

// Premium Skill Category Component
function SkillCategory({ icon, title, skills, gradient, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="group relative"
        >
            {/* Glow Effect on Hover */}
            <div className={`absolute -inset-0.5 ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:border-primary/30 transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h4>
                </div>

                {/* Skill Tags */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-wrap gap-2"
                >
                    {skills.map((skill, index) => (
                        <motion.span
                            key={skill}
                            variants={tagVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -2,
                                boxShadow: "0 8px 25px -5px rgba(139, 92, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-3 py-1.5 text-sm font-semibold rounded-lg cursor-default
                                bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700/80 dark:to-slate-600/80
                                text-slate-700 dark:text-slate-200
                                border border-slate-200/80 dark:border-slate-600/50
                                hover:border-primary/50 hover:text-primary dark:hover:text-primary
                                shadow-sm hover:shadow-md
                                transition-all duration-200"
                        >
                            {/* Subtle shine effect */}
                            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/30 to-white/0 dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative">{skill}</span>
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

// Compact Impact Metric - Single Row Display
function ImpactMetric({ value, label, gradient, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ y: -3, scale: 1.03 }}
            className="group relative flex-1"
        >
            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 ${gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

            <div className={`relative p-4 rounded-xl ${gradient} border border-white/20 backdrop-blur-sm overflow-hidden`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content - Compact */}
                <div className="relative flex flex-col items-center text-center">
                    {/* Value */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: delay * 0.08 + 0.1, type: "spring" }}
                        className="text-2xl lg:text-3xl font-black text-white drop-shadow-lg"
                    >
                        {value}
                    </motion.span>

                    {/* Label */}
                    <span className="text-[10px] lg:text-xs font-bold text-white/80 uppercase tracking-wider mt-1">
                        {label}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// Bento Card Wrapper
function BentoCard({ children, className = '', span = 1 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`relative bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 p-6 overflow-hidden hover-lift ${span === 2 ? 'lg:col-span-2' : ''
                } ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ repos: 0, followers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const [profileData, repos] = await Promise.all([
                    fetchGitHubProfile(),
                    fetchGitHubRepos('updated', 100),
                ]);

                if (profileData) {
                    setProfile(profileData);
                    setStats({
                        repos: profileData.public_repos || 0,
                        followers: profileData.followers || 0,
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const personalInfo = {
        name: profile?.name || 'Sahrudin',
        title: 'Data Engineer',
        location: profile?.location || 'Indonesia',
        bio: profile?.bio || 'Data Science & Machine Learning enthusiast',
        avatar: '/profile.jpg',
        github: profile?.html_url || 'https://github.com/sahrudindev',
        linkedin: 'https://www.linkedin.com/in/sahrudindev/',
        email: 'sahrudindev@gmail.com',
        available: true,
    };

    const skillCategories = [
        {
            icon: 'engineering',
            title: 'Data Engineering',
            skills: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Airflow', 'dbt'],
            gradient: 'bg-gradient-to-br from-primary to-violet-500',
        },
        {
            icon: 'cloud',
            title: 'Cloud & Infrastructure',
            skills: ['GCP', 'BigQuery', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
            gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
        },
        {
            icon: 'storage',
            title: 'Data Storage',
            skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Delta Lake', 'Iceberg', 'Hive'],
            gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
        },
        {
            icon: 'monitoring',
            title: 'Analytics & Monitoring',
            skills: ['Pandas', 'Power BI', 'Looker', 'Grafana', 'Prometheus'],
            gradient: 'bg-gradient-to-br from-orange-500 to-amber-500',
        },
    ];

    const handleContactClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 lg:py-28 bg-background-light dark:bg-background-dark relative overflow-hidden" id="about">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex justify-center relative z-10">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                About Me
                            </span>
                        </motion.span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                animationSpeed={5}
                                className="text-4xl lg:text-5xl font-black"
                            >
                                The Engineer Behind the Data
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Transforming complex data challenges into elegant, scalable solutions
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Profile Card - Large */}
                        <BentoCard className="lg:col-span-5 flex items-center justify-center py-8">
                            {loading ? (
                                <div className="w-[280px] h-[380px] bg-slate-200 dark:bg-slate-700 rounded-3xl animate-pulse" />
                            ) : (
                                <ProfileCard
                                    avatarUrl={personalInfo.avatar}
                                    name={personalInfo.name}
                                    title={personalInfo.title}
                                    handle="sahrudindev"
                                    status="Online"
                                    contactText="Contact Me"
                                    showUserInfo={true}
                                    onContactClick={handleContactClick}
                                    enableTilt={true}
                                    enableMobileTilt={true}
                                    behindGlowEnabled={true}
                                    behindGlowColor="rgba(139, 92, 246, 0.5)"
                                />
                            )}
                        </BentoCard>

                        {/* Bio Card */}
                        <BentoCard className="lg:col-span-7">
                            <div className="h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">My Journey</h3>
                                </div>
                                <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 flex-1">
                                    <p>
                                        A passionate <span className="font-bold text-primary">Data Engineer</span> with a strong foundation in Data Science and Machine Learning from Institut Teknologi Garut. I specialize in building scalable data platforms, ETL/ELT pipelines, and analytics solutions.
                                    </p>
                                    <p>
                                        My journey started with a deep focus on <span className="font-bold text-violet-500">Python programming</span>, where I achieved one of the highest GPAs in my cohort. This technical foundation enables me to architect efficient data systems that transform raw data into actionable insights.
                                    </p>
                                    <p>
                                        Currently focused on: <span className="font-bold text-cyan-500">Real-time data platforms</span>, Lakehouse architecture, FinOps optimization, and building end-to-end data solutions with modern tools.
                                    </p>
                                </div>
                            </div>
                        </BentoCard>

                        {/* 2x2 Info Grid - Left Side */}
                        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                            {/* Location Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -2 }}
                                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</p>
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">{personalInfo.location}</p>
                                        <p className="text-xs text-primary font-medium mt-0.5">🌐 Remote Ready</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Education Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -2 }}
                                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                                        <span className="material-symbols-outlined text-[18px]">school</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Education</p>
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">B.Sc Data Science</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Institut Teknologi Garut</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Experience Metric */}
                            <ImpactMetric
                                value="4+"
                                label="Years Exp"
                                gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
                                delay={2}
                            />

                            {/* Projects Metric */}
                            <ImpactMetric
                                value="15+"
                                label="Projects"
                                gradient="bg-gradient-to-br from-orange-500 to-amber-500"
                                delay={3}
                            />
                        </div>

                        {/* Technical Expertise - Right Side */}
                        <BentoCard className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                                    <span className="material-symbols-outlined text-[20px]">code</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Technical Expertise</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Technologies I work with daily</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {skillCategories.map((category, index) => (
                                    <SkillCategory
                                        key={category.title}
                                        icon={category.icon}
                                        title={category.title}
                                        skills={category.skills}
                                        gradient={category.gradient}
                                        delay={index}
                                    />
                                ))}
                            </div>
                        </BentoCard>

                        {/* Social Links Card */}
                        <BentoCard className="lg:col-span-12 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border-0">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                                        <span className="material-symbols-outlined text-[24px]">connect_without_contact</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Let's Connect!</h3>
                                        <p className="text-sm text-slate-400">Open for collaborations and opportunities</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-wrap justify-center">
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={personalInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold hover:shadow-lg transition-shadow"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        GitHub
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={personalInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        LinkedIn
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={`mailto:${personalInfo.email}`}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-violet-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-shadow"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                        Email
                                    </motion.a>
                                </div>
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
