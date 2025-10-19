import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Writing = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const { slug } = useParams();
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const importArticles = async () => {
      try {
        const modules = import.meta.glob('../articles/*.md', { 
          as: 'raw',
          eager: true 
        });
        
        const loadedArticles = Object.entries(modules).map(([path, content]) => {
          // Simple frontmatter parser
          const [, frontmatter = '', ...contentParts] = content.split('---');
          const parsedFrontmatter = {};
          
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              let value = valueParts.join(':').trim();
              // Handle quoted strings
              if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
              }
              // Handle arrays
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => 
                  v.trim().replace(/["']/g, '')
                );
              }
              parsedFrontmatter[key.trim()] = value;
            }
          });

          const slug = path.split('/').pop().replace('.md', '');
          return {
            ...parsedFrontmatter,
            slug,
            link: `/articles/${slug}`
          };
        });

        setArticles(loadedArticles.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    importArticles();
  }, []);

  const filteredWritings = articles.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? article.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(articles.flatMap(article => article.tags || []))];

  // Find the current article if we're on an article page
  const currentArticle = slug ? articles.find(a => a.slug === slug) : null;

  useEffect(() => {
    if (currentArticle) {
      // Load the article content
      const loadArticleContent = async () => {
        try {
          const modules = import.meta.glob('../articles/*.md', { 
            as: 'raw',
            eager: true 
          });
          
          const articlePath = `../articles/${currentArticle.slug}.md`;
          const content = modules[articlePath];
          const [, , ...contentParts] = content.split('---');
          setArticleContent(contentParts.join('---').trim());
        } catch (error) {
          console.error('Failed to load article content:', error);
        }
      };
      
      loadArticleContent();
    }
  }, [currentArticle]);

  // If we're viewing a single article
  if (slug) {
    if (!currentArticle) {
      return (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Link to="/writing" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">
              ← Back to Writing
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/writing" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">
            ← Back to Writing
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{currentArticle.title}</h1>
          <div className="text-gray-400 mb-4">
            {new Date(currentArticle.date).toLocaleDateString()}
          </div>
          <div className="flex gap-2 mb-6">
            {currentArticle.tags?.map(tag => (
              <span key={tag} className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="prose prose-invert max-w-none prose-p:mb-4 prose-headings:mt-8 prose-headings:mb-4 prose-li:mb-2">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-teal-400">{children}</strong>,
              }}
            >
              {articleContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // Article list view
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">From the Desk</h1>
      <p className="text-xl text-gray-400 mb-8">Thoughts on cloud architecture and distributed systems</p>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md w-full sm:w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Topics</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {filteredWritings.map(article => (
          <div key={article.slug} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">{article.title}</h2>
            <div className="text-gray-400 mb-2">{new Date(article.date).toLocaleDateString()}</div>
            <div className="flex gap-2 mb-4">
              {article.tags && article.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-4">{article.excerpt}</p>
            <Link to={article.link} className="text-teal-400 hover:text-teal-300">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writing;