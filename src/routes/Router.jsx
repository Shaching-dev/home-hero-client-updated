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
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ServiceDetails from "../Services/ServiceDetails.jsx/ServiceDetails";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <LoadingSpinner />,
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
        path: "services/:id",
        Component: ServiceDetails,
      },
      {
        path: "/add-services",
        element: (
          <PrivateRoute>
            <CreateServices />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
