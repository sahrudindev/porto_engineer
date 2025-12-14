import { personalInfo, stats } from '../data/portfolioData';

export default function Hero() {
    return (
        <section className="relative w-full flex justify-center py-16 lg:py-24 overflow-hidden" id="home">
            {/* Background Gradient Blurs */}
            <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-[20%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10 z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <div className="flex flex-col gap-8 flex-1 text-center lg:text-left">
                        {/* Availability Badge */}
                        {personalInfo.available && (
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-surface-dark/80 px-4 py-1.5 self-center lg:self-start backdrop-blur-sm shadow-sm animate-fade-in-up">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                    Available for Opportunities
                                </span>
                            </div>
                        )}

                        {/* Headline */}
                        <div className="space-y-5 animate-fade-in-up delay-100">
                            <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                Building{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                    {personalInfo.tagline.split(' ').slice(0, 1).join(' ')}
                                </span>{' '}
                                {personalInfo.tagline.split(' ').slice(1).join(' ')}
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {personalInfo.shortBio}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 animate-fade-in-up delay-200">
                            <a
                                href={personalInfo.resumeUrl}
                                className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined mr-2 text-[20px]">download</span>
                                Download Resume
                            </a>
                            <a
                                href="#projects"
                                className="flex h-12 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark px-8 text-base font-bold text-slate-900 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <span className="material-symbols-outlined mr-2 text-[20px]">visibility</span>
                                View Projects
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700 mt-2 animate-fade-in-up delay-300">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center sm:text-left group">
                                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                                        <span className="material-symbols-outlined text-primary text-[18px]">{stat.icon}</span>
                                        <p className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative animate-fade-in-up">
                        <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 group">
                            {/* Abstract Data Viz */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/50 rounded-lg animate-pulse" />
                                <div className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-primary/30 rounded-xl animate-pulse" style={{ animationDelay: '1s' }} />
                                <div className="absolute top-1/3 right-10 w-1 h-32 bg-gradient-to-b from-primary/50 to-transparent" />
                                <div className="absolute bottom-1/4 left-16 w-1 h-24 bg-gradient-to-b from-blue-400/50 to-transparent" />

                                {/* Data flow lines */}
                                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(19, 127, 236, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                                    <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                                    <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(19, 127, 236, 0.4)" strokeWidth="2" />
                                </svg>
                            </div>

                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-2xl bg-primary/20 backdrop-blur flex items-center justify-center animate-float">
                                    <span className="material-symbols-outlined text-[48px] text-primary">hub</span>
                                </div>
                            </div>

                            {/* Floating Status Card */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg flex items-center justify-between transition-transform group-hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 flex items-center justify-center bg-green-500/20 rounded-lg text-green-400">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Pipeline Status</p>
                                        <p className="text-sm font-bold text-white">All Systems Operational</p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                    Docker
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
