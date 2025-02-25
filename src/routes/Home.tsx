// components/ArticleList.js
import React, { useRef } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import { useDispatch } from 'react-redux';
import { setArticleId } from '../store/globalSlice';

const ArticleCard = ({ id,title, content }) => {
  const router = useNavigate()
  const dispatch = useDispatch()
  function getArticleDetail() {
    dispatch(setArticleId(id))
    router('/' + 'article')
  }
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
      <h2>{title}</h2>
      <ReactMarkdown rehypePlugins={[rehypePrism]} >{content}</ReactMarkdown>
      <div style={{display:'flex',justifyContent: 'center'}}>
        <Button onClick={getArticleDetail}>点击阅读</Button>
      </div>
    </div>
  );
}

const ArticleList = ({ articles }) => {
  // 判断是否需要显示“返回顶部”按钮
  // const showScrollButton = scrollRef.current ? scrollRef.current.scrollTop > 0 : false;
  return (
    <div >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }} >
        {articles.map(article => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;