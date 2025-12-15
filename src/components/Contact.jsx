import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GradientText, Magnet } from './reactbits';

// Floating label input
function FloatingInput({ label, name, type = 'text', value, onChange, required = false }) {
    const [focused, setFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="peer w-full h-14 px-4 pt-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-primary transition-all"
                placeholder={label}
            />
            <label
                htmlFor={name}
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focused || hasValue
                        ? 'top-2 text-xs font-bold text-primary'
                        : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
                    }`}
            >
                {label} {required && '*'}
            </label>
        </div>
    );
}

function FloatingTextarea({ label, name, value, onChange, required = false, rows = 4 }) {
    const [focused, setFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <div className="relative">
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="peer w-full px-4 pt-7 pb-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-primary transition-all resize-none"
                placeholder={label}
            />
            <label
                htmlFor={name}
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focused || hasValue
                        ? 'top-2 text-xs font-bold text-primary'
                        : 'top-5 text-sm text-slate-500'
                    }`}
            >
                {label} {required && '*'}
            </label>
        </div>
    );
}

// Contact method card
function ContactCard({ icon, label, value, href, gradient }) {
    return (
        <motion.a
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
        >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                    {label}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                    {value}
                </p>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                arrow_forward
            </span>
        </motion.a>
    );
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate sending (replace with actual form submission)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: <span className="material-symbols-outlined text-[24px]">mail</span>,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            gradient: 'from-primary to-violet-500',
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            label: 'LinkedIn',
            value: 'Connect Professionally',
            href: personalInfo.linkedin,
            gradient: 'from-[#0A66C2] to-[#0077B5]',
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
            label: 'GitHub',
            value: 'View Projects',
            href: personalInfo.github,
            gradient: 'from-slate-700 to-slate-900',
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-surface-dark relative overflow-hidden" id="contact">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl" />

            <div className="flex justify-center relative z-10">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                        >
                            <span className="material-symbols-outlined text-primary text-[18px]">waving_hand</span>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                Get in Touch
                            </span>
                        </motion.span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            <GradientText
                                colors={["#137fec", "#8b5cf6", "#22d3ee", "#137fec"]}
                                animationSpeed={5}
                                className="text-4xl lg:text-5xl font-black"
                            >
                                Let's Work Together
                            </GradientText>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Open for full-time roles and consulting projects. Let's discuss how I can help build your next data platform.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 space-y-4"
                        >
                            {contactMethods.map((method, index) => (
                                <ContactCard key={index} {...method} />
                            ))}

                            {/* Location Card */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-violet-500/5 to-cyan-500/5 border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Based in</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <span className="flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                        Available for new opportunities
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">edit_note</span>
                                    Send a Message
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <FloatingInput
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FloatingInput
                                        label="Company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <FloatingInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <FloatingTextarea
                                        label="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                    />
                                </div>

                                <Magnet padding={40} magnetStrength={0.1}>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-500 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden relative group"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            {status === 'sending' ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : status === 'success' ? (
                                                <>
                                                    <span className="material-symbols-outlined">check_circle</span>
                                                    Message Sent!
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">send</span>
                                                    Send Message
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </Magnet>

                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 text-center text-red-500 text-sm"
                                    >
                                        Failed to send message. Please try again or email directly.
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
