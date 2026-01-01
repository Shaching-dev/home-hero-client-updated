import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import Services from "../Services/Services";
import MyBookings from "../Services/MyBookings/MyBookings";
import CreateServices from "../Services/CreateServices/CreateServices";
import Profile from "../auth/Profile/Profile";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import MyServices from "../Services/MyServices/MyServices";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/add-services",
        Component: CreateServices,
      },

      {
        path: "/my-services",
        Component: MyServices,
      },
      {
        path: "/my-bookings",
        Component: MyBookings,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
