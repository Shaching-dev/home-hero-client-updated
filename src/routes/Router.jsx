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
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import AboutUs from "../components/AboutUs/AboutUs";
import BeProvider from "../components/BeProvider/BeProvider";
import MyRequest from "../Services/MyRequest/MyRequest";
import AllApplication from "../Services/AllApplication/AllApplication";
import UsersManagement from "../admin/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute/AdminRoute";

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
        path: "/provider",
        element: (
          <PrivateRoute>
            <BeProvider />
          </PrivateRoute>
        ),
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
        path: "/about-us",
        Component: AboutUs,
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

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "my-bookings",
        element: <MyBookings />,
      },

      {
        path: "my-services",
        element: <MyServices />,
      },
      {
        path: "my-request",
        element: <MyRequest />,
      },
      {
        path: "all-applications",
        element: <AllApplication />,
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
