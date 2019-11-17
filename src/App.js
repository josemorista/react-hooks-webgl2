import React, { useEffect } from 'react';
import './App.css';

const webgl = require('./components/WebGl')

function App() {

  useEffect(() => {
    webgl('webGlCanvas')
  }, [])

  return (
    <div className="App">
      <canvas id="webGlCanvas" width={`${400}px`} height={`${400}px`} />
    </div>
  );
}

export default App;
