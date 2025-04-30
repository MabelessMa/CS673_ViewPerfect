import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Select,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const ScheduleManagementPage = () => {
  const [movieMap, setMovieMap] = useState({});
  const [hallMap, setHallMap] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetchSchedules();
    fetchMovieMap();
    fetchHallMap();
  }, []);

  const fetchMovieMap = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/movies/list", {
        headers,
      });
      const map = {};
      res.data.forEach((m) => (map[m.movieId] = m.title));
      setMovieMap(map);
    } catch (err) {
      message.error("Failed to load movies");
    }
  };

  const fetchHallMap = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/halls", {
        headers,
      });
      console.log(res.data);
      const map = {};
      res.data.forEach(
        (h) => (map[h.hallId] = { name: h.name, capacity: h.capacity })
      );

      setHallMap(map);
    } catch (err) {
      message.error("Failed to load halls");
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/schedules", {
        headers,
      });
      setSchedules(response.data);
    } catch (error) {
      message.error("Failed to load schedules");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${id}`, {
        headers,
      });
      message.success("Schedule deleted successfully!");
      fetchSchedules();
    } catch (error) {
      message.error(
        "Cannot delete. There are already orders for this schedule."
      );
      console.error("Delete failed:", error);
    }
  };

  const handleAddSchedule = async (values) => {
    try {
      const capacity = hallMap[values.hallId]?.capacity || 0;
      const payload = {
        movieId: Number(values.movieId),
        hallId: Number(values.hallId),
        startTime: values.startTime.format("YYYY-MM-DDTHH:mm:ss"),
        endTime: values.endTime.format("YYYY-MM-DDTHH:mm:ss"),
        availableSeats: capacity,
      };
      console.log(payload);
      await axios.post("http://localhost:8080/api/schedules", payload, {
        headers,
      });
      message.success("Schedule added");
      setIsModalOpen(false);
      form.resetFields();
      fetchSchedules();
    } catch (error) {
      message.error("Failed to add schedule");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "scheduleId", key: "id" },
    {
      title: "Movie",
      dataIndex: "movieId",
      key: "movie",
      render: (id) => movieMap[id] || id,
    },
    {
      title: "Hall",
      dataIndex: "hallId",
      key: "hall",
      render: (id) => hallMap[id]?.name || id,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      key: "availableSeats",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record.scheduleId)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Schedule Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Add Schedule
      </Button>
      <Table dataSource={schedules} columns={columns} rowKey="scheduleId" />

      <Modal
        title="Add Schedule"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddSchedule} layout="vertical">
          <Form.Item
            name="movieId"
            label="Movie"
            rules={[{ required: true, message: "Please select a movie" }]}
          >
            <Select placeholder="Select a movie">
              {Object.entries(movieMap).map(([id, title]) => (
                <Select.Option key={id} value={parseInt(id, 10)}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="hallId"
            label="Hall"
            rules={[{ required: true, message: "Please select a hall" }]}
          >
            <Select placeholder="Select a hall">
              {Object.entries(hallMap).map(([id, hall]) => (
                <Select.Option key={id} value={parseInt(id, 10)}>
                  {hall.name} (Seats: {hall.capacity})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: "Please select start time" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: "Please select end time" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleManagementPage;
