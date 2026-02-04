import { useEffect, useState } from 'react';
import { Linkedin, Github, BadgeDollarSign } from 'lucide-react';

/**
 * Navigation - Sticky navigation with scroll-triggered blur backdrop
 */
export default function Navigation({ portfolioData }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`p-4 sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800 shadow-lg'
          : 'bg-black border-b border-zinc-800'
      }`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <a
          href="/"
          className="text-white text-2xl font-bold hover:text-teal-400 transition font-display"
        >
          {portfolioData.name}
        </a>
        <div className="flex space-x-6 pt-2 md:pt-0">
          <a href="/" className="hover:text-teal-400 transition font-medium">
            Read
          </a>
          <a href="/resources" className="hover:text-teal-400 transition font-medium">
            Resources
          </a>
          <a href="/services" className="hover:text-teal-400 transition font-medium">
            Services
          </a>
          <a href="/about" className="hover:text-teal-400 transition font-medium">
            About
          </a>
          <a href="?modal=contact" className="hover:text-teal-400 transition font-medium">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
