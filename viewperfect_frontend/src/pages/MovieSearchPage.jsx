import { useState } from "react";
import { Input, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const mockMovies = [
  { id: 1, title: "The Matrix", poster: "https://via.placeholder.com/150" },
  { id: 2, title: "Inception", poster: "https://via.placeholder.com/150" },
  { id: 3, title: "Interstellar", poster: "https://via.placeholder.com/150" },
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
            <Link to={`/cinema/${movie.id}`}>
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
    </div>
  );
};

export default MovieSearchPage;
