import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

// 模拟电影数据
const initialMovies = [
  { id: "1", title: "The Matrix", genre: "Sci-Fi" },
  { id: "2", title: "Inception", genre: "Action" },
  { id: "3", title: "Interstellar", genre: "Adventure" },
];

const MovieManagementPage = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    message.success("Movie deleted successfully");
  };

  const handleAddOrEdit = (values) => {
    if (editingMovie) {
      // 编辑现有电影
      setMovies(
        movies.map((movie) =>
          movie.id === editingMovie.id ? { ...movie, ...values } : movie
        )
      );
      message.success("Movie updated successfully");
    } else {
      // 添加新电影
      const newMovie = { ...values, id: Date.now().toString() };
      setMovies([...movies, newMovie]);
      message.success("Movie added successfully");
    }
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Genre", dataIndex: "genre", key: "genre" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={columns} rowKey="id" />

      <Modal
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form initialValues={editingMovie} onFinish={handleAddOrEdit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="genre"
            label="Genre"
            rules={[{ required: true, message: "Please enter the genre" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingMovie ? "Update Movie" : "Add Movie"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieManagementPage;
