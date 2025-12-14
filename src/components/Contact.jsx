import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Using Formspree - replace with your form ID
        const formspreeEndpoint = 'https://formspree.io/f/your-form-id';

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', company: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="contact">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Available for full-time roles and consulting projects. Let's discuss how I can help build your next data platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Direct Contact Cards */}
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all group"
                                >
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">Email</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{personalInfo.email}</p>
                                    </div>
                                </a>

                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all group"
                                >
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">LinkedIn</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Connect Professionally</p>
                                    </div>
                                </a>

                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all group"
                                >
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">GitHub</p>
                                        <p className="font-bold text-slate-900 dark:text-white">View Projects</p>
                                    </div>
                                </a>

                                <a
                                    href={personalInfo.resumeUrl}
                                    className="flex items-center gap-4 p-5 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all group"
                                >
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">description</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">Resume</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Download PDF</p>
                                    </div>
                                </a>
                            </div>

                            {/* Location */}
                            <div className="p-5 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-xl border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">Based in</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                    Send a Message
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            placeholder="Tech Corp"
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                        placeholder="Hi, I'm interested in discussing a data engineering project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                                >
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
                                </button>

                                {status === 'error' && (
                                    <p className="mt-4 text-center text-red-500 text-sm">
                                        Failed to send message. Please try again or email directly.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
