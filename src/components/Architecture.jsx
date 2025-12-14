import { architectures } from '../data/portfolioData';

export default function Architecture() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="architecture">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            System Design
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Architecture Patterns
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Reference architectures adapted for scale, reliability, and cost efficiency.
                        </p>
                    </div>

                    {/* Architecture Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {architectures.map((arch, index) => (
                            <div
                                key={arch.title}
                                className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Icon */}
                                <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[32px]">{arch.icon}</span>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{arch.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{arch.description}</p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-col gap-2 mt-auto">
                                    {arch.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className={`flex items-center gap-2 text-sm ${feature.includes('Docker') ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-500 dark:text-slate-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                {feature.includes('Docker') ? 'deployed_code' : 'check_circle'}
                                            </span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
