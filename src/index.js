import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { VideoProvider } from './context/VideoContext';

ReactDOM.render(
  <React.StrictMode>
    <VideoProvider>
      <App />
    </VideoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
