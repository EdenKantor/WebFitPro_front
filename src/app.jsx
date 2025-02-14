import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect } from 'preact/hooks'; 
import { initializeTheme } from './utils/ThemeLogic'; 
import { Route, Switch } from 'wouter'; 
import TopBar from './components/TopBar';
import routes from './utils/Routes';

function App() {

  useEffect(() => {
    initializeTheme(); 
  }, []); 
  

  return (
    <div>
      <TopBar />
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="fade">
          <Switch>
              {routes.map(({ path, component }) => (
                <Route key={path} path={path} component={component} />
              ))}
            </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
