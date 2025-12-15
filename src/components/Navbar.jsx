import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Magnet } from './reactbits';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { darkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = ['home', 'about', 'experience', 'projects', 'certifications', 'contact'];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home', icon: 'home' },
        { href: '#about', label: 'About', icon: 'person' },
        { href: '#experience', label: 'Experience', icon: 'work' },
        { href: '#projects', label: 'Projects', icon: 'folder' },
        { href: '#certifications', label: 'Certs', icon: 'workspace_premium' },
        { href: '#contact', label: 'Contact', icon: 'mail' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass-strong shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="flex justify-center">
                <div className="flex w-full max-w-[1200px] items-center justify-between px-6 py-3 lg:px-10">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow"
                        >
                            <span className="material-symbols-outlined text-[24px]">data_object</span>
                        </motion.div>
                        <div className="hidden sm:block">
                            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                                Sahrudin
                            </h2>
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Data Engineer
                            </p>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full glass">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                            ? 'text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNavBg"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 rounded-full shadow-lg shadow-primary/25"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        {/* Dark Mode Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="h-11 w-11 flex items-center justify-center rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            <motion.span
                                key={darkMode ? 'dark' : 'light'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                className="material-symbols-outlined text-[22px]"
                            >
                                {darkMode ? 'light_mode' : 'dark_mode'}
                            </motion.span>
                        </motion.button>

                        {/* Resume Button */}
                        <Magnet padding={40} magnetStrength={0.15}>
                            <a
                                href={personalInfo.resumeUrl}
                                className="hidden sm:flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-violet-500 px-5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                            >
                                <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
                                Resume
                            </a>
                        </Magnet>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden h-11 w-11 flex items-center justify-center rounded-xl glass text-slate-700 dark:text-slate-200"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                                className="material-symbols-outlined"
                            >
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </motion.span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden glass-strong border-t border-white/10"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`flex items-center gap-3 text-base font-medium py-3 px-4 rounded-xl transition-all ${activeSection === link.href.slice(1)
                                            ? 'bg-gradient-to-r from-primary to-violet-500 text-white'
                                            : 'text-slate-700 dark:text-slate-200 hover:bg-white/10'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                                    {link.label}
                                </motion.a>
                            ))}
                            <a
                                href={personalInfo.resumeUrl}
                                className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-violet-500 px-6 text-base font-bold text-white mt-2 shadow-lg shadow-primary/25"
                            >
                                <span className="material-symbols-outlined mr-2">download</span>
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
