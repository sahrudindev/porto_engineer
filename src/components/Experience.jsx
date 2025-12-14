import { experience } from '../data/portfolioData';

export default function Experience() {
    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="experience">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Career Journey
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Building data platforms across startups and enterprises
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-slate-200 dark:to-slate-700 transform lg:-translate-x-1/2" />

                        {/* Experience Items */}
                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    className={`relative flex flex-col lg:flex-row gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 z-10">
                                        <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-background-dark ${exp.current
                                                ? 'bg-primary ring-4 ring-primary/20'
                                                : 'bg-slate-300 dark:bg-slate-600'
                                            }`} />
                                    </div>

                                    {/* Date Badge - Desktop */}
                                    <div className={`hidden lg:flex w-[calc(50%-2rem)] ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${exp.current
                                                    ? 'bg-primary text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                }`}>
                                                {exp.period}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-20 lg:ml-0 lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'
                                        }`}>
                                        <div className="group bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all hover:-translate-y-1">
                                            {/* Mobile Date */}
                                            <div className="lg:hidden mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${exp.current
                                                        ? 'bg-primary text-white'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                    }`}>
                                                    {exp.period}
                                                </span>
                                            </div>

                                            {/* Header */}
                                            <div className="mb-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-primary font-medium">{exp.company}</p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">{exp.location}</p>
                                                    </div>
                                                    {exp.current && (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                                {exp.description}
                                            </p>

                                            {/* Achievements */}
                                            <ul className="space-y-2 mb-4">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 flex-shrink-0">
                                                            check_circle
                                                        </span>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                                                {exp.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-md"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
