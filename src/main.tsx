import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import RootLayout from "./routes/layout-root";
import PostsPage from "./routes/posts";
import PostPage from "./routes/post";
import NewPostPage from "./routes/page-new-post";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <PostsPage />,
        children: [
          {
            path: "/posts/new",
            element: <NewPostPage />,
          },
        ],
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
        children: [
          {
            path: "/posts/:postId/edit",
            element: <NewPostPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
