import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Card, Row, Col, Button, Divider, message } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const MovieSearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const moviesResponse = await axios.get(
          "http://localhost:8080/api/movies",
          { headers }
        );
        const hallsResponse = await axios.get(
          "http://localhost:8080/api/halls",
          { headers }
        );
        console.log(moviesResponse.data.content);
        setMovies(moviesResponse.data.content);
        setHalls(hallsResponse.data);
      } catch (error) {
        console.error("Error fetching movies or halls:", error);
        message.error("Failed to load movies or halls.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHalls = halls.filter((hall) =>
    hall.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie & Hall Search</h1>

      <Search
        placeholder="Search for movies or halls"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />

      <h2>Movies</h2>
      <Row gutter={[16, 16]}>
        {filteredMovies.map((movie) => (
          <Col key={movie.movieId} span={6}>
            <Link to={`/movie/${movie.movieId}`} state={{ movie }}>
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.title}
                    src={movie.imageUrl || "https://via.placeholder.com/150"}
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
        {filteredHalls.map((hall) => (
          <Col key={hall.hallId} span={6}>
            <Card title={hall.name}>
              <p>Address: {hall.type}</p>
              <p>Capacity: {hall.capacity}</p>
              <Button type="link">
                <Link to={`/cinema/${hall.hallId}`}>View Details</Link>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieSearchPage;
