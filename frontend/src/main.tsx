import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.onerror = function (msg, ...args) {
  const error = args[3] as Error | undefined;
  document.body.innerHTML = '<div style="color:red; background: white; padding: 20px; font-family: monospace;">' +
    '<h2>Runtime Error</h2>' +
    '<p>' + msg + '</p>' +
    '<pre>' + (error ? error.stack : '') + '</pre>' +
    '</div>';
  return false;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
