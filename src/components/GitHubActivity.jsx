import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchGitHubProfile, fetchGitHubRepos } from '../services/github';
import { GradientText } from './reactbits';

function StatCard({ icon, value, label, gradient }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all"
        >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
                <div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
                </div>
            </div>
        </motion.div>
    );
}

function ActivityGraph() {
    // Simulated contribution data
    const weeks = 20;
    const days = 7;
    const data = Array.from({ length: weeks }, () =>
        Array.from({ length: days }, () => Math.floor(Math.random() * 5))
    );

    const getIntensityClass = (level) => {
        const classes = [
            'bg-slate-200 dark:bg-slate-700',
            'bg-emerald-200 dark:bg-emerald-900',
            'bg-emerald-300 dark:bg-emerald-700',
            'bg-emerald-400 dark:bg-emerald-500',
            'bg-emerald-500 dark:bg-emerald-400',
        ];
        return classes[level] || classes[0];
    };

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-emerald-500">insights</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Contribution Activity</h3>
            </div>
            <div className="overflow-x-auto">
                <div className="flex gap-1 min-w-fit">
                    {data.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => (
                                <motion.div
                                    key={dayIndex}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.002 }}
                                    className={`w-3 h-3 rounded-sm ${getIntensityClass(day)}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-xs text-slate-500">Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityClass(level)}`} />
                ))}
                <span className="text-xs text-slate-500">More</span>
            </div>
        </div>
    );
}

function RecentRepos({ repos }) {
    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            </div>
            <div className="space-y-3">
                {repos.slice(0, 5).map((repo, index) => (
                    <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/5 transition-colors group"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">commit</span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-primary transition-colors">
                                {repo.name}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500 flex-shrink-0">
                            {new Date(repo.updated_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                        </span>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}

export default function GitHubActivity() {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [profileData, reposData] = await Promise.all([
                    fetchGitHubProfile(),
                    fetchGitHubRepos('updated', 10),
                ]);
                setProfile(profileData);
                setRepos(reposData || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const stats = [
        { icon: 'folder', value: profile?.public_repos || '0', label: 'Repositories', gradient: 'from-primary to-violet-500' },
        { icon: 'group', value: profile?.followers || '0', label: 'Followers', gradient: 'from-violet-500 to-cyan-500' },
        { icon: 'star', value: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0) || '0', label: 'Total Stars', gradient: 'from-amber-500 to-orange-500' },
        { icon: 'device_hub', value: repos.reduce((acc, r) => acc + (r.forks_count || 0), 0) || '0', label: 'Forks', gradient: 'from-cyan-500 to-emerald-500' },
    ];

    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-surface-dark relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

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
                            <svg className="h-4 w-4 text-slate-700 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                GitHub Activity
                            </span>
                        </motion.span>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                animationSpeed={5}
                                className="text-3xl lg:text-4xl font-black"
                            >
                                Open Source Contributions
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                            My coding activity and contributions on GitHub
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <StatCard {...stat} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Activity Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <ActivityGraph />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <RecentRepos repos={repos} />
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-10"
                    >
                        <a
                            href={profile?.html_url || 'https://github.com/sahrudindev'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-primary/10 text-slate-700 dark:text-slate-200 font-bold transition-all group"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View Full Profile
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
