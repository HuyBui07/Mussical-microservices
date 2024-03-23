import config from "../Config";
import DefaultLayout from "../Layout/DefaultLayout";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

// Public routes
const publicRoutes = [
  { path: config.routes.start, component: Landing, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: DefaultLayout },
  { path: config.routes.register, component: Register, layout: DefaultLayout },

];

export { publicRoutes };
