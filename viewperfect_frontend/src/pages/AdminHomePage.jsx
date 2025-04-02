import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Statistic, Select, Typography } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const AdminHomePage = () => {
  // Mock 影院数据
  const cinemas = [
    { id: "cinema1", name: "Downtown Cinema" },
    { id: "cinema2", name: "City Center Cinema" },
    { id: "cinema3", name: "Suburban Cinema" },
  ];

  // 每个影院的 mock 统计数据
  const cinemaStats = {
    cinema1: { movies: 10, ordersToday: 45, revenue: 980.5 },
    cinema2: { movies: 7, ordersToday: 28, revenue: 620.25 },
    cinema3: { movies: 5, ordersToday: 14, revenue: 310.0 },
  };

  const [selectedCinema, setSelectedCinema] = useState("cinema1");
  const [stats, setStats] = useState(cinemaStats["cinema1"]);

  useEffect(() => {
    // 模拟从后端加载每家影院的数据
    setStats(cinemaStats[selectedCinema]);
  }, [selectedCinema]);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Admin Dashboard</Title>

      {/* 下拉选择影院 */}
      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedCinema}
        onChange={setSelectedCinema}
        placeholder="Select a cinema"
      >
        {cinemas.map((cinema) => (
          <Option key={cinema.id} value={cinema.id}>
            {cinema.name}
          </Option>
        ))}
      </Select>

      {/* 影院统计数据 */}
      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Movies Playing" value={stats.movies} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Orders Today" value={stats.ordersToday} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={stats.revenue}
              prefix="$"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* 页面导航按钮 */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Movie Management" bordered={false}>
            <p>Manage the movies available in this cinema.</p>
            <Button type="primary">
              <Link to="/admin/movies">Go to Movie Management</Link>
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Analytics" bordered={false}>
            <p>View analytics and performance data for this cinema.</p>
            <Button type="primary">
              <Link to="/admin/analytics">Go to Analytics</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHomePage;
