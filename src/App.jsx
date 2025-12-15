import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/reactbits';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Competencies from './components/Competencies';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display transition-colors duration-300 overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Competencies />
          <Projects />
          <GitHubActivity />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
