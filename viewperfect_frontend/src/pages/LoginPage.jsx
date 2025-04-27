import React from "react";
import { Button, Card, Input, Form, message, Modal, Checkbox } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 统一 Axios 实例
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default function LoginPage() {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  // 打开注册对话框并重置状态
  const handleRegisterOpen = () => {
    registerForm.resetFields();
    setRegisterVisible(true);
    setRegisterLoading(false);
  };

  // 登录提交
  const handleLogin = async (values) => {
    setLoginLoading(true);
    try {
      const response = await api.post("/login", {
        username: values.username,
        password: values.password,
      });
      const { token, role, userId } = response.data;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      message.success("Login successful!");
      navigate(role === "admin" ? "/admin" : "/");
    } catch (error) {
      const errMsg =
        error.response?.data?.error || "Invalid username or password";
      message.error(errMsg);
    } finally {
      setLoginLoading(false);
    }
  };

  // 注册提交
  const handleRegisterSubmit = async (values) => {
    setRegisterLoading(true);
    try {
      const userRole = values.isAdmin ? "admin" : "user";
      console.log("Register payload:", {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        role: userRole,
      });
      const response = await api.post("/users/register", {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        role: userRole,
      });
      const { token, userId, role } = response.data;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      message.success("Registered and logged in successfully!");
      setRegisterVisible(false);
      navigate(role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Register failed:", error);
      console.error("Response data:", error.response?.data);
      message.error(error.response?.data?.error || "Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <Card
      title="Login"
      style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}
    >
      <Form
        form={loginForm}
        layout="vertical"
        name="login"
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loginLoading}>
            Login
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", margin: "16px 0", color: "gray" }}>
          ———— or ————
        </div>
      </Form>

      <Button type="default" block onClick={handleRegisterOpen}>
        Register
      </Button>

      <Modal
        title="Register"
        open={registerVisible}
        onCancel={() => {
          setRegisterVisible(false);
          registerForm.resetFields();
          setRegisterLoading(false);
        }}
        footer={null}
      >
        <Form
          form={registerForm}
          layout="vertical"
          initialValues={{ isAdmin: false }}
          onFinish={handleRegisterSubmit}
        >
          <Form.Item name="isAdmin" valuePropName="checked">
            <Checkbox>Register as Admin</Checkbox>
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone!" },
              { pattern: /^\d+$/, message: "Digits only" },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registerLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
