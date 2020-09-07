import Login from "screens/Login";
import Layout from "screens/Layout";

const publicRoutes = [
  {
    component: Login,
    path: "/login",
    exact: true,
  }
];
const protectedRoutes = [
  {
    component: Layout,
    path: "/dashboard",
    exact: true,
    name: "Dashboard"
  },
 
  {
    path: "/leave/requests",
    name: "Others",
    exact: false,
  },
  {
    path: "/leave/calendar",
    name: "Others",
    exact: false,
  },
  {
    path: "/employee/performance",
    name: "Others",
    exact: false,
  },
  {
    path: "/employee/organization",
    name: "Others",
    exact: false,
  },
  {
    path: "/repository",
    name: "Others",
    exact: false,
  },
  {
    path: "/settings",
    name: "Others",
    exact: false,
  },
];
const guestRoutes = [
  {
    component: Login,
    path: "/",
    exact: true,
  },
];
export { guestRoutes, protectedRoutes, publicRoutes };
