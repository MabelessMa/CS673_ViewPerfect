import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock function to simulate fetching the order count
const getOrderCount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3); // Mock: there are 3 items in the cart
    }, 500);
  });
};

const CartButton = () => {
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    // Fetch order count when the component is mounted
    getOrderCount().then((count) => {
      setOrderCount(count);
    });
  }, []);

  return (
    <Link to="/orders">
      <Badge count={orderCount} showZero>
        <Button
          type="primary"
          shape="circle"
          icon={<ShoppingCartOutlined />}
          size="large"
        />
      </Badge>
    </Link>
  );
};

export default CartButton;
