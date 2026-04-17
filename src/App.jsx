import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/reactbits';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

// Lazy loaded components (below the fold)
const TechStack = lazy(() => import('./components/TechStack'));
const Experience = lazy(() => import('./components/Experience'));
const Competencies = lazy(() => import('./components/Competencies'));
const Projects = lazy(() => import('./components/Projects'));
const GitHubActivity = lazy(() => import('./components/GitHubActivity'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading skeleton for lazy components
const SectionLoader = () => (
  <div className="w-full flex items-center justify-center py-20">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display transition-colors duration-300 overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Suspense fallback={<SectionLoader />}>
            <TechStack />
            <Experience />
            <Competencies />
            <Projects />
            <GitHubActivity />
            <Certifications />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
