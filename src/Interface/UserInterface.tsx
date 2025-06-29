export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  name?: string;
  job?: string;
  updatedAt?: string;
  avatar: string;
}

export interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export interface UserState {
  userList: User[];
  loading: boolean;
  error: string | null;
  status:
    | "idle"
    | "fetch_loading"
    | "fetch_succeeded"
    | "fetch_failed"
    | "create_loading"
    | "create_succeeded"
    | "create_failed"
    | "edit_loading"
    | "edit_succeeded"
    | "edit_failed"
    | "delete_loading"
    | "delete_succeeded"
    | "delete_failed";
}
