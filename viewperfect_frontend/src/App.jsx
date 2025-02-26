import AppRoutes from "./routes/AppRoutes";
import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BrowserRouter as Router } from "react-router-dom";
import CartButton from "./components/CartButton";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Title level={3} style={{ color: "white", margin: "0 20px 0 0" }}>
              ViewPerfect
            </Title>
          </div>

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
