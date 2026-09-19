import React from 'react';
import ReactDOM from 'react-dom/client'
import TheMealApp  from './TheMealApp';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TheMealApp />
  </React.StrictMode>
);