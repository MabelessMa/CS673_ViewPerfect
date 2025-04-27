import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Card, Row, Col, Button, Divider, message } from "antd";
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
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const moviesResponse = await axios.get(
          "http://localhost:8080/api/movies"
        );
        const cinemasResponse = await axios.get(
          "http://localhost:8080/api/cinemas"
        );

        setMovies(moviesResponse.data);
        setCinemas(cinemasResponse.data);
      } catch (error) {
        console.error("Error fetching movies or cinemas:", error);
        message.error("Failed to load movies or cinemas.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  //filter movie and cinema
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCinemas = cinemas.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie & Cinema Search</h1>

      <Search
        placeholder="Search for movies or cinemas"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />

      <h2>Movies</h2>
      <Row gutter={[16, 16]}>
        {filteredMovies.map((movie) => (
          <Col key={movie.id} span={6}>
            <Link to={`/movie/${movie.id}`} state={{ movieId: movie.id }}>
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.title}
                    src={movie.poster || "https://via.placeholder.com/150"}
                  />
                }
              >
                <Card.Meta title={movie.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Divider style={{ margin: "40px 0" }} />

      <h2>Cinemas</h2>
      <Row gutter={[16, 16]}>
        {filteredCinemas.map((cinema) => (
          <Col key={cinema.id} span={6}>
            <Card title={cinema.name}>
              <p>Address: {cinema.location || cinema.address}</p>
              <Button type="link">
                <Link to={`/cinema/${cinema.id}`}>View Details</Link>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieSearchPage;
