import { Button, Card, Input, Form, message, Modal, Checkbox } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [registerVisible, setRegisterVisible] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const mockUsers = [
    { username: "user", password: "123456", role: "user" },
    { username: "admin", password: "admin123", role: "admin" },
  ];

  const handleRegister = () => {
    setRegisterVisible(true); // open register modal
  };

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      const { token, role, userId } = response.data; // Backend return

      //save userid
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      message.success("Login successful!");

      // navigate
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Invalid username or password");
    }
  };

  const handleRegisterSubmit = async (values) => {
    try {
      setRegisterLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username: values.username,
          password: values.password,
          email: values.email,
          phone: values.phone,
          role: values.isAdmin ? "admin" : "user",
        }
      );

      // login after register
      const { token, userId, role } = response.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      message.success("Registered and Logged in successfully!");
      setRegisterVisible(false);
      navigate(role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Register failed:", error);
      message.error("Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto" }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center", margin: "16px 0", color: "gray" }}>
          ------------------ or ------------------
        </div>
      </Form>
      <Button type="default" block onClick={handleRegister}>
        Register
      </Button>
      <Modal
        title="Register"
        open={registerVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={null}
      >
        <Form onFinish={handleRegisterSubmit}>
          <Form.Item name="isAdmin" valuePropName="checked">
            <Checkbox>Register as Admin</Checkbox>
          </Form.Item>
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your e-mail!" }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter your phone!" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={registerLoading}
              block
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LoginPage;
