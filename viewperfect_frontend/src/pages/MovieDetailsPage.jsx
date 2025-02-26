import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "antd";
import BookButton from "../components/BookButton";

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
  const { id } = useParams();
  const movie = mockMovies.find((m) => m.id === id);

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Details: {movie.title}</h1>
      <Card title={movie.title}>
        <p>Genre: {movie.genre}</p>
        <p>Description: {movie.description}</p>
        <BookButton />
      </Card>
    </div>
  );
};

export default MovieDetailsPage;
