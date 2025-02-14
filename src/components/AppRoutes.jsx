import { Route, Switch } from 'wouter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getRoutes } from '../utils/routeUtils';

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