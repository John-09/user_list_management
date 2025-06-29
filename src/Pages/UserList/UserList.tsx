import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store";
import {
  fetchUsers,
  createUser,
  editUser,
  deleteUser,
} from "../../Store/userSlice";
import { useEffect, useState } from "react";
import { Button, Input, Table, Pagination, Row, Col, Modal, Grid } from "antd";
import { Plus, Columns, LayoutGrid } from "lucide-react";
import UserCard from "./UserCard";
import { getUserTableColumns } from "../../Constants/userTableColumns";
import { ReusableForm } from "../../Components/ReusableForm";
import { userFormFields } from "../../Constants/FormFields";
import { useUserToasts } from "../../Constants/userToasts";
import { filterUsers } from "../../utils/UserUtils";
import toast from "react-hot-toast";
import type { User } from "../../Interface/UserInterface";

const { Search: AntSearch } = Input;
const { useBreakpoint } = Grid;

export const UserList = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserModal, setDeleteUserModal] = useState({
    visible: false,
    user: null as User | null,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { userList, loading, status, error } = useSelector(
    (state: RootState) => state.users
  );

  const screens = useBreakpoint();

  useUserToasts(status, error, localStorage.getItem("token"));

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeleteUserModal({ visible: true, user });
  };

  const confirmDelete = () => {
    if (deleteUserModal.user) {
      dispatch(deleteUser(deleteUserModal.user.id))
        .unwrap()
        .then(() => toast.success("User deleted successfully"))
        .catch(() => toast.error("User deletion failed"))
        .finally(() => setDeleteUserModal({ visible: false, user: null }));
    }
  };

  const handleFormSubmit = (values: any) => {
    if (editingUser) {
      dispatch(editUser({ id: editingUser.id, ...values }));
    } else {
      dispatch(createUser(values));
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const tableColumns = getUserTableColumns(handleEditClick, handleDeleteClick);

  const filteredUsers = filterUsers(userList, searchText);

  return (
    <div
      style={{
        borderRadius: "8px",
        padding: !screens.xs ? "24px" : "0px",
        paddingLeft: !screens.xs ? "5vw" : "0vw",
        paddingRight: !screens.xs ? "5vw" : "0vw",
      }}
    >
      <style>
        {`
          .ant-table-cell {
            word-break: break-word;
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: screens.xs ? "column" : "row",
            alignItems: screens.xs ? "stretch" : "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            Users
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: screens.xs ? "column" : "row",
              alignItems: "stretch",
              gap: "8px",
              width: screens.xs ? "100%" : "auto",
            }}
          >
            <AntSearch
              placeholder="Input search text"
              allowClear
              style={{ width: screens.xs ? "100%" : 250 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => setShowModal(true)}
              block={screens.xs}
            >
              Create User
            </Button>
          </div>
        </div>

        {/* View toggle */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <Button
            type={viewMode === "table" ? "primary" : "default"}
            icon={<Columns size={16} />}
            onClick={() => setViewMode("table")}
            block={screens.xs}
          >
            Table
          </Button>
          <Button
            type={viewMode === "card" ? "primary" : "default"}
            icon={<LayoutGrid size={16} />}
            onClick={() => setViewMode("card")}
            block={screens.xs}
          >
            Card
          </Button>
        </div>

        {viewMode === "table" ? (
          <Table
            columns={tableColumns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={loading}
            pagination={false}
            scroll={{ x: "max-content", y: 450 }}
            style={{ marginBottom: "24px" }}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredUsers.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
                <UserCard
                  user={user}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </Col>
            ))}
          </Row>
        )}
        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            current={currentPage}
            total={filteredUsers.length}
            pageSize={10}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      </div>
      {/* Create & Edit user modal */}
      <Modal
        title={editingUser ? "Edit User" : "Create New User"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        footer={null}
      >
        <ReusableForm
          fields={userFormFields}
          initialValues={editingUser || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          submitText={editingUser ? "Update" : "Create"}
        />
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={deleteUserModal.visible}
        onOk={confirmDelete}
        onCancel={() => setDeleteUserModal({ visible: false, user: null })}
        okText="Delete"
        okType="danger"
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteUserModal.user?.first_name}</strong>?
        </p>
      </Modal>
    </div>
  );
};
