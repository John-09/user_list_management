import React, { useEffect } from "react";
import { Layout, Dropdown, Button } from "antd";
import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const { Header } = Layout;

const BaseLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in first");
      navigate("/login");
    }
    if (token) {
      navigate("/users");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#1f2937",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
              margin: 0,
            }}
          ></h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "white", fontWeight: "500" }}>Elon Musk</span>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <span
                style={{ color: "white", fontWeight: "500", fontSize: "14px" }}
              >
                E
              </span>
            </Button>
          </Dropdown>
        </div>
      </Header>

      {/* <Content style={{ backgroundColor: "#f9fafb", padding: "24px" }}>
        {children}
      </Content> */}
      <Layout.Content className="content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default BaseLayout;
