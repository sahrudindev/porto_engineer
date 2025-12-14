// GitHub API Service
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'sahrudindev';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

const headers = GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {};

export async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
}

export async function fetchGitHubRepos(sort = 'updated', perPage = 10) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${perPage}`,
            { headers }
        );
        if (!response.ok) throw new Error('Failed to fetch repos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export async function fetchRepoReadme(repoName) {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
            { headers }
        );
        if (!response.ok) return null;
        const data = await response.json();
        // Decode base64 content
        const content = atob(data.content);
        return content;
    } catch (error) {
        console.error(`Error fetching README for ${repoName}:`, error);
        return null;
    }
}

// Extract only real images (png, jpg, jpeg, webp, gif) from README content
export function extractImagesFromReadme(readmeContent, repoName) {
    if (!readmeContent) return [];

    const images = [];

    // Match markdown image syntax: ![alt](url)
    const markdownImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;

    // Match HTML img tags: <img src="url"
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/gi;

    // Valid image extensions
    const validExtensions = /\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i;

    // Patterns to exclude (badges, shields, icons, etc.)
    const excludePatterns = [
        /shields\.io/i,
        /badge/i,
        /img\.shields/i,
        /github\.com\/.*\/badge/i,
        /travis-ci/i,
        /codecov/i,
        /coveralls/i,
        /circleci/i,
        /appveyor/i,
        /david-dm/i,
        /snyk/i,
        /waffle/i,
        /gitter/i,
        /license/i,
        /npm/i,
        /docs\/badge/i,
    ];

    let match;

    // Extract from markdown syntax
    while ((match = markdownImageRegex.exec(readmeContent)) !== null) {
        let url = match[1].trim();

        // Skip if it matches exclude patterns
        if (excludePatterns.some(pattern => pattern.test(url))) continue;

        // Only include if has valid image extension
        if (!validExtensions.test(url)) continue;

        // Convert relative URLs to raw GitHub URLs
        if (!url.startsWith('http')) {
            url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/${url.replace(/^\.?\//, '')}`;
        }

        images.push(url);
    }

    // Extract from HTML img tags
    while ((match = htmlImageRegex.exec(readmeContent)) !== null) {
        let url = match[1].trim();

        // Skip if it matches exclude patterns
        if (excludePatterns.some(pattern => pattern.test(url))) continue;

        // Only include if has valid image extension
        if (!validExtensions.test(url)) continue;

        // Convert relative URLs to raw GitHub URLs
        if (!url.startsWith('http')) {
            url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/${url.replace(/^\.?\//, '')}`;
        }

        images.push(url);
    }

    // Remove duplicates
    return [...new Set(images)];
}

export async function fetchCertificates() {
    try {
        const readme = await fetchRepoReadme('sertifikat');
        if (!readme) return [];

        // Parse certificates from README
        const certificates = [];
        const lines = readme.split('\n');

        let currentCategory = '';

        for (const line of lines) {
            // Header lines (### or ####) with Specialization
            if (line.startsWith('### ') || line.startsWith('#### ')) {
                // Extract the category/specialization name
                // Format: ### Machine learning - Specialization [sertifikat link](url)
                // or: ### Cousera DeepLearning.AI TensorFlow Developer - Specialization [sertifikat link](url)

                const headerLevel = line.startsWith('#### ') ? 4 : 3;
                const content = line.substring(headerLevel + 1).trim();

                // Check if this is a specialization header
                const specMatch = content.match(/^(.+?)\s*-?\s*Specialization\s*\[/i);
                const standaloneMatch = content.match(/^(.+?)\s*\[sertifikat link\]/i);

                // Get the URL
                const urlMatch = content.match(/\[sertifikat link\]\(([^)]+)\)/i);

                if (specMatch && urlMatch) {
                    const name = specMatch[1].replace(/Cousera\s+|Coursera\s+/gi, '').trim();
                    currentCategory = name;
                    certificates.push({
                        name: name,
                        issuer: 'Coursera',
                        type: 'Specialization',
                        url: urlMatch[1],
                        category: name,
                    });
                } else if (standaloneMatch && urlMatch) {
                    // Standalone course not in a specialization
                    const name = standaloneMatch[1].replace(/Cousera\s+|Coursera\s+/gi, '').trim();
                    certificates.push({
                        name: name,
                        issuer: 'Coursera',
                        type: 'Course',
                        url: urlMatch[1],
                        category: currentCategory || 'Other',
                    });
                }
            } else if (line.startsWith('- ')) {
                // Individual course in a list
                // Format: - Supervised Machine Learning: Regression and Classification [sertifikat link](url)
                const content = line.substring(2).trim();

                // Extract course name (everything before [sertifikat link])
                const nameMatch = content.match(/^(.+?)\s*\[sertifikat link\]/i);
                const urlMatch = content.match(/\[sertifikat link\]\(([^)]+)\)/i);

                if (nameMatch && urlMatch) {
                    const courseName = nameMatch[1].trim();
                    certificates.push({
                        name: courseName,
                        issuer: 'Coursera',
                        type: 'Course',
                        url: urlMatch[1],
                        category: currentCategory,
                    });
                }
            }
        }

        return certificates;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

// Topic to filter featured projects - add this topic to repos you want to showcase
const PORTFOLIO_TOPIC = 'data-engineer';

// Fallback repos if no 'portfolio' topic found
const FALLBACK_REPOS = [
    'Real-Time-Data-Platform-Lakehouse',
    'NYC-Taxi-FinOps',
    'Global-E-Commerce-Revenue-Analyzer',
    'jobscraper',
    'Face_detection',
    'sign-language_mini',
];

export async function fetchFeaturedProjects() {
    try {
        const repos = await fetchGitHubRepos('updated', 100);

        // First, try to get repos with 'portfolio' topic
        let featured = repos.filter(repo =>
            repo.topics && repo.topics.includes(PORTFOLIO_TOPIC)
        );

        // If no repos have 'portfolio' topic, fallback to predefined list or starred repos
        if (featured.length === 0) {
            featured = repos.filter(repo =>
                FALLBACK_REPOS.includes(repo.name) || repo.stargazers_count > 0
            );
        }

        // Sort by stars first, then by update date
        featured.sort((a, b) => {
            // Pinned repos (with 'portfolio' topic) first
            const aHasTopic = a.topics?.includes(PORTFOLIO_TOPIC) ? 1 : 0;
            const bHasTopic = b.topics?.includes(PORTFOLIO_TOPIC) ? 1 : 0;
            if (bHasTopic !== aHasTopic) return bHasTopic - aHasTopic;

            // Then by stars
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }

            // Then by update date
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        // Limit to 6 projects
        featured = featured.slice(0, 6);

        // Fetch README images for each project
        const projectsWithImages = await Promise.all(
            featured.map(async (repo) => {
                const readme = await fetchRepoReadme(repo.name);
                const images = extractImagesFromReadme(readme, repo.name);

                return {
                    id: repo.id,
                    name: repo.name,
                    title: formatRepoName(repo.name),
                    description: repo.description || getDefaultDescription(repo.name),
                    language: repo.language,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    url: repo.html_url,
                    homepage: repo.homepage,
                    updatedAt: repo.updated_at,
                    size: repo.size,
                    topics: repo.topics || [],
                    isFeatured: repo.topics?.includes(PORTFOLIO_TOPIC) || false,
                    images: images, // Array of image URLs from README
                    thumbnail: images.length > 0 ? images[0] : null, // First image as thumbnail
                };
            })
        );

        return projectsWithImages;
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return [];
    }
}

function formatRepoName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getDefaultDescription(repoName) {
    const descriptions = {
        'Real-Time-Data-Platform-Lakehouse': 'Modern Lakehouse architecture with Bronze/Silver/Gold layers for real-time data processing.',
        'NYC-Taxi-FinOps': 'Cost optimization dashboard for NYC Taxi data with FinOps analytics.',
        'Global-E-Commerce-Revenue-Analyzer': 'Revenue analytics platform with dbt transformations for global e-commerce.',
        'jobscraper': 'Automated job listing scraper with data pipeline for job market analysis.',
        'Face_detection': 'Real-time face detection system using OpenCV and Computer Vision.',
        'sign-language_mini': 'Sign language recognition using Deep Learning and TensorFlow.',
        'Brain-tumor': 'Brain tumor classification using CNN and medical imaging.',
    };
    return descriptions[repoName] || 'A GitHub project by Sahrudin';
}

export function getLanguageColor(language) {
    const colors = {
        Python: '#3776AB',
        JavaScript: '#F7DF1E',
        TypeScript: '#3178C6',
        'Jupyter Notebook': '#DA5B0B',
        HTML: '#E34F26',
        CSS: '#1572B6',
        Shell: '#89E051',
        Dockerfile: '#2496ED',
    };
    return colors[language] || '#6B7280';
}

export function getCategoryIcon(repoName) {
    const icons = {
        'Real-Time-Data-Platform-Lakehouse': 'layers',
        'NYC-Taxi-FinOps': 'savings',
        'Global-E-Commerce-Revenue-Analyzer': 'shopping_cart',
        'jobscraper': 'work',
        'Face_detection': 'face',
        'sign-language_mini': 'sign_language',
        'Brain-tumor': 'medical_services',
        'sertifikat': 'workspace_premium',
    };
    return icons[repoName] || 'code';
}

export function getCategoryLabel(repoName) {
    const categories = {
        'Real-Time-Data-Platform-Lakehouse': 'Data Platform / Lakehouse',
        'NYC-Taxi-FinOps': 'FinOps / Analytics',
        'Global-E-Commerce-Revenue-Analyzer': 'Analytics / dbt',
        'jobscraper': 'Data Collection / ETL',
        'Face_detection': 'Computer Vision / ML',
        'sign-language_mini': 'Deep Learning / AI',
        'Brain-tumor': 'Medical AI / CNN',
    };
    return categories[repoName] || 'Project';
}
