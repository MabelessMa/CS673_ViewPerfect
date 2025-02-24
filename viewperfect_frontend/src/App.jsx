import AppRoutes from "./routes/AppRoutes";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BrowserRouter as Router } from "react-router-dom";
import CartButton from "./components/CartButton";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      {" "}
      {/* 添加 Router 包裹整个应用 */}
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="movies">
              <Link to="/movies">Movies</Link>
            </Menu.Item>
          </Menu>
          <CartButton />
        </Header>

        <Content style={{ padding: "50px" }}>
          <AppRoutes />
        </Content>

        <Footer style={{ textAlign: "center" }}>ViewPerfect ©2025</Footer>
      </Layout>
    </Router>
  );
}

export default App;
