import { blogPosts } from '../data/portfolioData';

export default function Blog() {
    const categoryColors = {
        'Cost Optimization': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        'Reliability': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        'Architecture': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    };

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark" id="blog">
            <div className="flex justify-center">
                <div className="flex flex-col max-w-[1200px] w-full px-6 lg:px-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between mb-12">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                Engineering Notes
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                Technical Insights
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Production lessons, trade-off analyses, and deep dives
                            </p>
                        </div>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold transition-colors group"
                        >
                            View All Posts
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col bg-background-light dark:bg-background-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all hover:-translate-y-1"
                            >
                                {/* Thumbnail Placeholder */}
                                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-4 left-4 w-12 h-12 border-2 border-primary/30 rounded-lg" />
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-blue-400/30 rounded-full" />
                                    </div>
                                    <span className="material-symbols-outlined text-[48px] text-slate-400 dark:text-slate-500">
                                        article
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-6">
                                    {/* Meta */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'}`}>
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-slate-400">{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More */}
                                    <a
                                        href={`#blog/${post.slug}`}
                                        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors group/link"
                                    >
                                        Read Article
                                        <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
