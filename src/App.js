import React, { useEffect } from 'react';
import './App.css';

const webgl = require('./components/WebGl')

function App() {

  useEffect(() => {
    webgl('webGlCanvas')
  }, [])

  return (
    <div className="App">
      <canvas id="webGlCanvas" width={`${window.innerWidth}px`} height={`${window.innerHeight}px`} />
    </div>
  );
}

export default App;
