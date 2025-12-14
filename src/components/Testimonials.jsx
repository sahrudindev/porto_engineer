import { testimonials } from '../data/portfolioData';

export default function Testimonials() {
    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="testimonials">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            What Colleagues Say
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Feedback from managers and team members I've worked with
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="group relative flex flex-col p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all hover:-translate-y-1"
                            >
                                {/* Quote Icon */}
                                <div className="absolute -top-3 left-6">
                                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                                        <span className="material-symbols-outlined text-[18px]">format_quote</span>
                                    </div>
                                </div>

                                {/* Quote */}
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 mb-6 italic">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-white font-bold text-sm">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {testimonial.role}, {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* LinkedIn CTA */}
                    <div className="text-center mt-10">
                        <a
                            href="https://linkedin.com/in/yourprofile/recommendations"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors group"
                        >
                            <span>View all recommendations on LinkedIn</span>
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
