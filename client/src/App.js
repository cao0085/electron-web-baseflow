import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState({
    title: '載入中...',
    description: '載入中...'
  });

  const loadContent = async () => {
    try {
      const response = await fetch('/data/content.json?t=' + Date.now());
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('載入內容失敗:', error);
      setContent({
        title: '預設標題',
        description: '預設描述'
      });
    }
  };

  useEffect(() => {
    loadContent();
    
    // 每5秒檢查一次更新
    const interval = setInterval(loadContent, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.7 }}>
          這是即時預覽，內容會自動同步更新
        </div>
      </header>
    </div>
  );
}

export default App;