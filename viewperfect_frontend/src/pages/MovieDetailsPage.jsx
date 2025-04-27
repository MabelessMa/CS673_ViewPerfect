import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message } from "antd";
import BookButton from "../components/BookButton";
import axios from "axios";

// 模拟电影数据
const mockMovies = [
  {
    id: "m1",
    title: "The Matrix",
    genre: "Sci-Fi",
    description: "A mind-bending thriller.",
  },
  {
    id: "m2",
    title: "Inception",
    genre: "Action",
    description: "Dream within a dream.",
  },
  {
    id: "m3",
    title: "Interstellar",
    genre: "Adventure",
    description: "A journey beyond the stars.",
  },
];

const MovieDetailsPage = () => {
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = mockMovies.find((m) => m.id === id);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/showtimes?movieId=${id}`
        );
        setShowtimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        message.error("Failed to load showtimes.");
      }
    };

    fetchShowtimes();
  }, [id]);

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Showtimes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {showtimes.map((showtime) => (
          <Card
            key={showtime.id}
            title={showtime.cinemaName || "Cinema"}
            style={{ width: 250 }}
          >
            <p>Time: {showtime.time}</p>
            <Button
              type="primary"
              onClick={() => {
                navigate("/seats", {
                  state: {
                    movieId: id,
                    cinemaId: showtime.cinemaId,
                    showtimeId: showtime.id,
                  },
                });
              }}
            >
              Select Showtime
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
