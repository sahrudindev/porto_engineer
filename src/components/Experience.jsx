import { motion } from 'framer-motion';
import { GradientText } from './reactbits';

const experiences = [
    {
        title: 'Data Engineering Projects',
        organization: 'Self-Learning & Portfolio',
        period: '2023 - Present',
        type: 'Projects',
        description: 'Building production-grade data platforms and pipelines with modern tools like Apache Spark, dbt, Airflow, and Docker.',
        achievements: [
            'Real-Time Data Platform with Lakehouse Architecture',
            'NYC Taxi FinOps Analytics Dashboard',
            'E-Commerce Revenue Analyzer with dbt',
            'Job Market Data Scraper & Analytics',
        ],
        technologies: ['Python', 'Spark', 'dbt', 'Docker', 'GCP'],
        icon: 'database',
        color: 'from-primary to-violet-500',
    },
    {
        title: 'Deep Learning & Machine Learning',
        organization: 'Coursera Specializations',
        period: '2022 - 2023',
        type: 'Certifications',
        description: 'Completed multiple specializations in Machine Learning, Deep Learning, and TensorFlow from top institutions.',
        achievements: [
            'Machine Learning Specialization (Stanford)',
            'DeepLearning.AI TensorFlow Developer',
            'Advanced Learning Algorithms',
            'Neural Networks & Deep Learning',
        ],
        technologies: ['TensorFlow', 'Keras', 'scikit-learn', 'Python'],
        icon: 'psychology',
        color: 'from-violet-500 to-cyan-500',
    },
    {
        title: 'Bachelor of Computer Science',
        organization: 'Institut Teknologi Garut',
        period: '2021 - Present',
        type: 'Education',
        description: 'Focused on Data Science and Machine Learning, achieving one of the highest Python programming GPAs.',
        achievements: [
            'Top GPA in Python Programming',
            'Focus on Data Science & ML',
            'Developed multiple academic projects',
            'Active in coding communities',
        ],
        technologies: ['Python', 'SQL', 'ML', 'Statistics'],
        icon: 'school',
        color: 'from-cyan-500 to-emerald-500',
    },
];

function TimelineCard({ experience, index, isLast }) {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-start gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Timeline Line & Dot (Mobile) */}
            <div className="lg:hidden absolute left-8 top-0 bottom-0 w-[2px]">
                {!isLast && (
                    <div className="absolute top-12 bottom-0 w-full bg-gradient-to-b from-primary via-violet-500 to-transparent" />
                )}
            </div>

            {/* Timeline Dot (Mobile) */}
            <div className="lg:hidden relative z-10 flex-shrink-0">
                <div className={`timeline-dot bg-gradient-to-br ${experience.color}`} />
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-1 lg:w-[calc(50%-40px)]"
            >
                <div className="group relative bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:shadow-primary/5 transition-all hover-lift overflow-hidden">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${experience.color}`} />

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${experience.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                            <span className="material-symbols-outlined text-[24px]">{experience.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${experience.color} text-white`}>
                                    {experience.type}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {experience.period}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5 truncate">
                                {experience.title}
                            </h3>
                            <p className="text-sm font-medium text-primary">{experience.organization}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                        <ul className="space-y-2">
                            {experience.achievements.slice(0, 3).map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check_circle</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Desktop Timeline Center */}
            <div className="hidden lg:flex flex-col items-center">
                <div className={`timeline-dot bg-gradient-to-br ${experience.color}`} />
                {!isLast && (
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-primary via-violet-500 to-cyan-500 mt-2" />
                )}
            </div>

            {/* Spacer for desktop alternating layout */}
            <div className="hidden lg:block flex-1 lg:w-[calc(50%-40px)]" />
        </div>
    );
}

export default function Experience() {
    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-surface-dark relative overflow-hidden" id="experience">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-violet-500/5 to-cyan-500/5 rounded-full blur-3xl" />

            <div className="flex justify-center relative z-10">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Journey
                            </span>
                        </motion.span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                animationSpeed={5}
                                className="text-4xl lg:text-5xl font-black"
                            >
                                Experience & Education
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            My path from student to data engineering practitioner
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative pl-16 lg:pl-0 space-y-8 lg:space-y-12">
                        {experiences.map((experience, index) => (
                            <TimelineCard
                                key={index}
                                experience={experience}
                                index={index}
                                isLast={index === experiences.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
