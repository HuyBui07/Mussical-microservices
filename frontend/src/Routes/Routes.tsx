import config from "../Config";
import DefaultLayout from "../Layout/DefaultLayout";
import EmptyLayout from "../Layout/EmptyLayout";
import Explore from "../Pages/Explore";
import Home from "../Pages/Home";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Playlist from "../Pages/Playlist";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";

// Public routes
const publicRoutes = [
  { path: config.routes.start, component: Landing, layout: EmptyLayout },
  { path: config.routes.login, component: Login, layout: EmptyLayout },
  { path: config.routes.register, component: Register, layout: EmptyLayout },
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.explore, component: Explore, layout: DefaultLayout },
  { path: config.routes.playlist, component: Playlist, layout: DefaultLayout },
  { path: config.routes.profile, component: Profile, layout: DefaultLayout },
];

export { publicRoutes };
