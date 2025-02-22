import { useParams, Link } from "react-router-dom";
import { Card, Button, List } from "antd";

const mockCinemaData = {
  id: 1,
  name: "Downtown Cinema",
  address: "123 Main St, Cityville",
  movies: [
    { id: 1, title: "The Matrix", time: "14:00" },
    { id: 2, title: "Inception", time: "16:30" },
    { id: 3, title: "Interstellar", time: "19:00" },
  ],
};

const CinemaDetailsPage = () => {
  const { id } = useParams();

  // 在真实项目中，你可以通过 API 请求获取影院数据
  const cinema = mockCinemaData; // 这里直接使用 mock 数据

  return (
    <div style={{ padding: "20px" }}>
      <h1>{cinema.name}</h1>
      <p>Address: {cinema.address}</p>

      <h2>Available Movies</h2>
      <List
        dataSource={cinema.movies}
        renderItem={(movie) => (
          <List.Item>
            <Card>
              <h3>{movie.title}</h3>
              <p>Showtime: {movie.time}</p>
              <Link to="/seats">
                <Button type="primary">Select Seats</Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CinemaDetailsPage;
