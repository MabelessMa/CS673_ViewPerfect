import { Button, Card, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const mockUsers = [
    { username: "user", password: "123456", role: "user" },
    { username: "admin", password: "admin123", role: "admin" },
  ];

  const onFinish = (values) => {
    const { username, password } = values;
    const matchedUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", matchedUser.role);

      message.success("Login successful!");

      if (matchedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      message.error("Invalid username or password");
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
      </Form>
    </Card>
  );
};

export default LoginPage;
