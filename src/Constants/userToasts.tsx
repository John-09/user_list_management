import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useUserToasts = (status: string, error: string | null, token: string | null) => {
  useEffect(() => {
    if (!token) {
      toast.dismiss("users-toast");
      return;
    }

    switch (status) {
      case "fetch_loading":
        toast.loading("Loading users...", { id: "users-toast" });
        break;
      case "fetch_succeeded":
        toast.success("Users loaded successfully", { id: "users-toast" });
        break;
      case "fetch_failed":
        toast.error(error || "Failed to load users", { id: "users-toast" });
        break;
      case "create_succeeded":
        toast.success("User created successfully");
        break;
      case "create_failed":
        toast.error("User creation failed");
        break;
      case "edit_succeeded":
        toast.success("User updated successfully");
        break;
      case "edit_failed":
        toast.error("User update failed");
        break;
      case "delete_succeeded":
        toast.success("User deleted successfully");
        break;
      case "delete_failed":
        toast.error("User delete failed");
        break;
    }
  }, [status, error, token]);
};
