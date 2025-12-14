import { useState } from 'react';
import { projects } from '../data/portfolioData';

function ProjectCard({ project, isReversed }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-primary/30`}>
            {/* Visual Side */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center group overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-8 left-8 w-16 h-16 border border-primary/30 rounded-lg" />
                    <div className="absolute bottom-12 right-12 w-12 h-12 border border-blue-400/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-primary/20 rounded-xl" />
                </div>

                {/* Architecture Flow */}
                {project.diagram && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {project.diagram.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="px-3 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-xs font-medium text-white">
                                        {step}
                                    </div>
                                    {idx < project.diagram.length - 1 && (
                                        <span className="material-symbols-outlined text-primary/60 text-[18px]">arrow_forward</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Center Icon */}
                <div className="absolute top-6 left-6 text-center transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-[48px] text-primary/60">{project.icon}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur text-white text-xs font-bold rounded-full border border-white/20">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center gap-5">
                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Case Study
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                        {project.industry}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400">{project.description}</p>

                {/* Expandable Details */}
                {isExpanded && (
                    <div className="space-y-4 animate-fade-in-up border-l-2 border-primary/30 pl-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400 mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">warning</span>
                                Challenge
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{project.challenge}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Solution
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{project.solution}</p>
                        </div>
                    </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className={`px-3 py-1 rounded border text-xs font-medium ${tech === project.dockerHighlight
                                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Metrics */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <div className="flex gap-6 flex-wrap">
                        {project.metrics.map((metric, index) => (
                            <div key={index}>
                                <span className="block text-2xl font-bold text-primary">{metric.value}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 group/btn transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Read Case Study'}
                        <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
                            {isExpanded ? 'expand_less' : 'arrow_right_alt'}
                        </span>
                    </button>
                    {project.repoUrl && project.repoUrl !== '#' && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="projects">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Portfolio
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">Featured Projects</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400">Production case studies with measurable business impact.</p>
                    </div>

                    {/* Projects List */}
                    <div className="flex flex-col gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isReversed={index % 2 === 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
