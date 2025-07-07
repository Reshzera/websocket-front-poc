import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "../../pages/Chat";
import ChatTemplate from "../templates/ChatTemplate";

const router = createBrowserRouter([
  {
    element: <ChatTemplate />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
