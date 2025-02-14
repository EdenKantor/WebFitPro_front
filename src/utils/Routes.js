import { Route, Switch } from 'wouter'; 
import FirstPage from '../layouts/FirstPage';
import LoginPage from '../layouts/LoginPage';
import Registration1Page from "../layouts/Registration1Page";
import Registration2Page from "../layouts/Registration2Page";
import UserHomePage from '../layouts/UserHomePage';
import Discover1Page from '../layouts/Discover1Page';
import Discover2Page from '../layouts/Discover2Page';
import InfoPage from '../layouts/InfoPage';
import ContinueRoutine from '../layouts/ContinueRoutine';
import PendingUsers from '../layouts/PendingUsers';
import ManageUsers from '../layouts/ManageUsers';
import NotSoFast from '../layouts/NotSoFast';

/**
 * Routes.js manages all application routes in one place.
 * This keeps `App.jsx` clean and makes it easier to add or modify routes.
 */
const routes = [
  { path: "/", component: FirstPage },
  { path: "/login", component: LoginPage },
  { path: "/register1", component: Registration1Page },
  { path: "/register2", component: Registration2Page },
  { path: "/user-home", component: UserHomePage },
  { path: "/discover1", component: Discover1Page },
  { path: "/discover2", component: Discover2Page },
  { path: "/my-info", component: InfoPage },
  { path: "/routine", component: ContinueRoutine },
  { path: "/PendingUsers", component: PendingUsers },
  { path: "/ManageUsers", component: ManageUsers },
  { path: "/NotSoFast", component: NotSoFast }
];

/**
 * RouterConfig renders all defined routes.
 * It uses `Switch` from Wouter to handle route switching efficiently.
 */
const RouterConfig = () => (
  <Switch>
    {routes.map(({ path, component }) => (
      <Route key={path} path={path} component={component} />
    ))}
  </Switch>
);

export default RouterConfig;
