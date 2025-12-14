import { useState, useEffect } from 'react';
import { fetchCertificates } from '../services/github';

const categoryIcons = {
    'Machine learning': 'psychology',
    'Machine Learning': 'psychology',
    'Deep Learning': 'model_training',
    'Mathematics for Machine Learning and Data Science': 'calculate',
    'TensorFlow Developer': 'code',
    'TensorFlow: Data and Deployment': 'deployed_code',
    'Standalone': 'workspace_premium',
};

const categoryColors = {
    'Machine learning': { color: 'text-[#FF6F00]', bg: 'bg-[#FF6F00]/10', border: 'border-[#FF6F00]/20' },
    'Machine Learning': { color: 'text-[#FF6F00]', bg: 'bg-[#FF6F00]/10', border: 'border-[#FF6F00]/20' },
    'Deep Learning': { color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10', border: 'border-[#7C3AED]/20' },
    'Mathematics for Machine Learning and Data Science': { color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', border: 'border-[#2563EB]/20' },
    'TensorFlow Developer': { color: 'text-[#FF6F00]', bg: 'bg-[#FF6F00]/10', border: 'border-[#FF6F00]/20' },
    'TensorFlow: Data and Deployment': { color: 'text-[#FF6F00]', bg: 'bg-[#FF6F00]/10', border: 'border-[#FF6F00]/20' },
    'Standalone': { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
};

function CertificateSkeleton() {
    return (
        <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 animate-pulse">
            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
    );
}

function CertificateCard({ cert }) {
    const colors = categoryColors[cert.category] || categoryColors['Standalone'];
    const icon = categoryIcons[cert.category] || 'workspace_premium';

    return (
        <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all hover:-translate-y-1 overflow-hidden`}
        >
            {/* Top accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                style={{ background: `linear-gradient(90deg, ${colors.color.replace('text-[', '').replace(']', '')}, transparent)` }} />

            {/* Type Badge */}
            <div className="absolute top-4 right-4">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${cert.type === 'Specialization'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                    {cert.type}
                </span>
            </div>

            {/* Icon */}
            <div className={`h-14 w-14 flex items-center justify-center rounded-xl ${colors.bg} ${colors.color} mb-4 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
            </div>

            {/* Content */}
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight mb-2 group-hover:text-primary transition-colors pr-16 line-clamp-2">
                {cert.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="material-symbols-outlined text-[14px]">school</span>
                {cert.issuer}
            </div>

            {/* Category Tag */}
            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.color}`}>
                    <span className="material-symbols-outlined text-[12px]">folder</span>
                    {cert.category.length > 25 ? cert.category.substring(0, 25) + '...' : cert.category}
                </span>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-primary text-[20px]">open_in_new</span>
            </div>
        </a>
    );
}

export default function Certifications() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCertificates() {
            try {
                setLoading(true);
                const data = await fetchCertificates();
                setCertificates(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadCertificates();
    }, []);

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="certifications">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Credentials
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Certifications & Courses
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Industry-recognized certifications from Coursera and DeepLearning.AI
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {[...Array(8)].map((_, i) => (
                                <CertificateSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Stats */}
                            <div className="flex flex-wrap justify-center gap-6 mb-10">
                                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-full">
                                    <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{certificates.length}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Total Certificates</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-full">
                                    <span className="material-symbols-outlined text-yellow-500 text-[20px]">star</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {certificates.filter(c => c.type === 'Specialization').length}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Specializations</span>
                                </div>
                            </div>

                            {/* Certificate Grid - Show only 10, Specializations first */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                                {[...certificates]
                                    .sort((a, b) => {
                                        if (a.type === 'Specialization' && b.type !== 'Specialization') return -1;
                                        if (a.type !== 'Specialization' && b.type === 'Specialization') return 1;
                                        return 0;
                                    })
                                    .slice(0, 10)
                                    .map((cert, index) => (
                                        <CertificateCard key={index} cert={cert} />
                                    ))}
                            </div>

                            {/* View All Link */}
                            <div className="mt-10 text-center">
                                <a
                                    href="https://github.com/sahrudindev/sertifikat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all group"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    View All on GitHub
                                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
