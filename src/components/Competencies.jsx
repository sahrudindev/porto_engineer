import { motion } from 'framer-motion';
import { GradientText } from './reactbits';

const competencies = [
    {
        title: 'Data Pipeline Design',
        description: 'Building robust ETL/ELT pipelines that handle terabytes of data with fault tolerance and observability.',
        icon: 'route',
        gradient: 'from-primary to-violet-500',
        skills: ['Apache Airflow', 'dbt', 'Prefect'],
    },
    {
        title: 'Lakehouse Architecture',
        description: 'Designing Bronze/Silver/Gold layer architectures for scalable data platforms.',
        icon: 'layers',
        gradient: 'from-violet-500 to-cyan-500',
        skills: ['Delta Lake', 'Apache Iceberg', 'Spark'],
    },
    {
        title: 'Real-Time Processing',
        description: 'Implementing streaming data solutions for low-latency analytics and event processing.',
        icon: 'speed',
        gradient: 'from-cyan-500 to-emerald-500',
        skills: ['Kafka', 'Spark Streaming', 'Flink'],
    },
    {
        title: 'Cloud & DevOps',
        description: 'Deploying containerized data applications with CI/CD and infrastructure as code.',
        icon: 'cloud',
        gradient: 'from-emerald-500 to-primary',
        skills: ['Docker', 'GCP', 'Terraform'],
    },
];

function CompetencyCard({ competency, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative"
        >
            {/* Glow effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${competency.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative h-full p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all overflow-hidden">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${competency.gradient} flex items-center justify-center text-white shadow-lg mb-5`}>
                    <span className="material-symbols-outlined text-[28px]">{competency.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {competency.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {competency.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {competency.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Decorative corner */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${competency.gradient} opacity-5 rounded-full group-hover:opacity-10 transition-opacity`} />
            </div>
        </motion.div>
    );
}

export default function Competencies() {
    return (
        <section className="py-20 lg:py-28 bg-background-light dark:bg-background-dark relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex justify-center relative z-10">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Expertise
                            </span>
                        </motion.span>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                animationSpeed={5}
                                className="text-3xl lg:text-4xl font-black"
                            >
                                Core Competencies
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                            Key areas where I deliver value in data engineering projects
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {competencies.map((competency, index) => (
                            <CompetencyCard key={competency.title} competency={competency} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
