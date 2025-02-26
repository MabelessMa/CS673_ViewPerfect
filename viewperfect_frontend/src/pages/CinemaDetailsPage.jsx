import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Button, Spin, message } from "antd";
import BookButton from "../components/BookButton";
import { Link } from "react-router-dom";

// 模拟影院数据
const mockCinemas = [
  {
    id: "c1",
    name: "Downtown Cinema",
    address: "123 Main St, City Center",
    phone: "123-456-7890",
    movies: [
      { id: "m1", title: "The Matrix" },
      { id: "m2", title: "Inception" },
    ],
  },
  {
    id: "c2",
    name: "City Center Cinema",
    address: "456 Elm St, City Center",
    phone: "987-654-3210",
    movies: [
      { id: "m3", title: "Interstellar" },
      { id: "m4", title: "Tenet" },
    ],
  },
  {
    id: "c3",
    name: "Suburban Cinema",
    address: "789 Oak St, Suburb",
    phone: "555-555-5555",
    movies: [
      { id: "m5", title: "Dune" },
      { id: "m6", title: "Blade Runner 2049" },
    ],
  },
];

const CinemaDetailsPage = () => {
  const { id } = useParams(); // 获取动态路由中的ID
  const [cinema, setCinema] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 使用模拟数据，根据ID获取影院信息
    const cinemaData = mockCinemas.find((c) => c.id === id);

    if (cinemaData) {
      setCinema(cinemaData);
    } else {
      message.error("Cinema not found.");
    }

    setLoading(false);
  }, [id]); // 当ID变化时重新加载数据

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }

  if (!cinema) {
    return <p>Cinema not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cinema Details: {cinema.name}</h1>
      <Card title={cinema.name}>
        <p>Address: {cinema.address}</p>
        <p>Phone: {cinema.phone}</p>

        <h2>Available Movies</h2>
        <List
          dataSource={cinema.movies}
          renderItem={(movie) => (
            <List.Item>
              <Card>
                <p>{movie.title}</p>
                <BookButton />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default CinemaDetailsPage;
