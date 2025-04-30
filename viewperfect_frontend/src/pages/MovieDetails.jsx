import { useParams } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { moviesData } from "../data/moviesData";

const MovieDetails = () => {
  const { state } = useLocation();
  const { movieId } = useParams();

  const movie =
    state?.movie ||
    moviesData.find((m) => String(m.movieId) === String(movieId));

  if (!movie) {
    return <div className="text-center text-red-500">Movie not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-80 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
      <p className="text-gray-600 mt-2">🎬 Director: {movie.director}</p>
      <p className="text-gray-600">⏰ Showtime: {movie.time}</p>
      <p className="text-gray-800 font-bold">💰 Price: {movie.price}</p>
      <p className="mt-4 text-gray-700">{movie.description}</p>
    </div>
  );
};

export default MovieDetails;
