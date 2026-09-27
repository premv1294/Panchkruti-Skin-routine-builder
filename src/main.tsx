import {createRoot} from 'react-dom/client';
import {Router} from 'wouter';
import App from './App';
import {ErrorBoundary} from './components/error-boundary';
import './index.css';
import './guide.css';
createRoot(document.getElementById('root')!).render(<Router base={import.meta.env.BASE_URL.replace(/\/$/,'')}><ErrorBoundary><App/></ErrorBoundary></Router>);
