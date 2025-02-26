import { Card, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const recommendedMovies = [
  { id: 1, title: "The Matrix", poster: "https://via.placeholder.com/150" },
  { id: 2, title: "Inception", poster: "https://via.placeholder.com/150" },
  { id: 3, title: "Interstellar", poster: "https://via.placeholder.com/150" },
];

const UserHomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to ViewPerfect (User)</h1>
      <Link to="/movies">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          Search Movies
        </Button>
      </Link>

      <h2>Recommended Movies</h2>
      <Row gutter={16}>
        {recommendedMovies.map((movie) => (
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

export default UserHomePage;
