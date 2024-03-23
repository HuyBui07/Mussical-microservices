import config from "../Config";
import DefaultLayout from "../Layout/DefaultLayout";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";

// Public routes
const publicRoutes = [
  { path: config.routes.start, component: Landing, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: DefaultLayout },
];

export { publicRoutes };
