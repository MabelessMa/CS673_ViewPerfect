import React from "react";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Movie Management" bordered={false}>
            <p>Manage the movies available in cinemas.</p>
            <Button type="primary">
              <Link to="/admin/movies">Go to Movie Management</Link>
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Analytics" bordered={false}>
            <p>View analytics and performance data.</p>
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
