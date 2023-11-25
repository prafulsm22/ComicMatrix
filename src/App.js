import React, { useState } from 'react';
import {query} from './api/ImageAPI';
import ComicPanel from './components/ComicPanel';
import './App.css';
import logo from './logo.jpg'; 

function App() {
  const [inputText, setInputText] = useState('');
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setImageData([]); // Clear previous images

    try {
      const imagePromises = [];
      for (let i = 0; i < 10; i++) {
        // Since we want 10 relevant images based on a single input,
        // we will call the API 10 times with the same input text.
        imagePromises.push(query({ inputs: inputText }));
      }

      const images = await Promise.all(imagePromises);
      const imageUrls = images.map((blob) => URL.createObjectURL(blob));
      setImageData(imageUrls);
    } catch (error) {
      console.error('Error generating comic strips:', error);
      // Handle the error properly here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
    <div className='navbar'>
      <img src= {logo} alt="Logo" className="navbar-logo" />
      <h1 className="navbar-header">You have entered the <br/> Comic Matrix</h1>
    </div>
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a theme for the comic strip"
        />
        <button className  ="blue" type="submit" disabled={isLoading}>
          {isLoading ? 'Good-to-go...' : 'Blue pill'}
        </button>
        <button className ='red' type="submit" disabled={isLoading}>
          {isLoading ? 'Matrix crashed...' : 'Red pill'}
        </button>
      </form>
      {imageData.length > 0 && (
        <div className="comic-strip">
          {imageData.map((src, index) => (
            <ComicPanel key={index} imageData={src} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
