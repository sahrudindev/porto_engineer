import { personalInfo } from '../data/portfolioData';

export default function About() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="about">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            About Me
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            The Engineer Behind the Pipelines
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Photo */}
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative group">
                                {/* Decorative elements */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-50" />

                                {/* Photo container */}
                                <div className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                                    <img
                                        src={personalInfo.profilePhoto}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay badge */}
                                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-2">
                                            {personalInfo.available && (
                                                <>
                                                    <span className="relative flex h-2.5 w-2.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                                    </span>
                                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                                        Open to Work
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {personalInfo.name}
                                </h3>
                                <p className="text-lg text-primary font-medium mb-4">
                                    {personalInfo.title} • {personalInfo.location}
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {personalInfo.fullBio.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Location</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{personalInfo.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">work_history</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Experience</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">5+ Years</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Email</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{personalInfo.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Status</p>
                                        <p className="text-sm font-medium text-green-600">Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
