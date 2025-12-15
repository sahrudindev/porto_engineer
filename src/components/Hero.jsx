import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubProfile } from '../services/github';
import { BlurText, Magnet, GradientText, FloatingOrbs, TextReveal } from './reactbits';

// Typewriter effect for role titles
function TypewriterText({ texts, className = '' }) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = texts[currentTextIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseDelay = isDeleting ? 500 : 2000;

        if (!isDeleting && displayedText === currentFullText) {
            setTimeout(() => setIsDeleting(true), pauseDelay);
            return;
        }

        if (isDeleting && displayedText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedText(prev =>
                isDeleting
                    ? currentFullText.substring(0, prev.length - 1)
                    : currentFullText.substring(0, prev.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentTextIndex, texts]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
        </span>
    );
}

// Animated stat card
function StatCard({ icon, value, label, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative glass rounded-2xl p-5 hover-lift cursor-default">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    </div>
                    <p className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
                        {value}
                    </p>
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

// Scroll indicator
function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Scroll to explore
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2"
            >
                <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>
        </motion.div>
    );
}

export default function Hero() {
    const [profile, setProfile] = useState(null);
    const [repoCount, setRepoCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const profileData = await fetchGitHubProfile();
                if (profileData) {
                    setProfile(profileData);
                    setRepoCount(profileData.public_repos || 0);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const personalInfo = {
        name: profile?.name || 'Sahrudin',
        available: true,
        tagline: 'Building Production-Grade Data Platforms',
        shortBio: profile?.bio || 'I transform raw data into actionable insights through scalable pipelines, modern lakehouse architectures, and intelligent automation.',
        github: profile?.html_url || 'https://github.com/sahrudindev',
        linkedin: 'https://www.linkedin.com/in/sahrudindev/',
    };

    const roles = ['Data Engineer', 'ML Engineer', 'Python Developer', 'Analytics Engineer'];

    const stats = [
        { value: `${repoCount}+`, label: 'Repositories', icon: 'code' },
        { value: '5+', label: 'Data Projects', icon: 'database' },
        { value: 'Python', label: 'Top Skill', icon: 'terminal' },
        { value: '2021', label: 'Since', icon: 'calendar_month' },
    ];

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden" id="home">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-mesh-gradient" />
            <FloatingOrbs />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-full blur-[120px] animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 lg:px-10 py-20">
                <div className="max-w-[1200px] w-full">
                    <div className="flex flex-col items-center text-center">
                        {/* Availability Badge */}
                        {personalInfo.available && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2 mb-8"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                    🚀 Open for Opportunities
                                </span>
                            </motion.div>
                        )}

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 mb-8"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
                                <span className="text-slate-900 dark:text-white">Hi, I'm </span>
                                <span className="text-shimmer">{personalInfo.name}</span>
                            </h1>

                            <div className="h-16 md:h-20 flex items-center justify-center">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300">
                                    <TypewriterText texts={roles} />
                                </h2>
                            </div>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
                        >
                            {personalInfo.shortBio}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-16"
                        >
                            <Magnet padding={60} magnetStrength={0.2}>
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-violet-500 px-8 text-base font-bold text-white shadow-lg shadow-primary/25 overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        View GitHub
                                    </span>
                                </a>
                            </Magnet>

                            <Magnet padding={60} magnetStrength={0.2}>
                                <a
                                    href="#projects"
                                    className="group flex h-14 items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-surface-dark/50 backdrop-blur px-8 text-base font-bold text-slate-900 dark:text-white transition-all hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined mr-2 text-[20px] group-hover:text-primary transition-colors">visibility</span>
                                    View Projects
                                </a>
                            </Magnet>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            {stats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    icon={stat.icon}
                                    value={loading && index === 0 ? '...' : stat.value}
                                    label={stat.label}
                                    delay={0.7 + index * 0.1}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <ScrollIndicator />
            </div>
        </section>
    );
}
