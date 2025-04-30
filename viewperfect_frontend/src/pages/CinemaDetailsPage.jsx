import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, List, Spin, message, Typography, Row, Col } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;

const CinemaDetailsPage = () => {
  const { id } = useParams(); // hallId
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchSchedulesAndMovies = async () => {
      try {
        setLoading(true);
        const scheduleRes = await axios.get(
          "http://localhost:8080/api/schedules",
          { headers }
        );
        const allSchedules = scheduleRes.data;
        const filtered = allSchedules.filter((s) => s.hallId === parseInt(id));

        const movieMap = {};

        // 拉取所有相关 movie 的 imageUrl
        await Promise.all(
          filtered.map(async (s) => {
            if (!movieMap[s.movieId]) {
              try {
                const res = await axios.get(
                  `http://localhost:8080/api/movies/${s.movieId}`,
                  { headers }
                );
                movieMap[s.movieId] =
                  res.data.imageUrl || "https://via.placeholder.com/100";
              } catch (e) {
                movieMap[s.movieId] = "https://via.placeholder.com/100"; // fallback
              }
            }
          })
        );

        // 分组
        const groupedByMovie = {};
        filtered.forEach((schedule) => {
          const movieId = schedule.movieId;
          if (!groupedByMovie[movieId]) {
            groupedByMovie[movieId] = {
              title: schedule.movieTitle,
              movieId: schedule.movieId,
              imageUrl: movieMap[movieId],
              schedules: [],
            };
          }
          groupedByMovie[movieId].schedules.push(schedule);
        });

        setGrouped(groupedByMovie);
      } catch (err) {
        console.error("Failed to load data", err);
        message.error("Failed to load schedules or movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulesAndMovies();
  }, [id]);

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Hall Schedule</Title>
      {Object.values(grouped).map((movie) => (
        <Card key={movie.movieId} style={{ marginBottom: "24px" }}>
          <Row gutter={16}>
            <Col span={6}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Col>
            <Col span={18}>
              <Title level={4}>{movie.title}</Title>
              <List
                itemLayout="horizontal"
                dataSource={movie.schedules}
                renderItem={(schedule) => (
                  <List.Item
                    actions={[
                      <Link
                        to="/seats"
                        state={{
                          hallId: schedule.hallId,
                          scheduleId: schedule.scheduleId,
                        }}
                      >
                        Book Now
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${dayjs(schedule.startTime).format(
                        "YYYY-MM-DD HH:mm"
                      )} - ${dayjs(schedule.endTime).format("HH:mm")}`}
                      description={`Available Seats: ${schedule.availableSeats}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default CinemaDetailsPage;
