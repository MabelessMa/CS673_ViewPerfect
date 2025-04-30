import { List, Card, Button, message, Rate } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers,
        });
        console.log("order response:", response.data); // 添加这一行
        setOrders(response.data);
        console.log("orderid", response.data);
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
      await axios.delete(`http://localhost:8080/api/orders/${id}`, {
        headers,
      });
      const updatedOrders = orders.filter((order) => order.orderId !== id);
      setOrders(updatedOrders);
      message.success("Order deleted successfully!");
    } catch (error) {
      console.error("Order deletion failed:", error);
      message.error(error.response?.data || "Failed to delete order.");
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

  const handleSubmitRating = async (orderId, seats) => {
    const rating = ratings[orderId];
    if (!rating || !rating.seat) {
      message.warning("Please rate the seat.");
      return;
    }

    const payload = {
      seatIds: seats,
      rating: rating.seat * 2,
    };
    console.log("orderId", orderId);

    try {
      await axios.put(
        `http://localhost:8080/api/seats/rate?orderId=${orderId}`,
        payload,
        { headers }
      );

      setRatings((prev) => ({
        ...prev,
        [orderId]: {
          ...prev[orderId],
          submitted: true,
        },
      }));

      message.success("Thank you for rating the seat!");
      fetchOrders();
    } catch (error) {
      console.error("Seat rating submission failed:", error);
      message.error("Failed to submit seat rating.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={orders}
        loading={loading}
        renderItem={(order) => {
          const orderId = order.orderId;
          const rating = ratings[orderId] || {};

          return (
            <List.Item>
              <Card title={order.movie}>
                <p>Cinema: {order.cinema}</p>
                <p>
                  Seats:{" "}
                  {order.seats.map((seatId) => seatId.split("_")[1]).join(", ")}
                </p>
                <p>Showtime: {order.time}</p>

                {order.status === "COMPLETED" ? (
                  <p style={{ color: "green" }}>You've already rated.</p>
                ) : (
                  <>
                    <p>
                      Movie Rating:{" "}
                      <Rate
                        onChange={(value) =>
                          handleRateChange(orderId, "movie", value)
                        }
                        value={ratings[orderId]?.movie}
                      />
                    </p>
                    <p>
                      Seat Rating:{" "}
                      <Rate
                        onChange={(value) =>
                          handleRateChange(orderId, "seat", value)
                        }
                        value={ratings[orderId]?.seat}
                      />
                    </p>
                    <Button
                      type="primary"
                      onClick={() => handleSubmitRating(orderId, order.seats)}
                      style={{ marginBottom: "10px" }}
                    >
                      Submit Rating
                    </Button>
                  </>
                )}

                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancelOrder(orderId)}
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
