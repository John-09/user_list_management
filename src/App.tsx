import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./Pages/Layout/BaseLayout";
import { UserList } from "./Pages/UserList/UserList";
import { Login } from "./Pages/Login/Login";
import { NotFound } from "./Pages/NotFound";
import { Provider } from "react-redux";
import { store } from "./Store";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <BaseLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "users",
          element: <UserList />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </Provider>
  );
}

export default App;
