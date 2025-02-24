import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to ViewPerfect</h1>
      <Card>
        <p>
          Discover the best movies and find the perfect seats for an amazing
          experience.
        </p>
        <Link to="/movies">
          <Button type="primary">Browse Movies</Button>
        </Link>
      </Card>
    </div>
  );
};

export default HomePage;
