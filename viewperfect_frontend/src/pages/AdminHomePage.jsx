import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Typography,
  Select,
  Card,
  Row,
  Col,
  message,
  Spin,
  Button,
  Tag,
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const AdminHomePage = () => {
  const location = useLocation();
  const [halls, setHalls] = useState([]);
  const [selectedHallId, setSelectedHallId] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const getSeatLabel = (row, number) => {
    const rowLetter = String.fromCharCode(65 + (row - 1)); // A=65, B=66, ...
    return `${rowLetter}${number}`;
  };

  useEffect(() => {
    async function fetchHalls() {
      try {
        const res = await axios.get("http://localhost:8080/api/halls", {
          headers,
        });
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setHalls(res.data);
          const defaultHallId = location.state?.hallId || res.data[0]?.hallId;
          setSelectedHallId(defaultHallId);
        }
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch halls");
      }
    }

    fetchHalls();
  }, []);

  useEffect(() => {
    async function fetchSeats() {
      if (!selectedHallId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/halls/${selectedHallId}/seats`,
          {
            headers,
          }
        );
        console.log(res.data);
        const seatData = res.data.map((seat) => ({
          id: seat.seatId,
          row: seat.rowNumber,
          number: seat.seatNumber,
          score: seat.overallScore,
          status: seat.status,
        }));
        setSeats(seatData);
        const rowSet = new Set(seatData.map((s) => s.row));
        setRows([...rowSet].sort((a, b) => a - b));
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch seats");
      } finally {
        setLoading(false);
      }
    }

    fetchSeats();
  }, [selectedHallId]);

  const recommendedSeat = seats
    .filter((s) => s.status === "AVAILABLE")
    .sort((a, b) => b.score - a.score)[0];

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <Title level={2}>Admin Dashboard</Title>

      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedHallId}
        onChange={setSelectedHallId}
        placeholder="Select a hall"
      >
        {halls.map((hall) => (
          <Option key={hall.hallId} value={hall.hallId}>
            {hall.name}
          </Option>
        ))}
      </Select>

      {recommendedSeat && (
        <div style={{ marginBottom: 16 }}>
          Recommended Seat:{" "}
          <strong style={{ color: "#52c41a" }}>
            R{recommendedSeat.row}S{recommendedSeat.number}
          </strong>{" "}
          <Tag color="green">Highest Rated</Tag>
        </div>
      )}

      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          {rows.map((row) => (
            <div
              key={row}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 8,
                gap: 8,
              }}
            >
              {seats
                .filter((seat) => seat.row === row)
                .map((seat) => (
                  <div
                    key={seat.id}
                    style={{
                      width: 80,
                      height: 60,
                      borderRadius: 8,
                      backgroundColor:
                        seat.status === "BOOKED" ? "#ffccc7" : "#f6ffed",
                      border:
                        seat.id === recommendedSeat?.id
                          ? "2px solid #52c41a"
                          : "1px solid #ccc",
                      textAlign: "center",
                      paddingTop: 8,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#555" }}>
                      {getSeatLabel(seat.row, seat.number)}
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: 16 }}>
                      {seat.score?.toFixed(1) ?? "N/A"}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      <Row gutter={16} justify="center" style={{ marginTop: 48 }}>
        <Col span={8}>
          <Card title="Movie Management" variant="outlined">
            <p>Manage the movies available in this cinema.</p>
            <Button type="primary">
              <Link to="/admin/movies">Go to Movie Management</Link>
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Analytics" variant="outlined">
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
