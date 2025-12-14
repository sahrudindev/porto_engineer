import { useState, useEffect } from 'react';
import { fetchGitHubProfile } from '../services/github';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'sahrudindev';

export default function GitHubActivity() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await fetchGitHubProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="activity">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Open Source
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            GitHub Contribution Activity
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            My coding journey and open source contributions
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        <div className="flex flex-col items-center p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-[32px] text-primary mb-2">code</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {loading ? '...' : profile?.public_repos || 0}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Repositories</span>
                        </div>
                        <div className="flex flex-col items-center p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-[32px] text-green-500 mb-2">group</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {loading ? '...' : profile?.followers || 0}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Followers</span>
                        </div>
                        <div className="flex flex-col items-center p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-[32px] text-blue-500 mb-2">person_add</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {loading ? '...' : profile?.following || 0}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Following</span>
                        </div>
                        <div className="flex flex-col items-center p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-[32px] text-yellow-500 mb-2">calendar_month</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {loading ? '...' : profile?.created_at ? new Date(profile.created_at).getFullYear() : '2021'}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Since</span>
                        </div>
                    </div>

                    {/* Contribution Graph */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white">
                                    <svg className="h-7 w-7 text-white dark:text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">@{GITHUB_USERNAME}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Contribution activity</p>
                                </div>
                            </div>

                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                            >
                                View Profile
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </a>
                        </div>

                        {/* GitHub Contribution Chart - Using ghchart.rshah.org */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[700px]">
                                <img
                                    src={`https://ghchart.rshah.org/137fec/${GITHUB_USERNAME}`}
                                    alt="GitHub Contribution Chart"
                                    className="w-full rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700" />
                                <div className="w-3 h-3 rounded-sm bg-primary/30" />
                                <div className="w-3 h-3 rounded-sm bg-primary/50" />
                                <div className="w-3 h-3 rounded-sm bg-primary/70" />
                                <div className="w-3 h-3 rounded-sm bg-primary" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all"
                        >
                            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                                <span className="material-symbols-outlined text-[24px]">folder_copy</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    View Repositories
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {loading ? '...' : profile?.public_repos || 0} public repos
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                arrow_forward
                            </span>
                        </a>

                        <a
                            href={`https://github.com/${GITHUB_USERNAME}?tab=stars`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all"
                        >
                            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                                <span className="material-symbols-outlined text-[24px]">star</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    Starred Repos
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Explore favorites
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                arrow_forward
                            </span>
                        </a>

                        <a
                            href={`https://github.com/${GITHUB_USERNAME}?tab=followers`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all"
                        >
                            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                                <span className="material-symbols-outlined text-[24px]">people</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    Community
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {loading ? '...' : profile?.followers || 0} followers
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
