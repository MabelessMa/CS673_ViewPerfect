import axios from "axios";
import { Button, message, Tag } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCouch, FaWheelchair, FaUserFriends } from "react-icons/fa";
import { useState, useEffect } from "react";
import React from "react";
import "../styles/SeatSelectionPage.css";
import { getCurrentFormattedTime } from "../utils/dataUtils";

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hallId, scheduleId } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    async function fetchSeats() {
      if (!hallId) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/halls/${hallId}/seats`,
          { headers }
        );

        console.log("seat data", response.data);

        const seatData = response.data.map((seat) => {
          const rowLetter = String.fromCharCode(65 + (seat.rowNumber - 1)); // A = 65
          return {
            num: `${rowLetter}${seat.seatNumber}`, // 改成 A1, B3 等格式
            id: seat.seatId,
            row: seat.rowNumber,
            number: seat.seatNumber,
            available: seat.status === "AVAILABLE",
            status: seat.status,
            score: seat.overallScore,
          };
        });

        setSeats(seatData);

        const rowSet = new Set(seatData.map((seat) => seat.row));
        setRows(Array.from(rowSet).sort());
      } catch (error) {
        console.error("Failed to fetch seats", error);
        message.error("Failed to load seats.");
      }
    }

    fetchSeats();
  }, [hallId]);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const availableSeats = seats.filter((seat) => seat.available);
  const recommendedSeat = availableSeats.sort((a, b) => b.score - a.score)[0];

  const handleSubmitOrder = async () => {
    if (selectedSeats.length === 0) {
      message.warning("Please select at least one seat.");
      return;
    }

    try {
      setLoading(true);
      const rawUserId = localStorage.getItem("userId");
      if (!rawUserId) {
        message.error("User not logged in.");
        return;
      }
      const userId = parseInt(rawUserId);

      const orderData = {
        scheduleId: scheduleId,
        seatIds: selectedSeats,
      };

      console.log("order success", orderData);

      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderData,
        { headers }
      );
      message.success("Order submitted successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order submission failed:", error);
      message.error("Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading seats...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Your Seats</h1>

      <div style={{ marginBottom: "10px" }}>
        Recommended Seat:{" "}
        <strong style={{ color: "#52c41a" }}>{recommendedSeat?.num}</strong>{" "}
        <Tag color="green">Highest Rated</Tag>
      </div>

      <div className="screen-svg-container">
        <svg
          width="100%"
          height="60"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="screen-line"
        >
          <path
            d="M 0 10 Q 50 0 100 10"
            stroke="white"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>
        <div className="screen-label">SCREEN</div>
      </div>

      {/* Render seats */}
      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            <strong>{row}</strong>
            {seats
              .filter((seat) => seat.row === row)
              .map((seat, index) => {
                const isSelected = selectedSeats.includes(seat.id);
                const isRecommended = seat.id === recommendedSeat?.id;

                return (
                  <React.Fragment key={seat.id}>
                    <div
                      className={`seat-btn-wrapper
                        ${!seat.available ? "occupied" : ""}
                        ${isRecommended ? "recommended" : ""}
                        ${isSelected ? "selected" : ""}
                      `}
                      onClick={() =>
                        seat.available && toggleSeatSelection(seat.id)
                      }
                    >
                      <span className="seat-id-overlay">{seat.num}</span>
                      <FaCouch className="seat-icon" />
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Button type="primary" onClick={handleSubmitOrder}>
          Add to Orders
        </Button>
      </div>

      {/* 底部图例 */}
      <div className="legend">
        <div className="legend-item">
          <FaCouch className="legend-icon recommended" />
          <span>Recommended Seat</span>
        </div>
        <div className="legend-item">
          <FaCouch className="legend-icon available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <FaCouch className="legend-icon selected" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <FaCouch className="legend-icon occupied" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
