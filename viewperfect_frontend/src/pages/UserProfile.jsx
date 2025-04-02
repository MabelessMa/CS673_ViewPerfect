import { Card, Form, Input, Button, Select, message } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

const UserProfilePage = () => {
  const [userInfo] = useState({
    username: "Alice Li",
    email: "alice@example.com",
    phone: "123-456-7890",
  });

  const [preference, setPreference] = useState({
    row: "",
    position: "",
  });

  // 从本地读取偏好
  useEffect(() => {
    const stored = localStorage.getItem("seatPreference");
    if (stored) {
      setPreference(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("seatPreference", JSON.stringify(preference));
    message.success("Preferences saved!");
  };

  return (
    <div style={{ padding: "24px", maxWidth: 600, margin: "auto" }}>
      <Card title="User Profile">
        <p>
          <strong>Username:</strong> {userInfo.username}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {userInfo.phone}
        </p>

        <Form layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="Preferred Seat Row">
            <Select
              value={preference.row}
              onChange={(value) => setPreference({ ...preference, row: value })}
              placeholder="Select row preference"
            >
              <Option value="front">Front</Option>
              <Option value="middle">Middle</Option>
              <Option value="back">Back</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred Seat Position">
            <Select
              value={preference.position}
              onChange={(value) =>
                setPreference({ ...preference, position: value })
              }
              placeholder="Select position preference"
            >
              <Option value="center">Center</Option>
              <Option value="side">Side</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save Preferences
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfilePage;
