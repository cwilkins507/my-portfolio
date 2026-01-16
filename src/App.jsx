import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Linkedin, Github, Mail, BadgeDollarSign } from 'lucide-react';
import Articles from './components/Articles';
import About from './components/About';
import Downloads from './components/Downloads';
import AgentsDoc from './components/AgentsDoc';
import Services from './components/Services';

// Minimal portfolio data for Layout component (name and email)
const portfolioData = {
  name: "Collin Wilkins",
  email: "wilkins507@gmail.com",
  linkedin: "https://www.linkedin.com/in/collin-wilkins-1020215a/",
  upwork: "https://www.upwork.com/freelancers/~014ffbc17b83da9407",
  github: "https://github.com/cwilkins507"
};

// --- LAYOUT COMPONENT (Static elements: Nav, Contact CTA, Footer) ---
const Layout = ({ children }) => {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans leading-normal tracking-wider">
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <Link to="/" className="text-white text-2xl font-bold hover:text-teal-400 transition">{portfolioData.name}</Link>
          <div className="flex space-x-6 pt-2 md:pt-0">
            <Link to="/" className="hover:text-teal-400 transition font-medium">Read</Link>
            <Link to="/resources" className="hover:text-teal-400 transition font-medium">Resources</Link>
            <Link to="/services" className="hover:text-teal-400 transition font-medium">Services</Link>
            <Link to="/about" className="hover:text-teal-400 transition font-medium">About</Link>
          </div>
        </div>
      </nav>

      {/* Dynamic Content (Routes render here) */}
      {children}

      {/* Contact (CTA - always visible) */}
      <section id="contact" className="bg-gray-800 py-20 border-t border-gray-700">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
            I'm currently taking on <strong>automation consulting</strong> and <strong>AI integration</strong> projects. Feel free to reach out if you have a technical challenge that needs a business-minded engineer!
          </p>
          <a href={`mailto:${portfolioData.email}`}
            className="flex items-center justify-center w-fit mx-auto bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl shadow-teal-500/30 text-lg">
            <Mail className="w-5 h-5 mr-3" /> Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-3 text-lg">
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={portfolioData.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="Upwork Profile">
              <BadgeDollarSign className="w-6 h-6" />
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home page is now the article listing */}
          <Route path="/" element={<Articles />} />

          {/* Individual article routes */}
          <Route path="/articles/:slug" element={<Articles />} />

          {/* About page with bio, experience, projects */}
          <Route path="/about" element={<About />} />

          {/* Resources page */}
          <Route path="/resources" element={<Downloads />} />

          {/* Services page */}
          <Route path="/services" element={<Services />} />

          {/* AGENTS.md documentation page */}
          <Route path="/agents" element={<AgentsDoc />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
