import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            href: personalInfo.github,
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: personalInfo.linkedin,
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: 'Email',
            href: `mailto:${personalInfo.email}`,
            icon: <span className="material-symbols-outlined text-[20px]">mail</span>,
        },
    ];

    return (
        <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-cyan-500" />

            {/* Background decoration */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 flex justify-center">
                <div className="max-w-[1200px] w-full px-6 lg:px-10 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
                        {/* Brand */}
                        <div className="lg:col-span-5">
                            <a href="#home" className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                                    <span className="material-symbols-outlined text-[24px]">data_object</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Sahrudin</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Engineer</p>
                                </div>
                            </a>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                                Building production-grade data platforms with modern tools. Passionate about transforming raw data into actionable insights.
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-primary hover:to-violet-500 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="lg:col-span-3">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="material-symbols-outlined text-[16px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                arrow_forward
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Get in Touch</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href={`mailto:${personalInfo.email}`}
                                        className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                                        {personalInfo.email}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                                    {personalInfo.location}
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                    </span>
                                    <span className="text-emerald-400 font-medium">Available for opportunities</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © {currentYear} Sahrudin. Built with ❤️ and React.
                        </p>
                        <p className="text-slate-600 text-xs">
                            Designed & Developed by{' '}
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                Sahrudin
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25 flex items-center justify-center hover:shadow-xl hover:-translate-y-0.5 transition-all z-50"
                aria-label="Scroll to top"
            >
                <span className="material-symbols-outlined">arrow_upward</span>
            </motion.button>
        </footer>
    );
}
