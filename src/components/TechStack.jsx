import { motion } from 'framer-motion';
import { GradientText } from './reactbits';

// Tech items with real icons
const techStack = [
    // Row 1 - Core & Data Engineering
    { name: 'Python', icon: '/icons/python.svg', color: '#3776AB' },
    { name: 'Apache Spark', icon: '/icons/spark.svg', color: '#E25A1C' },
    { name: 'SQL', icon: '/icons/sql.svg', color: '#336791' },
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#4169E1' },
    { name: 'dbt', icon: '/icons/dbt.svg', color: '#FF694B' },
    { name: 'Airflow', icon: '/icons/airflow.svg', color: '#017CEE' },
    { name: 'Kafka', icon: '/icons/kafka.svg', color: '#231F20' },
    { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ED' },
    // Row 2 - Cloud & Analytics
    { name: 'GCP', icon: '/icons/gcp.svg', color: '#4285F4' },
    { name: 'BigQuery', icon: '/icons/bigquery.svg', color: '#669DF6' },
    { name: 'Kubernetes', icon: '/icons/kubernetes.svg', color: '#326CE5' },
    { name: 'Terraform', icon: '/icons/terraform.svg', color: '#7B42BC' },
    { name: 'Pandas', icon: '/icons/pandas.svg', color: '#150458' },
    { name: 'Polars', icon: '/icons/polars.svg', color: '#CD792C' },
    { name: 'Redis', icon: '/icons/redis.svg', color: '#DC382D' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg', color: '#47A248' },
];

// Emoji fallback for icons
const emojiMap = {
    'Python': '🐍',
    'Apache Spark': '⚡',
    'SQL': '🗃️',
    'PostgreSQL': '🐘',
    'dbt': '🔷',
    'Airflow': '🌀',
    'Kafka': '📨',
    'Docker': '🐳',
    'GCP': '☁️',
    'BigQuery': '📊',
    'Kubernetes': '⎈',
    'Terraform': '🏗️',
    'Pandas': '🐼',
    'Polars': '🐻‍❄️',
    'Redis': '🔴',
    'MongoDB': '🍃',
};

function TechBadge({ name, icon, color }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.08,
                y: -5,
                boxShadow: `0 20px 40px -10px ${color}40`,
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-2xl 
                bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
                border border-slate-200/80 dark:border-slate-700/80 
                hover:border-transparent
                shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50
                cursor-default transition-all duration-300"
            style={{
                '--glow-color': color,
            }}
        >
            {/* Gradient border on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(135deg, ${color}30, transparent, ${color}20)`,
                }}
            />

            {/* Glow effect */}
            <div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: color }}
            />

            {/* Icon */}
            <div
                className="relative w-8 h-8 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}15` }}
            >
                <span className="text-xl">{emojiMap[name] || '💻'}</span>
            </div>

            {/* Name */}
            <span className="relative text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {name}
            </span>
        </motion.div>
    );
}

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
    return (
        <div className="relative py-3 overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-5 hover:[animation-play-state:paused]"
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
    const row1 = techStack.slice(0, 8);
    const row2 = techStack.slice(8, 16);

    return (
        <section className="py-16 lg:py-20 bg-white dark:bg-surface-dark overflow-hidden relative">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/50 dark:from-slate-800/20 dark:to-slate-800/20" />

            {/* Floating orbs decoration */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5"
                    >
                        <span className="material-symbols-outlined text-primary text-[18px]">deployed_code</span>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                            Tech Stack
                        </span>
                    </motion.span>

                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">
                        <GradientText
                            colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                            animationSpeed={5}
                            className="text-3xl lg:text-4xl font-black"
                        >
                            Tools of the Trade
                        </GradientText>
                    </h2>

                    <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Technologies I use to build production-grade data platforms
                    </p>
                </motion.div>

                {/* Premium Marquee Rows */}
                <div className="space-y-2">
                    <MarqueeRow items={row1} direction="left" speed={45} />
                    <MarqueeRow items={row2} direction="right" speed={40} />
                </div>

                {/* Subtle stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-8 mt-10"
                >
                    <div className="text-center">
                        <span className="text-2xl font-black text-primary">16+</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Technologies</p>
                    </div>
                    <div className="w-px bg-slate-200 dark:bg-slate-700" />
                    <div className="text-center">
                        <span className="text-2xl font-black text-violet-500">4+</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Years Experience</p>
                    </div>
                    <div className="w-px bg-slate-200 dark:bg-slate-700" />
                    <div className="text-center">
                        <span className="text-2xl font-black text-cyan-500">∞</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Learning</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
