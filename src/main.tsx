import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css';
import './styles/experience.css';
import './styles/journey.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
