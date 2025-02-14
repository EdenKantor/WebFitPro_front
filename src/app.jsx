import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect } from 'preact/hooks'; 
import { initializeTheme } from './utils/ThemeLogic'; 
import TopBar from './components/TopBar';
import RouterConfig from './utils/Routes';

function App() {
  useEffect(() => {
    initializeTheme(); 
  }, []); 

  return (
    <div>
      <TopBar />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="fade">
          <RouterConfig />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
