import React from 'react';
import './ComicPanel.css';

function ComicPanel({ imageData }) {
    return (
      <div>
        {imageData && <img src={imageData} alt="Comic Panel" />}
      </div>
    );
  }

export default ComicPanel;
