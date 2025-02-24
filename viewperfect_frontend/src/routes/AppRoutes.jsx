import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MovieSearchPage from "../pages/MovieSearchPage";
import CinemaDetailsPage from "../pages/CinemaDetailsPage";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import OrdersPage from "../pages/OrdersPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/movies" element={<MovieSearchPage />} />
    <Route path="/cinema/:id" element={<CinemaDetailsPage />} />
    <Route path="/seats" element={<SeatSelectionPage />} />
    <Route path="/orders" element={<OrdersPage />} />
  </Routes>
);

export default AppRoutes;
