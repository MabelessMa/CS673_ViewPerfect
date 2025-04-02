import { Button, message, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 多排 mock seat data
const rows = ["A", "B", "C"];
const seatLayout = rows.flatMap((row) =>
  Array.from({ length: 8 }, (_, i) => ({
    id: `${row}${i + 1}`,
    row,
    number: i + 1,
    available: Math.random() > 0.2,
    score: +(Math.random() * 5).toFixed(1),
  }))
);

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const availableSeats = seatLayout.filter((seat) => seat.available);
  const recommendedSeat = availableSeats.sort((a, b) => b.score - a.score)[0];

  const handleAddToOrders = () => {
    if (!selectedSeat) {
      message.warning("Please select a seat before proceeding.");
      return;
    }
    message.success(`Seat ${selectedSeat} added to your orders!`);
    navigate("/orders");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Your Seats</h1>

      <div style={{ marginBottom: "10px" }}>
        Recommended Seat:{" "}
        <strong style={{ color: "#52c41a" }}>{recommendedSeat?.id}</strong>{" "}
        <Tag color="green">Highest Rated</Tag>
      </div>

      {/* 渲染多排座位 */}
      <div className="seat-grid" style={{ display: "grid", gap: "16px" }}>
        {rows.map((row) => (
          <div
            key={row}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <strong>{row}</strong>
            {seatLayout
              .filter((seat) => seat.row === row)
              .map((seat) => {
                const isSelected = seat.id === selectedSeat;
                const isRecommended = seat.id === recommendedSeat.id;

                return (
                  <Button
                    key={seat.id}
                    shape="circle"
                    type={
                      !seat.available
                        ? "default"
                        : isSelected
                        ? "primary"
                        : isRecommended
                        ? "default"
                        : "default"
                    }
                    disabled={!seat.available}
                    style={{
                      backgroundColor: isRecommended ? "#52c41a" : undefined,
                      color: isRecommended ? "white" : undefined,
                      border:
                        isRecommended && !isSelected
                          ? "2px solid #52c41a"
                          : undefined,
                    }}
                    onClick={() => setSelectedSeat(seat.id)}
                  >
                    {seat.number}
                  </Button>
                );
              })}
          </div>
        ))}
      </div>

      <Button
        type="primary"
        style={{ marginTop: "24px" }}
        onClick={handleAddToOrders}
      >
        Add to Orders
      </Button>
    </div>
  );
};

export default SeatSelectionPage;
