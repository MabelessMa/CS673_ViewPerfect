import AppRoutes from "./routes/AppRoutes";
import { Layout, Menu, Typography, Avatar, Dropdown, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import CartButton from "./components/CartButton";

localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", "user");
localStorage.setItem("userId", "mock-user-id-123");
localStorage.setItem("token", "mock-token-abc123");

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role") || "user";
  const username = role === "admin" ? "Admin" : "User";

  const handleGoHome = () => {
    navigate(role === "admin" ? "/admin" : "/");
  };

  const handleProfile = () => {
    navigate(role === "admin" ? "/admin/profile" : "/profile");
  };

  const handleCart = () => {
    navigate("/orders");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    message.success("Logged out");
    navigate("/login");
  };

  const menuItems =
    role === "admin"
      ? [
          {
            key: "dashboard",
            label: "Dashboard",
            icon: <DashboardOutlined />,
            onClick: handleGoHome,
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
          },
        ]
      : [
          {
            key: "home",
            label: "Home",
            icon: <HomeOutlined />,
            onClick: handleGoHome,
          },
          {
            key: "cart",
            label: "Shopping Cart",
            icon: <ShoppingCartOutlined />,
            onClick: handleCart,
          },
          {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
            onClick: handleProfile,
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
          },
        ];

  const menu = <Menu items={menuItems} />;

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title level={3} style={{ color: "white", margin: "0 20px 0 0" }}>
            ViewPerfect
          </Title>
        </div>

        {isLoggedIn && (
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar
              style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        )}
      </Header>

      <Content style={{ padding: "50px" }}>
        <AppRoutes />
      </Content>

      <Footer style={{ textAlign: "center" }}>ViewPerfect ©2025</Footer>
    </Layout>
  );
}

export default App;
