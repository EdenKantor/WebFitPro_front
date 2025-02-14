import { useEffect } from 'preact/hooks';
import { initializeTheme } from './utils/ThemeLogic';
import TopBar from './components/TopBar';
import AppRoutes from './components/AppRoutes';

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div>
      <TopBar />
      <AppRoutes />
    </div>
  );
}

export default App;
