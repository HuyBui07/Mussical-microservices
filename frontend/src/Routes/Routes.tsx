import config from "../Config";
import ClientLayout from "../Layout/ClientLayout";
import EmptyLayout from "../Layout/EmptyLayout";
import Explore from "../Pages/Clients/Explore";
import Home from "../Pages/Clients/Home";
import Login from "../Pages/Common/Login";
import Playlist from "../Pages/Clients/Playlist";
import Profile from "../Pages/Clients/Profile";
import Register from "../Pages/Common/Register";
import Statistic from "../Pages/Admin/Statistics";
import AdminLayout from "../Layout/AdminLayout";
import Songs from "../Pages/Admin/Songs";
import User from "../Pages/Admin/Users";

// Public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: EmptyLayout },
  { path: config.routes.register, component: Register, layout: EmptyLayout },
  { path: config.routes.home, component: Home, layout: ClientLayout },
  { path: config.routes.explore, component: Explore, layout: ClientLayout },
  {
    path: config.routes.statistics,
    component: Statistic,
    layout: AdminLayout,
  },
  { path: config.routes.playlist, component: Playlist, layout: ClientLayout },
  { path: config.routes.profile, component: Profile, layout: ClientLayout },
  { path: config.routes.song, component: Songs, layout: AdminLayout },
  { path: config.routes.user, component: User, layout: AdminLayout },
];

export { publicRoutes };
