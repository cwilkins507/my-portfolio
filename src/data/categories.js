export const CATEGORIES = {
  'AI & Agents': ['AI', 'LLM Tools', 'CLI Agents', 'MCP', 'Workflow Automation', 'Prompt Engineering', 'AI Coding Assistant', 'AI Tools', 'Agentic Development', 'Context Engineering'],
  'Cloud & DevOps': ['AWS', 'Terraform', 'Infrastructure as Code', 'DevOps', 'Serverless', 'Azure', 'GCP'],
  'Architecture': ['Software Architecture', 'System Design', 'Microservices', 'Distributed Systems'],
  'Engineering': ['Software Engineering', 'Best Practices', 'Low-code', 'Database Optimization'],
};

export const getCategoryForArticle = (tags) => {
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
