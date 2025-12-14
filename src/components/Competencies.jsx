import { competencies } from '../data/portfolioData';

export default function Competencies() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="competencies">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-end justify-between mb-12">
                        <div className="max-w-2xl">
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                Expertise
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Core Competencies
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                End-to-end data solutions focused on reliability, scalability, and FinOps awareness.
                            </p>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {competencies.map((competency, index) => (
                            <div
                                key={competency.title}
                                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1 hover:border-primary/50"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">{competency.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{competency.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{competency.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
