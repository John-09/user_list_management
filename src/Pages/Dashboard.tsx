import React, { useEffect } from "react";
import { Row, Col, Card, Statistic, Progress, Button } from "antd";
import {
  UserOutlined,
  ThunderboltOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../Store";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../Store/userSlice";

const COLORS = ["#1890ff", "#52c41a", "#f5222d"];

const dummyEngagementData = [
  { name: "Active", value: 400 },
  { name: "Idle", value: 300 },
  { name: "Offline", value: 200 },
];

export const Dashboard: React.FC = () => {
  const userList = useSelector((state: RootState) => state.users.userList);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);
  const cardStyle: React.CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered hoverable style={cardStyle}>
            <Statistic
              title="Active Users"
              value={userList.length}
              prefix={<UserOutlined />}
            />
            <div style={{ marginTop: 12 }} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card bordered hoverable style={cardStyle}>
            <Statistic
              title="System Health"
              value="98%"
              prefix={<ThunderboltOutlined />}
            />
            <Progress percent={98} status="active" style={{ marginTop: 12 }} />
          </Card>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <Card bordered hoverable style={cardStyle}>
            <Statistic
              title="User Engagement"
              value="Engagement Breakdown"
              prefix={<PieChartOutlined />}
            />
            <div style={{ marginTop: 12 }} />
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="User Engagement Breakdown" bordered hoverable>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyEngagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent! * 100).toFixed(0)}%`
                  }
                >
                  {dummyEngagementData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Quick Actions"
            bordered
            hoverable
            style={{ height: "100%" }}
          >
            <Button
              type="primary"
              block
              style={{ marginBottom: 16 }}
              onClick={() => navigate("/users")}
            >
              Manage Users
            </Button>
            <Button block style={{ marginBottom: 16 }}>
              View Logs
            </Button>
            <Button block>Settings</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
