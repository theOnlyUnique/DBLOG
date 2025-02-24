// components/ArticleList.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArticleCard = ({ title, content }) => (
  <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
    <h2>{title}</h2>
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

const ArticleList = ({ articles }) => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
    {articles.map(article => (
      <ArticleCard key={article.id} {...article} />
    ))}
  </div>
);

export default ArticleList;