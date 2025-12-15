import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchGitHubProfile, fetchGitHubRepos } from '../services/github';
import { ProfileCard, GradientText } from './reactbits';

// Animated Skill Bar
function SkillBar({ name, level, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{name}</span>
                <span className="text-xs font-bold text-primary">{level}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary via-violet-500 to-cyan-500 rounded-full"
                />
            </div>
        </div>
    );
}

// Info Card Component
function InfoCard({ icon, label, value, gradient = false }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={`group p-4 rounded-2xl ${gradient
                    ? 'bg-gradient-to-br from-primary/10 via-violet-500/10 to-cyan-500/10 border border-primary/20'
                    : 'bg-slate-100 dark:bg-slate-800/50'
                } transition-all duration-300`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradient
                        ? 'bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25'
                        : 'bg-white dark:bg-slate-700 text-primary'
                    }`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {label}
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
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

    const skills = [
        { name: 'Python', level: 95 },
        { name: 'SQL & BigQuery', level: 90 },
        { name: 'Apache Spark', level: 85 },
        { name: 'Docker & K8s', level: 80 },
        { name: 'dbt & Airflow', level: 85 },
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

                        {/* Quick Info Cards */}
                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                            <InfoCard icon="location_on" label="Based in" value={personalInfo.location} gradient />
                            <InfoCard icon="school" label="Education" value="ITG" />
                            <InfoCard icon="code" label="Repositories" value={`${stats.repos}+`} />
                            <InfoCard icon="check_circle" label="Status" value="Available" gradient />
                        </div>

                        {/* Skills Card */}
                        <BentoCard className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-[20px]">code</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Core Skills</h3>
                            </div>
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        delay={index * 0.1}
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
