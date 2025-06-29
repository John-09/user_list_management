import React, { useState } from "react";
import { Card, Avatar, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UserCardProps } from "../../Interface/UserInterface";

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      hoverable
      bordered
      style={{ textAlign: "center", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Overlay actions on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <Tooltip title="Edit">
            <div
              onClick={() => onEdit(user)}
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <EditOutlined />
            </div>
          </Tooltip>

          <Tooltip title="Delete">
            <div
              onClick={() => onDelete(user)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <DeleteOutlined />
            </div>
          </Tooltip>
        </div>
      )}

      {/* User content */}
      <Space
        direction="vertical"
        align="center"
        size="middle"
        style={{ width: "100%" }}
      >
        <Avatar size={80} src={user.avatar} />
        <div>
          <h3 style={{ margin: 0, fontWeight: 600 }}>
            {user.first_name} {user.last_name}
          </h3>
          <p style={{ margin: 0, color: "#6b7280" }}>{user.email}</p>
        </div>
      </Space>
    </Card>
  );
};

export default UserCard;
