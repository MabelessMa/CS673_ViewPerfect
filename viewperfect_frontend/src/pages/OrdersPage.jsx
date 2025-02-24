import { List, Card, Button, message } from "antd";
import { useState } from "react";

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

  const handleCancelOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    message.success("Order canceled successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <Card title={order.movie}>
              <p>Cinema: {order.cinema}</p>
              <p>Seats: {order.seats.join(", ")}</p>
              <p>Showtime: {order.time}</p>
              <Button
                type="primary"
                danger
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrdersPage;
