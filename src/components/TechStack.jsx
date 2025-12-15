import { techStack } from '../data/portfolioData';
import { AnimatedList, ShinyText } from './reactbits';

export default function TechStack() {
    return (
        <section className="py-12 bg-white dark:bg-surface-dark border-y border-slate-100 dark:border-slate-800" id="stack">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
                        <ShinyText
                            text="Technology Stack & Tools"
                            speed={3}
                            className="text-sm font-bold uppercase tracking-widest"
                        />
                    </h3>
                    <AnimatedList
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
                        staggerDelay={0.05}
                        direction="scale"
                    >
                        {techStack.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-default"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <span className={`material-symbols-outlined text-[28px] text-slate-500 dark:text-slate-400 transition-colors ${tech.hoverColor}`}>
                                    {tech.icon}
                                </span>
                                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{tech.name}</span>
                            </div>
                        ))}
                    </AnimatedList>
                </div>
            </div>
        </section>
    );
}
