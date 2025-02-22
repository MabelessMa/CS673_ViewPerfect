import AppRoutes from "./routes/AppRoutes";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <h1 style={{ color: "white" }}>ViewPerfect</h1>
      </Header>

      <Content style={{ padding: "50px" }}>
        <AppRoutes /> {/* 通过路由加载页面组件 */}
      </Content>

      <Footer style={{ textAlign: "center" }}>ViewPerfect ©2025</Footer>
    </Layout>
  );
}

export default App;
