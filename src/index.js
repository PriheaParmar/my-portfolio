import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/proza-libre/400.css';
import '@fontsource/proza-libre/500.css';
import './styles/global.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
