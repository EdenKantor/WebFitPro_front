import { Route, Switch } from 'wouter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getRoutes } from '../utils/RouteUtils';

/**
 * AppRoutes Component
 * Manages all routing in the application and handles page transition animations
 * 
 */
function AppRoutes() {
  const routes = getRoutes();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames="fade"
      >
        <Switch>
          {routes.map(({ path, component }) => (
            <Route 
              key={path}
              path={path} 
              component={component} 
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AppRoutes;
