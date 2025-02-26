import { useState } from "react";
import { Input, Card, Row, Col, Button, Divider } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const mockMovies = [
  { id: "m1", title: "The Matrix", poster: "https://via.placeholder.com/150" },
  { id: "m2", title: "Inception", poster: "https://via.placeholder.com/150" },
  {
    id: "m3",
    title: "Interstellar",
    poster: "https://via.placeholder.com/150",
  },
];

const cinemas = [
  { id: "c1", name: "Downtown Cinema", address: "123 Main St" },
  { id: "c2", name: "City Center Cinema", address: "456 Elm St" },
  { id: "c3", name: "Suburban Cinema", address: "789 Oak St" },
];

const MovieSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Search</h1>
      <Search
        placeholder="Search for movies"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />
      <Row gutter={[16, 16]}>
        {filteredMovies.map((movie) => (
          <Col key={movie.id} span={6}>
            <Link to={`/movie/${movie.id}`}>
              <Card
                hoverable
                cover={<img alt={movie.title} src={movie.poster} />}
              >
                <Card.Meta title={movie.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: "40px 0" }} />

      <Row gutter={16}>
        {cinemas.map((cinema) => (
          <Col key={cinema.id} span={6}>
            <Card title={cinema.name}>
              <p>Address: {cinema.address}</p>
              <Button type="link">
                <Link to={`/cinema/${cinema.id}`}>View Cinema Details</Link>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieSearchPage;
