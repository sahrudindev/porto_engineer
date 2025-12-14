import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#projects', label: 'Projects' },
        { href: '#certifications', label: 'Certifications' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'
                : 'bg-transparent'
            }`}>
            <div className="flex justify-center">
                <div className="flex w-full max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <span className="material-symbols-outlined text-[24px]">data_object</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                            DataEngineer
                        </h2>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Side: Theme Toggle & CTA */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:border-primary/50 transition-all"
                            aria-label="Toggle dark mode"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {darkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        {/* CTA Button */}
                        <a
                            href={personalInfo.resumeUrl}
                            className="hidden sm:flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                        >
                            <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
                            Resume
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 shadow-lg animate-fade-in-up">
                    <div className="px-6 py-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={personalInfo.resumeUrl}
                            className="flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white mt-4"
                        >
                            <span className="material-symbols-outlined mr-2">download</span>
                            Download Resume
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
