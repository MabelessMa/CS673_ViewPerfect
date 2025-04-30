import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, Button, message, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs"; // npm install dayjs

const { Option } = Select;

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movie } = useLocation().state || {};
  const [scheduleByDate, setScheduleByDate] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      if (!id) return;
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `http://localhost:8080/api/schedules`,
          { headers }
        );
        console.log("response", response.data);

        const allSchedules = Array.isArray(response.data) ? response.data : [];

        const filtered = allSchedules.filter(
          (slot) => String(slot.movieId) === String(id)
        );

        const grouped = {};
        const now = dayjs();

        filtered.forEach((slot) => {
          const start = dayjs(slot.startTime);
          const dateStr = start.format("YYYY-MM-DD");

          if (start.isAfter(now)) {
            if (!grouped[dateStr]) {
              grouped[dateStr] = [];
            }
            grouped[dateStr].push({
              ...slot,
              startTimeFormatted: start.format("HH:mm"),
              endTimeFormatted: dayjs(slot.endTime).format("HH:mm"),
            });
          }
        });

        const dates = Object.keys(grouped).sort(); // sort date

        setScheduleByDate(grouped);
        setAvailableDates(dates);
        setSelectedDate(dates[0] || ""); // default use first date
      } catch (error) {
        console.error("Error fetching schedule:", error);
        message.error("Failed to load schedule.");
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [id]);

  if (!movie) {
    return <p className="text-center text-red-500">Movie not found.</p>;
  }

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  const hasSchedules = Object.keys(scheduleByDate).length > 0;

  if (!hasSchedules) {
    return <p>No showtimes available.</p>;
  }

  const currentSlots = selectedDate ? scheduleByDate[selectedDate] || [] : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Showtimes for {movie.title}</h2>

      {/* date filter */}
      <div style={{ margin: "20px 0" }}>
        <Select
          value={selectedDate}
          onChange={(value) => setSelectedDate(value)}
          style={{ width: 200 }}
        >
          {availableDates.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
      </div>

      {/* schedle */}
      {currentSlots.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {currentSlots.map((slot) => (
            <Card
              key={slot.scheduleId}
              title={`Start: ${slot.startTimeFormatted}`}
              extra={`End: ${slot.endTimeFormatted}`}
              style={{ width: 250 }}
            >
              <p>Hall ID: {slot.hallId}</p>
              <p>Available Seats: {slot.availableSeats}</p>
              <Button
                type="primary"
                onClick={() =>
                  navigate("/seats", {
                    state: {
                      movieId: id,
                      hallId: slot.hallId,
                      scheduleId: slot.scheduleId,
                    },
                  })
                }
              >
                Select Showtime
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>No available showtimes for this date.</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
