import React from 'react';

const NewsComponent = ({ title, link, snippet }) => {
  const containerStyle = {
    margin: '10px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const titleStyle = {
    margin: '0 0 10px 0',
    color: 'white',
    fontSize: '18px',
  };

  const descriptionStyle = {
    margin: 0,
    fontSize: '14px',
    color: '#666',
  };

  const hoverStyle = {
    backgroundColor: '#f9f9f9',
  };

  return (
    <div
      className="news-component"
      style={containerStyle}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#56e39f')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
    >
      <a href={link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={{ ...descriptionStyle, color: '#C9C9C9' }}>{snippet}</p>
        </a>
    </div>
  );
};

export default NewsComponent;
