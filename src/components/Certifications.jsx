import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCertificates } from '../services/github';
import { GradientText } from './reactbits';

function CertCard({ cert, index }) {
    const isSpecialization = cert.type === 'Specialization';

    return (
        <motion.a
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block rounded-2xl overflow-hidden transition-all duration-300 ${isSpecialization
                    ? 'bg-gradient-to-br from-primary/5 via-violet-500/5 to-cyan-500/5 border-2 border-primary/20 hover:border-primary/50'
                    : 'bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/30'
                } hover:shadow-xl hover:shadow-primary/10`}
        >
            {/* Gradient top line for specializations */}
            {isSpecialization && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-cyan-500" />
            )}

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSpecialization
                            ? 'bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-primary'
                        }`}>
                        <span className="material-symbols-outlined text-[20px]">
                            {isSpecialization ? 'workspace_premium' : 'verified'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isSpecialization
                                ? 'bg-gradient-to-r from-primary to-violet-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                            {cert.type}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                            {cert.name}
                        </h3>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">school</span>
                        {cert.issuer}
                    </span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        View
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        </motion.a>
    );
}

function CertSkeleton() {
    return (
        <div className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 p-5 animate-pulse">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
            </div>
            <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded mt-4" />
        </div>
    );
}

export default function Certifications() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        async function loadCertificates() {
            try {
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

    const tabs = [
        { id: 'all', label: 'All', icon: 'grid_view' },
        { id: 'Specialization', label: 'Specializations', icon: 'workspace_premium' },
        { id: 'Course', label: 'Courses', icon: 'school' },
    ];

    const filteredCerts = activeTab === 'all'
        ? certificates
        : certificates.filter(c => c.type === activeTab);

    const specializations = certificates.filter(c => c.type === 'Specialization');
    const courses = certificates.filter(c => c.type === 'Course');

    return (
        <section className="py-20 lg:py-28 bg-background-light dark:bg-background-dark relative overflow-hidden" id="certifications">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/5 via-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />

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
                            <span className="material-symbols-outlined text-amber-500 text-[18px]">workspace_premium</span>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Credentials
                            </span>
                        </motion.span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#f59e0b", "#8b5cf6", "#137fec", "#f59e0b"]}
                                animationSpeed={5}
                                className="text-4xl lg:text-5xl font-black"
                            >
                                Certifications
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Professional certifications from top platforms
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 mt-6">
                            <div className="text-center">
                                <p className="text-2xl font-black text-primary">{specializations.length}</p>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Specializations</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-violet-500">{courses.length}</p>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Courses</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-cyan-500">{certificates.length}</p>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex p-1.5 rounded-xl glass">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                            ? 'text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.span
                                            layoutId="activeCertTab"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 rounded-lg"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 material-symbols-outlined text-[18px]">{tab.icon}</span>
                                    <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(9)].map((_, i) => (
                                <CertSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {filteredCerts.map((cert, index) => (
                                    <CertCard key={`${cert.name}-${index}`} cert={cert} index={index} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* No results */}
                    {!loading && filteredCerts.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-[48px] text-slate-400 mb-4">search_off</span>
                            <p className="text-slate-500">No certifications found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
