import { Avatar, Button, Space } from "antd";
import type { User } from "../Interface/UserInterface";

export function getUserTableColumns(
  handleUpdateUser: (user: User) => void,
  handleDelete: (user: User) => void
) {
  return [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      ellipsis: true,
      render: (avatar: string) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar size={40} src={avatar} />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (email: string) => (
        <span style={{ color: "#1890ff", cursor: "pointer" }}>{email}</span>
      ),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      ellipsis: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      ellipsis: true,
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleUpdateUser(record)}
            style={{ minWidth: "60px" }}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleDelete(record)}
            style={{ minWidth: "60px" }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
}
