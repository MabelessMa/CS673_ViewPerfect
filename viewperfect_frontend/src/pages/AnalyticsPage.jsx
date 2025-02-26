import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const AnalyticsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Analytics Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Movies" value={25} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Tickets Sold" value={4520} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Revenue" value={123456} prefix="$" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage;
