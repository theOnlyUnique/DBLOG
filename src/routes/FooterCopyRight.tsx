// components/FooterCopyright.js
// import React from 'react';
import { useEffect, useState } from 'react';
import './FooterCopyright.css';

const FooterCopyright = () => {
  const [timeDiff, setTimeDiff] = useState(0);

  // 目标日期：2024年8月21日00:00:00
  const targetDate = new Date('2024-08-21T00:00:00.000Z');

  // 计算时间差并更新状态
  const calculateDifference = () => {
    const now = new Date().getTime();
    const diff = now - targetDate.getTime();
    
    // 确保时间差非负（应用场景保证在目标日期之后）
    setTimeDiff(Math.max(diff, 0));
  };

  // 初始化和实时更新
  useEffect(() => {
    calculateDifference();
    const interval = setInterval(calculateDifference, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 格式化时间差
  const formatTime = (diff) => {
    if (diff === 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, ms: 0 };

    // 创建日期对象用于精确计算
    const endDate = new Date(targetDate.getTime() + diff);
    const startDate = new Date(targetDate);

    // 计算完整年数
    let years = endDate.getFullYear() - startDate.getFullYear();
    endDate.setFullYear(startDate.getFullYear());

    // 计算剩余月份
    let months = endDate.getMonth() - startDate.getMonth();
    endDate.setDate(startDate.getDate());

    // 计算剩余天数
    let days = endDate.getDate() - startDate.getDate();

    // 处理负天数情况
    if (days < 0) {
      const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();
      days += lastDayOfMonth;
      months -= 1;
    }

    // 处理负月份情况
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // 分解剩余时间
    const ms = diff % 1000;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (60 * 1000)) % 60;
    const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;

    return { years, months, days, hours, minutes, seconds, ms };
  };

  // 解构格式化后的时间数据
  const { years, months, days, hours, minutes, seconds, ms } = formatTime(timeDiff);

  // 动态构建显示字符串
  const timeComponents = [
    years > 0 ? `${years}年` : '',
    months > 0 ? `${months}个月` : '',
    days > 0 ? `${days}天` : '',
    hours > 0 ? `${hours}小时` : '',
    minutes > 0 ? `${minutes}分钟` : '',
    seconds > 0 ? `${seconds}秒` : '',
    ms > 0 ? `${ms}毫秒` : ''
  ].filter(Boolean).join(' ');
  return (
    <div className="copyright">
      <p>© 2024 www.qidong.tech &nbsp;
        20240821
        <span>本站已运行：{timeComponents}</span>
      </p>
      
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