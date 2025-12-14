import { certifications } from '../data/portfolioData';

export default function Certifications() {
    return (
        <section className="py-16 bg-white dark:bg-surface-dark" id="certifications">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Credentials
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Certifications & Badges
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Industry-recognized credentials validating technical expertise
                        </p>
                    </div>

                    {/* Certifications Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, index) => (
                            <a
                                key={cert.name}
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex flex-col items-center p-6 bg-background-light dark:bg-background-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className={`h-16 w-16 flex items-center justify-center rounded-xl ${cert.bgColor} ${cert.color} mb-4 transition-transform group-hover:scale-110`}>
                                    <span className="material-symbols-outlined text-[32px]">{cert.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                                        {cert.issuer}
                                    </p>
                                    <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium rounded">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-primary text-[18px]">open_in_new</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Additional Skills Badge */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-2xl border border-primary/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                    Continuous Learning
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Currently pursuing: AWS Data Analytics Specialty & Kubernetes CKAD
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    <div className="h-10 w-10 rounded-full bg-[#FF9900]/10 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#FF9900] text-[18px]">cloud</span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#326CE5]/10 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#326CE5] text-[18px]">deployed_code</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">In Progress</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
