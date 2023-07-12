import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import './index.scss';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <App />
);
