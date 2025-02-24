// components/FooterCopyright.js
// import React from 'react';
import './FooterCopyright.css';

const FooterCopyright = () => {
  return (
    <div className="copyright">
      <p>© 2024 LQD</p>
      <p>
        <strong>ICP备案信息：</strong>
        <span>湘ICP备2024098725号</span>
        <a href="http://www.miit.gov.cn" target="_blank" rel="noopener noreferrer">
          （公安机关备案号：湘ICP备2024098725号）
        </a>
      </p>
      <p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
          备案查询：www.miit.gov.cn
        </a>
      </p>
    </div>
  );
};

export default FooterCopyright;