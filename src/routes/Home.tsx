// components/ArticleList.js
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import { useDispatch } from 'react-redux';
import { setArticleId } from '../store/globalSlice';

const ArticleCard = ({ id,title, content }) => {
  const [uuid] = useState(() => `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  // 标记是否已经展开
  const [show,setShow]  = useState(false)
  const router = useNavigate()
  const dispatch = useDispatch()
  function getArticleDetail() {
    dispatch(setArticleId(id))
    router('/' + 'article')
  }
  function handleLunch() {
    const element = document.getElementById(uuid);
    // console.log("获取ID",element,uuid);
    if (element) {
      element.style.maxHeight = show ? '30vh':'none';
      setShow(!show)
    }
  }
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' ,backgroundColor:'white',overflow:'hidden'}}>
      <h2>{title}</h2>
      <div style={{ maxHeight: '30vh'}} id={uuid}>
        <ReactMarkdown rehypePlugins={[rehypePrism]} >{content}</ReactMarkdown>
      </div>
      <div style={{display:'flex',justifyContent: 'center'}}>
        <Button onClick={getArticleDetail}>点击阅读</Button>
        <Button style={{ marginLeft: '10px'}} onClick={handleLunch}>
          {show ? '收起阅读': '展开阅读'}
        </Button>
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