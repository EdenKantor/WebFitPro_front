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
import routes from '../routes.json';

/**
 * Maps component names to their actual component references
 * Enables dynamic conversion from component names to their instances
 * This mapping is used to convert route configuration from JSON to actual components
 */
const componentMap = {
  FirstPage,
  LoginPage,
  Registration1Page,
  Registration2Page,
  UserHomePage,
  Discover1Page,
  Discover2Page,
  InfoPage,
  ContinueRoutine,
  PendingUsers,
  ManageUsers,
  NotSoFast
};

// Get component by its name from the map
export const getComponentByName = (componentName) => {
  return componentMap[componentName];
};

// Get all routes with their corresponding components
export const getRoutes = () => {
  return routes.routes.map(route => ({
    ...route,
    component: getComponentByName(route.component)
  }));
};
