import { useState, useEffect } from 'react';
import { fetchFeaturedProjects, getLanguageColor, getCategoryIcon, getCategoryLabel } from '../services/github';

function ProjectCard({ project }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-primary/30">
            {/* Header with Image */}
            <div className="relative h-[200px] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                {/* Thumbnail Image */}
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    /* Fallback Pattern */
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-16 h-16 border border-primary/30 rounded-lg" />
                        <div className="absolute bottom-8 left-8 w-10 h-10 border border-blue-400/30 rounded-full" />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                {/* Top Row - Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 bg-black/40 backdrop-blur text-white/90 text-xs font-bold rounded-full border border-white/10">
                            {getCategoryLabel(project.name)}
                        </span>
                        {project.isFeatured && (
                            <span className="px-2 py-0.5 bg-yellow-500/30 backdrop-blur text-yellow-300 text-xs font-bold rounded-full border border-yellow-500/30 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">star</span>
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Language Badge */}
                    {project.language && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur rounded-full border border-white/10">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: getLanguageColor(project.language) }}
                            />
                            <span className="text-xs font-medium text-white/90">{project.language}</span>
                        </div>
                    )}
                </div>

                {/* Bottom - Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/70">
                        {project.stars > 0 && (
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">star</span>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description}
                </p>

                {/* Topics */}
                {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.topics.map((topic) => (
                            <span
                                key={topic}
                                className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors group/link"
                    >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        View Repository
                        <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </a>

                    {project.homepage && (
                        <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProjectSkeleton() {
    return (
        <div className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
            <div className="h-[180px] bg-slate-200 dark:bg-slate-700" />
            <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
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
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="projects">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between mb-12">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                GitHub Repositories
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                Featured Projects
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400">
                                Production-ready projects from my GitHub portfolio.
                            </p>
                        </div>

                        <a
                            href="https://github.com/sahrudindev?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary-dark font-bold transition-colors group"
                        >
                            View All Repositories
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <ProjectSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-[48px] text-slate-400 mb-4">error</span>
                            <p className="text-slate-500">Failed to load projects. Please try again.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
