import axios from "axios";
import { Button, message, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { FaCouch, FaWheelchair, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import React from "react";
import "../styles/SeatSelectionPage.css";

// mock seat data
const rows = ["A", "B", "C", "D", "E", "F"];

const seatLayout = rows.flatMap((row) =>
  Array.from({ length: 11 }, (_, i) => ({
    id: `${row}${i + 1}`,
    row,
    number: i + 1,
    available: Math.random() > 0.2,
    score: +(Math.random() * 5).toFixed(1),
  }))
);

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const availableSeats = seatLayout.filter((seat) => seat.available);
  const recommendedSeat = availableSeats.sort((a, b) => b.score - a.score)[0];

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSubmitOrder = async () => {
    if (selectedSeats.length === 0) {
      message.warning("Please select at least one seat.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        userId: "mock-user-id",
        seats: selectedSeats,
        movieId: "mock-movie-id",
        showtimeId: "mock-showtime-id",
      };

      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderData
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Your Seats</h1>

      <div style={{ marginBottom: "10px" }}>
        Recommended Seat:{" "}
        <strong style={{ color: "#52c41a" }}>{recommendedSeat?.id}</strong>{" "}
        <Tag color="green">Highest Rated</Tag>
      </div>

      {/* 屏幕标识 */}
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

      {/* Render Seats */}
      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            <strong>{row}</strong>
            {seatLayout
              .filter((seat) => seat.row === row)
              .map((seat, index) => {
                const isSelected = selectedSeats.includes(seat.id);
                const isRecommended = seat.id === recommendedSeat.id;

                // Set Pass
                const isAisle = index === 2 || index === 9;

                return (
                  <React.Fragment key={seat.id}>
                    {isAisle && <div className="aisle-space" />}

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
                      <span className="seat-id-overlay">{seat.id}</span>
                      <FaCouch className="seat-icon" />
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        ))}
      </div>

      {/* submit order */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Button type="primary" onClick={handleSubmitOrder}>
          Add to Orders
        </Button>
      </div>

      {/* render icon */}
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
