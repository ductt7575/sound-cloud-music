import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import UsersPage from "./screens/users.page.tsx";

import "./App.scss";
import LayoutAdmin from "./components/layout/LayoutAdmin/index.tsx";
import CommentsPage from "./screens/comments.page.tsx";
import TracksPage from "./screens/tracks.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tracks",
        element: <TracksPage />,
      },
      {
        path: "comments",
        element: <CommentsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
