import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<UserHomePage />} />
    <Route path="/admin" element={<AdminHomePage />} />
    <Route path="/admin/movies" element={<MovieManagementPage />} />
    <Route path="/admin/analytics" element={<AnalyticsPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/movies" element={<MovieSearchPage />} />
    <Route path="/movie/:id" element={<MovieDetailsPage />} />
    <Route path="/cinema/:id" element={<CinemaDetailsPage />} />
    <Route path="/seats" element={<SeatSelectionPage />} />
    <Route path="/orders" element={<OrdersPage />} />
  </Routes>
);

export default AppRoutes;
