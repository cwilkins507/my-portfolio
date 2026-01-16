import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight } from 'lucide-react';

// Simple frontmatter parser that works in the browser
const parseFrontmatter = (markdown) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const frontmatterText = match[1];
  const content = match[2];

  const data = {};
  const lines = frontmatterText.split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^["'](.*)["']$/, '$1');

      // Parse arrays [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/^["'](.*)["']$/, '$1'));
      }

      data[key] = value;
    }
  });

  return { data, content };
};

// Category mapping
const CATEGORIES = {
  'AI & Agents': ['AI', 'LLM Tools', 'CLI Agents', 'MCP', 'Workflow Automation', 'Prompt Engineering'],
  'Cloud & DevOps': ['AWS', 'Terraform', 'Infrastructure as Code', 'DevOps', 'Serverless', 'Azure', 'GCP'],
  'Architecture': ['Software Architecture', 'System Design', 'Microservices', 'Distributed Systems'],
  'Engineering': ['Software Engineering', 'Best Practices', 'Low-code', 'Database Optimization']
};

const getCategoryForArticle = (tags) => {
  if (!tags || tags.length === 0) return 'Engineering';

  for (const [category, categoryTags] of Object.entries(CATEGORIES)) {
    for (const tag of tags) {
      if (categoryTags.some(catTag => catTag.toLowerCase() === tag.toLowerCase())) {
        return category;
      }
    }
  }
  return 'Engineering';
};

const ArticleList = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Debug: log articles to see what we're getting
  console.log('ArticleList - articles:', articles);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.slice(1);

  const filteredArticles = selectedCategory === 'All'
    ? remainingArticles
    : remainingArticles.filter(article => getCategoryForArticle(article.tags) === selectedCategory);

  // Debug: log filtered articles
  console.log('ArticleList - filteredArticles:', filteredArticles);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Featured Article Hero */}
      {featuredArticle && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <span className="text-teal-400 text-sm font-bold uppercase tracking-wider">Latest Article</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 leading-tight tracking-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-400">{new Date(featuredArticle.date).toLocaleDateString()}</span>
                <span className="text-gray-600">•</span>
                <span className="bg-teal-600/20 text-teal-300 text-sm px-3 py-1 rounded-full">
                  {getCategoryForArticle(featuredArticle.tags)}
                </span>
              </div>
              <Link
                to={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl shadow-teal-500/40"
              >
                Read Article <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs & Article Grid */}
      <div className="container mx-auto px-4 py-20">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', ...Object.keys(CATEGORIES)].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-bold text-base transition duration-300 ${selectedCategory === category
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-teal-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              to={`/articles/${article.slug}`}
              key={article.slug}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition duration-300 border border-gray-700 hover:border-teal-400 group"
            >
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                {getCategoryForArticle(article.tags)}
              </span>
              <h2 className="text-2xl font-bold text-white mb-3 mt-3 group-hover:text-teal-400 transition leading-tight">
                {article.title}
              </h2>
              <div className="text-gray-500 text-sm mb-4">
                {new Date(article.date).toLocaleDateString()}
              </div>
              <p className="text-gray-300 mb-4">{article.excerpt}</p>
              <div className="flex gap-2 flex-wrap">
                {article.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-700 text-teal-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleContent = ({ articles }) => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Collin Wilkins`;
    }
  }, [article]);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">
          ← Back to Articles
        </Link>
        <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
        <div className="text-gray-400 mb-4">
          {new Date(article.date).toLocaleDateString()}
        </div>
        <div className="flex gap-2 mb-8">
          {article.tags?.map(tag => (
            <span key={tag} className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="prose prose-invert prose-teal max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => {
                // Convert the src to use the public images folder
                const src = props.src.includes('/images/')
                  ? props.src
                  : `/images/${props.src.split('/').pop()}`;
                return <img {...props} src={src} className="my-8" />;
              },
              table: ({ children }) => <div className="overflow-x-auto my-8"><table className="min-w-full text-left text-sm">{children}</table></div>,
              thead: ({ children }) => <thead className="bg-gray-800 text-gray-200">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-gray-700">{children}</tbody>,
              tr: ({ children }) => <tr className="hover:bg-gray-700/50 transition-colors">{children}</tr>,
              th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
              td: ({ children }) => <td className="px-4 py-3 text-gray-300">{children}</td>,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer CTA */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-500/20 transition-colors duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Wrestling with a technical challenge?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              I help companies automate complex workflows, integrate AI into their stacks, and build scalable cloud architectures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
              >
                View My Services
              </Link>
              <a
                href="https://www.linkedin.com/in/collin-wilkins-1020215a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 border border-gray-600"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const importArticles = async () => {
      const markdownFiles = import.meta.glob('../articles/*.md', { query: '?raw', import: 'default' });

      const articlePromises = Object.entries(markdownFiles).map(async ([filepath, importFn]) => {
        const slug = filepath.replace('../articles/', '').replace('.md', '');
        const markdown = await importFn();
        const { data: frontmatter, content: markdownContent } = parseFrontmatter(markdown);

        return {
          slug,
          title: frontmatter.title || slug,
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          content: markdownContent
        };
      });

      const articleData = await Promise.all(articlePromises);
      setArticles(articleData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    importArticles();
  }, []);

  useEffect(() => {
    if (!slug) {
      document.title = "Articles on AI & Automation | Collin Wilkins";
    }
  }, [slug]);

  // If there's a slug in the URL, show the article content
  if (slug) {
    return <ArticleContent articles={articles} />;
  }

  // Otherwise show the article list
  return <ArticleList articles={articles} />;
};

export default Articles;