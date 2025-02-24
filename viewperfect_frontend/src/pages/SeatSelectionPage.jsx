import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const SeatSelectionPage = () => {
  const navigate = useNavigate();

  const handleAddToOrders = () => {
    // 这里可以添加将选择的座位和电影信息保存到订单的逻辑
    message.success("Seats added to your orders!");
    navigate("/orders"); // 跳转到订单页面
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select Your Seats</h1>
      <div className="seat-grid" style={{ marginBottom: "20px" }}>
        <Button shape="circle">1</Button>
        <Button shape="circle" type="primary">
          2
        </Button>
        <Button shape="circle" disabled>
          3
        </Button>
      </div>
      <Button type="primary" onClick={handleAddToOrders}>
        Add to Orders
      </Button>
    </div>
  );
};

export default SeatSelectionPage;
