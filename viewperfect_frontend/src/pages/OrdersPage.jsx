import { List, Card, Button, message, Rate } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const mockOrders = [
  {
    id: 1,
    movie: "The Matrix",
    cinema: "Downtown Cinema",
    seats: ["A1", "A2"],
    time: "7:00 PM",
  },
  {
    id: 2,
    movie: "Inception",
    cinema: "City Center Cinema",
    seats: ["B1"],
    time: "9:30 PM",
  },
  {
    id: 3,
    movie: "Interstellar",
    cinema: "Suburban Cinema",
    seats: ["C1", "C2", "C3"],
    time: "6:00 PM",
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [ratings, setRatings] = useState({}); // { [orderId]: { movie: number, seat: number, submitted: boolean } }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/api/orders?userId=${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        message.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      const updatedOrders = orders.filter((order) => order.id !== id);
      setOrders(updatedOrders);
      message.success("Order canceled successfully!");
    } catch (error) {
      console.error("Order cancellation failed:", error);
      message.error("Failed to cancel order.");
    }
  };

  const handleRateChange = (orderId, type, value) => {
    setRatings((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [type]: value,
      },
    }));
  };

  const handleSubmitRating = async (orderId) => {
    const rating = ratings[orderId];
    if (!rating || !rating.movie || !rating.seat) {
      message.warning("Please rate both the movie and the seat.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/orders/${orderId}/rating`, {
        movieRating: rating.movie,
        seatRating: rating.seat,
      });

      setRatings((prev) => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          submitted: true,
        },
      }));

      message.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Rating submission failed:", error);
      message.error("Failed to submit rating.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={orders}
        renderItem={(order) => {
          const rating = ratings[order.id] || {};
          return (
            <List.Item>
              <Card title={order.movie}>
                <p>Cinema: {order.cinema}</p>
                <p>Seats: {order.seats.join(", ")}</p>
                <p>Showtime: {order.time}</p>

                {!rating.submitted ? (
                  <>
                    <p>
                      Movie Rating:{" "}
                      <Rate
                        onChange={(value) =>
                          handleRateChange(order.id, "movie", value)
                        }
                        value={rating.movie}
                      />
                    </p>
                    <p>
                      Seat Rating:{" "}
                      <Rate
                        onChange={(value) =>
                          handleRateChange(order.id, "seat", value)
                        }
                        value={rating.seat}
                      />
                    </p>
                    <Button
                      type="primary"
                      onClick={() => handleSubmitRating(order.id)}
                      style={{ marginBottom: "10px" }}
                    >
                      Submit Rating
                    </Button>
                  </>
                ) : (
                  <p style={{ color: "green" }}>You've already rated.</p>
                )}

                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Cancel Order
                </Button>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default OrdersPage;
