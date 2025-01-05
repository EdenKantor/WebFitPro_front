
import { render } from 'preact'
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import App from './app';  // Import your main App component
import './index.css'

render(
    <Router> 
      <App />
    </Router>,
    document.getElementById('app')
  );