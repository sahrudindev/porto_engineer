import { motion } from 'framer-motion';
import { GradientText } from './reactbits';

const techCategories = [
    {
        name: 'Languages',
        items: [
            { name: 'Python', icon: '🐍', color: '#3776AB' },
            { name: 'SQL', icon: '🗃️', color: '#336791' },
            { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
            { name: 'Bash', icon: '💻', color: '#4EAA25' },
        ]
    },
    {
        name: 'Data Processing',
        items: [
            { name: 'Apache Spark', icon: '⚡', color: '#E25A1C' },
            { name: 'Pandas', icon: '🐼', color: '#150458' },
            { name: 'dbt', icon: '🔷', color: '#FF694B' },
            { name: 'Polars', icon: '🐻‍❄️', color: '#CD792C' },
        ]
    },
    {
        name: 'Cloud & Infra',
        items: [
            { name: 'Docker', icon: '🐳', color: '#2496ED' },
            { name: 'GCP', icon: '☁️', color: '#4285F4' },
            { name: 'BigQuery', icon: '📊', color: '#669DF6' },
            { name: 'Airflow', icon: '🌀', color: '#017CEE' },
        ]
    },
    {
        name: 'ML & Analytics',
        items: [
            { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
            { name: 'Scikit-learn', icon: '📈', color: '#F7931E' },
            { name: 'Streamlit', icon: '📱', color: '#FF4B4B' },
            { name: 'Jupyter', icon: '📓', color: '#F37626' },
        ]
    },
];

// All items for marquee
const allTechItems = techCategories.flatMap(cat => cat.items);

function TechBadge({ name, icon, color }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all cursor-default group"
            style={{
                boxShadow: `0 0 0 rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0)`,
            }}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap group-hover:text-primary transition-colors">
                {name}
            </span>
        </motion.div>
    );
}

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
    return (
        <div className="marquee-container py-2 overflow-hidden">
            <motion.div
                className="flex gap-4"
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, index) => (
                    <TechBadge key={`${item.name}-${index}`} {...item} />
                ))}
            </motion.div>
        </div>
    );
}

export default function TechStack() {
    const row1 = allTechItems.slice(0, 8);
    const row2 = allTechItems.slice(8).concat(allTechItems.slice(0, 4));

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

            <div className="relative z-10">
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
                        <span className="material-symbols-outlined text-primary text-[18px]">construction</span>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            Tech Stack
                        </span>
                    </motion.span>
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
                        <GradientText
                            colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                            animationSpeed={5}
                            className="text-3xl lg:text-4xl font-black"
                        >
                            Technologies I Work With
                        </GradientText>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto px-4">
                        Modern tools and frameworks for building scalable data solutions
                    </p>
                </motion.div>

                {/* Marquee Rows */}
                <div className="space-y-4 mb-12">
                    <MarqueeRow items={row1} direction="left" speed={40} />
                    <MarqueeRow items={row2} direction="right" speed={35} />
                </div>

                {/* Category Grid */}
                <div className="flex justify-center px-6 lg:px-10">
                    <div className="max-w-[1200px] w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {techCategories.map((category, index) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                                >
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                        {category.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((item) => (
                                            <span
                                                key={item.name}
                                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                                            >
                                                {item.icon} {item.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
