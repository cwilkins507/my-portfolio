import React, { useState, useEffect } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleList = ({ articles }) => (
  <div className="container mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold text-white mb-2">From the Desk</h1>
    <p className="text-xl text-gray-400 mb-8">Cloud, Code, and Enterprise Insights</p>
    
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link 
          to={`/articles/${article.slug}`} 
          key={article.slug}
          className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition duration-300"
        >
          <h2 className="text-2xl font-bold text-teal-400 mb-2">{article.title}</h2>
          <div className="text-gray-400 mb-2">
            {new Date(article.date).toLocaleDateString()}
          </div>
          <div className="flex gap-2 mb-4">
            {article.tags?.map(tag => (
              <span key={tag} className="bg-gray-700 text-teal-300 text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-300">{article.excerpt}</p>
        </Link>
      ))}
    </div>
  </div>
);

const ArticleContent = ({ articles }) => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/writing" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">
          ← Back to Writing
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
      </div>
    </div>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const importArticles = async () => {
      const markdownFiles = import.meta.glob('../articles/*.md', { eager: true });
      
      const articleData = Object.entries(markdownFiles).map(([filepath, content]) => {
        const slug = filepath.replace('../articles/', '').replace('.md', '');
        const { data: frontmatter, content: markdownContent } = matter(content.default);
        
        return {
          slug,
          ...frontmatter,
          content: markdownContent,
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          tags: frontmatter.tags || []
        };
      });

      setArticles(articleData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    importArticles();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ArticleList articles={articles} />} />
      <Route path=":slug" element={<ArticleContent articles={articles} />} />
    </Routes>
  );
};

export default Articles;