import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle2,
  Code,
  Zap,
  Layout,
  Database,
  ShieldCheck,
  Search,
  ArrowRight,
  Clipboard,
  Smartphone
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  const navItems = [
    { id: 'quiz', label: 'Quiz Engine', icon: <Zap size={18} /> },
    { id: 'prompts', label: 'Prompt Library', icon: <Search size={18} /> },
    { id: 'design', label: 'Design System', icon: <Layout size={18} /> },
    { id: 'tech', label: 'Stack & Security', icon: <Database size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Header aligned with collinwilkins.com style */}
      <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">CW</span>
            </div>
            <h1 className="text-lg font-serif font-bold text-white tracking-tight">AI Action Plan Specs</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm transition-colors flex items-center gap-2 ${activeTab === item.id ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-12 gap-12">

          {/* Content Area */}
          <div className="md:col-span-8 space-y-12">

            {activeTab === 'quiz' && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8">
                  <span className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Section 01</span>
                  <h2 className="text-4xl font-serif text-white mt-2">The Quiz Engine</h2>
                  <p className="text-zinc-400 mt-4 leading-relaxed">A high-conversion multi-step funnel designed to segment users and provide tailored value.</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/50">
                    <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      Advanced User Flow (Missing logic added)
                    </h3>
                    <ul className="space-y-4 text-sm">
                      <li className="flex gap-3">
                        <span className="text-zinc-600 font-mono">01.</span>
                        <span><strong>Exit Intent:</strong> Detect mouse-leave on desktop to trigger a "Wait! Get your plan first" modal with a 10% discount on consulting.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-zinc-600 font-mono">02.</span>
                        <span><strong>Persistence:</strong> Use `localStorage` to save user answers at every step, allowing them to resume if they refresh.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-zinc-600 font-mono">03.</span>
                        <span><strong>Lead Scoring:</strong> Categorize leads into "Cold" (Solopreneur/Employee) vs "Hot" (10+ Employees/Revenue Focus) for CRM tagging.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-zinc-800 bg-black">
                      <span className="text-xs text-zinc-500 font-mono uppercase">Step 6 Modal</span>
                      <div className="mt-4 p-4 bg-white rounded-md space-y-2">
                        <div className="h-2 w-12 bg-zinc-200 rounded"></div>
                        <div className="h-6 w-full bg-zinc-100 border border-zinc-300 rounded"></div>
                        <div className="h-6 w-full bg-zinc-100 border border-zinc-300 rounded"></div>
                        <div className="h-8 w-full bg-black rounded flex items-center justify-center text-[10px] text-white font-bold">GET ACTION PLAN</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-zinc-800 bg-black flex flex-col justify-center">
                      <p className="text-xs text-zinc-400 italic">"The lead capture modal must have a pure white background to create visual separation from the dark obsidian brand."</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'prompts' && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8">
                  <span className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Section 02</span>
                  <h2 className="text-4xl font-serif text-white mt-2">Prompt Library</h2>
                  <p className="text-zinc-400 mt-4 leading-relaxed">Searchable database of business-ready AI templates with copy-to-clipboard functionality.</p>
                </div>

                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/50 space-y-8">
                  <div>
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Clipboard size={18} />
                      Prompt Components
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <div className="text-white font-medium text-sm">Fill-in-the-Blanks</div>
                        <p className="text-xs text-zinc-500 mt-1">Prompts containing [Variables] should render as interactive text inputs.</p>
                      </div>
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <div className="text-white font-medium text-sm">Prompt Chaining</div>
                        <p className="text-xs text-zinc-500 mt-1">Link "Part A" and "Part B" prompts so users can follow a logical workflow.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-6">
                    <h4 className="text-white text-sm font-bold mb-4">Technical Stack for Library:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Algolia Search', 'Prisma ORM', 'Clerk Auth', 'Markdown Parser'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-[10px] rounded-full uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'design' && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8">
                  <span className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Section 03</span>
                  <h2 className="text-4xl font-serif text-white mt-2">Obsidian Design System</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Typography Hierarchy</h4>
                    <div className="space-y-4 p-6 bg-zinc-950 rounded-xl border border-zinc-800">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Display (72px Serif)</div>
                        <div className="text-3xl font-serif text-white">The AI Action Plan</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Subhead (24px Sans)</div>
                        <div className="text-xl text-zinc-300">Strategy meets automation.</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Body (16px/1.7lh)</div>
                        <div className="text-sm text-zinc-400 leading-relaxed">A detailed description of the process goes here, focused on legibility and whitespace.</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Brand Colors</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-16 w-full bg-black border border-zinc-800 rounded-md"></div>
                        <div className="text-[10px] text-zinc-500 font-mono">Primary: #000000</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 w-full bg-white rounded-md"></div>
                        <div className="text-[10px] text-zinc-500 font-mono">Text: #FFFFFF</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 w-full bg-[#3B82F6] rounded-md"></div>
                        <div className="text-[10px] text-zinc-500 font-mono">Accent: #3B82F6</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 w-full bg-zinc-900 border border-zinc-800 rounded-md"></div>
                        <div className="text-[10px] text-zinc-500 font-mono">Surface: #18181B</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'tech' && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8">
                  <span className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Section 04</span>
                  <h2 className="text-4xl font-serif text-white mt-2">Architecture & Security</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="flex items-center gap-3 text-white mb-4">
                      <ShieldCheck className="text-blue-500" />
                      <span className="font-bold">Security & Compliance</span>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li>• GDPR Consent modals on lead capture.</li>
                      <li>• Encryption at rest for user quiz data.</li>
                      <li>• Rate limiting via Upstash Redis.</li>
                      <li>• CSP Headers for script protection.</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="flex items-center gap-3 text-white mb-4">
                      <Zap className="text-yellow-500" />
                      <span className="font-bold">Performance Targets</span>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li>• LCP: Under 2.5s via ISR.</li>
                      <li>• CLS: Under 0.1 via font optimization.</li>
                      <li>• Time to Interactive: Under 3.5s.</li>
                      <li>• Edge-cached API routes on Vercel.</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Core Integration</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Framework</span>
                    <span className="text-white">Next.js 14</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Database</span>
                    <span className="text-white">PostgreSQL</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Auth</span>
                    <span className="text-white">Clerk / NextAuth</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Styling</span>
                    <span className="text-white">Tailwind CSS</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  "Ensure the mobile experience maintains full-screen question modals with a minimum 48px touch target for all quiz options."
                </p>
              </div>

              <button className="w-full py-4 bg-white text-black font-bold text-sm rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                Launch Deployment <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;