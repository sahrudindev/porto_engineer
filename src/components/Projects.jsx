import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchFeaturedProjects, getLanguageColor, getCategoryLabel } from '../services/github';
import { TiltCard, GradientText, ShinyText } from './reactbits';

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);

    // Spotlight effect on mouse move
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <TiltCard
                maxTilt={6}
                scale={1.02}
                glareEnabled={true}
                glareMaxOpacity={0.1}
                className="h-full"
            >
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    className="spotlight-card h-full rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/5 hover:border-primary/30 group"
                >
                    {/* Header with Image */}
                    <div className="relative h-[200px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden">
                        {/* Thumbnail Image */}
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            /* Fallback Pattern */
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-primary/30 rounded-xl animate-pulse" />
                                <div className="absolute bottom-8 left-8 w-14 h-14 border-2 border-violet-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="material-symbols-outlined text-[64px] text-white/10">database</span>
                                </div>
                            </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                        {/* Top Row - Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-white/90 text-xs font-bold rounded-full border border-white/10">
                                    {getCategoryLabel(project.name)}
                                </span>
                                {project.isFeatured && (
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 backdrop-blur-md text-amber-200 text-xs font-bold rounded-full border border-amber-500/30 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[12px]">star</span>
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Language Badge */}
                            {project.language && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shadow-lg"
                                        style={{
                                            backgroundColor: getLanguageColor(project.language),
                                            boxShadow: `0 0 10px ${getLanguageColor(project.language)}50`
                                        }}
                                    />
                                    <span className="text-xs font-medium text-white/90">{project.language}</span>
                                </div>
                            )}
                        </div>

                        {/* Bottom - Title */}
                        <div className="absolute bottom-4 left-4 right-4 z-10">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-white/70">
                                {project.stars > 0 && (
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-amber-400">star</span>
                                        {project.stars}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                    {new Date(project.updatedAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Topics */}
                        {project.topics && project.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {project.topics.slice(0, 4).map((topic) => (
                                    <span
                                        key={topic}
                                        className="px-2.5 py-1 bg-gradient-to-r from-primary/10 to-violet-500/10 text-primary text-xs font-medium rounded-lg hover:from-primary/20 hover:to-violet-500/20 transition-colors cursor-default"
                                    >
                                        {topic}
                                    </span>
                                ))}
                                {project.topics.length > 4 && (
                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-medium rounded-lg">
                                        +{project.topics.length - 4}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <motion.a
                                whileHover={{ x: 3 }}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-primary hover:text-violet-500 transition-colors group/link"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                View Code
                                <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </motion.a>

                            {project.homepage && (
                                <a
                                    href={project.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
}

function ProjectSkeleton() {
    return (
        <div className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
            <div className="h-[200px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
            <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3" />
                <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-16" />
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-16" />
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true);
                const data = await fetchFeaturedProjects();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    return (
        <section className="py-20 lg:py-28 bg-background-light dark:bg-background-dark relative overflow-hidden" id="projects">
            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500/5 to-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="flex justify-center relative z-10">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                            >
                                <span className="material-symbols-outlined text-primary text-[18px]">folder_special</span>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                    Portfolio
                                </span>
                            </motion.span>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3">
                                <GradientText
                                    colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                    animationSpeed={5}
                                    className="text-4xl lg:text-5xl font-black"
                                >
                                    Featured Projects
                                </GradientText>
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                                Production-ready data engineering solutions from my GitHub
                            </p>
                        </motion.div>

                        <motion.a
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                            href="https://github.com/sahrudindev?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-primary hover:text-violet-500 font-bold transition-colors group"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View All Repos
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </motion.a>
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <ProjectSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-[40px] text-red-500">error</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400">Failed to load projects. Please try again.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
