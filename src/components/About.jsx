import { useState, useEffect } from 'react';
import { fetchGitHubProfile, fetchGitHubRepos } from '../services/github';

export default function About() {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ repos: 0, followers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const [profileData, repos] = await Promise.all([
                    fetchGitHubProfile(),
                    fetchGitHubRepos('updated', 100),
                ]);

                if (profileData) {
                    setProfile(profileData);
                    setStats({
                        repos: profileData.public_repos || 0,
                        followers: profileData.followers || 0,
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const personalInfo = {
        name: profile?.name || 'Sahrudin',
        title: 'Data Engineer',
        location: profile?.location || 'Indonesia',
        bio: profile?.bio || 'Data Science & Machine Learning enthusiast',
        avatar: profile?.avatar_url || 'https://avatars.githubusercontent.com/u/92308156?v=4',
        github: profile?.html_url || 'https://github.com/sahrudindev',
        linkedin: 'https://www.linkedin.com/in/sahrudindev/',
        email: 'sahrudindev@gmail.com',
        available: true,
        fullBio: `A passionate Data Engineer with a strong foundation in Data Science and Machine Learning from Institut Teknologi Garut. I specialize in building scalable data platforms, ETL/ELT pipelines, and analytics solutions.

My journey started with a deep focus on Python programming, where I achieved one of the highest GPAs in my cohort. This strong technical foundation enables me to architect efficient data systems that transform raw data into actionable insights.

Currently focused on: Real-time data platforms, Lakehouse architecture, FinOps optimization, and building end-to-end data solutions with modern tools like Spark, Airflow, and Docker.`,
    };

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="about">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            About Me
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            The Engineer Behind the Pipelines
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Photo */}
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative group">
                                {/* Decorative elements */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-50" />

                                {/* Photo container */}
                                <div className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                                    {loading ? (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                                    ) : (
                                        <img
                                            src={personalInfo.avatar}
                                            alt={personalInfo.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}

                                    {/* Overlay badge */}
                                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-2">
                                            {personalInfo.available && (
                                                <>
                                                    <span className="relative flex h-2.5 w-2.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                                    </span>
                                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                                        Open to Work
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {personalInfo.name}
                                </h3>
                                <p className="text-lg text-primary font-medium mb-4">
                                    {personalInfo.title} • {personalInfo.location}
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {personalInfo.fullBio.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* GitHub Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">code</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Repositories</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.repos}+</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Location</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{personalInfo.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-[20px]">school</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Education</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">ITG</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Status</p>
                                        <p className="text-sm font-medium text-green-600">Available</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-4">
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    GitHub
                                </a>
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
