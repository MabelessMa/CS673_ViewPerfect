import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserHomePage from "../pages/UserHomePage";
import AdminHomePage from "../pages/AdminHomePage";
import MovieManagementPage from "../pages/MovieManagementPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MovieSearchPage from "../pages/MovieSearchPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import CinemaDetailsPage from "../pages/CinemaDetailsPage";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import OrdersPage from "../pages/OrdersPage";
import UserProfile from "../pages/UserProfile";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/"
      element={
        <PrivateRoute>
          {" "}
          <UserHomePage />{" "}
        </PrivateRoute>
      }
    />

    <Route
      path="/movies"
      element={
        <PrivateRoute>
          <MovieSearchPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <UserProfile />
        </PrivateRoute>
      }
    />

    <Route
      path="/movie/:id"
      element={
        <PrivateRoute>
          <MovieDetailsPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/cinema/:id"
      element={
        <PrivateRoute>
          <CinemaDetailsPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/seats"
      element={
        <PrivateRoute>
          <SeatSelectionPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/orders"
      element={
        <PrivateRoute>
          <OrdersPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/admin"
      element={
        <PrivateRoute requiredRole="admin">
          <AdminHomePage />
        </PrivateRoute>
      }
    />

    <Route
      path="/admin/movies"
      element={
        <PrivateRoute requiredRole="admin">
          <MovieManagementPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/admin/analytics"
      element={
        <PrivateRoute requiredRole="admin">
          <AnalyticsPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
