import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "../../pages/Chat";
import ChatTemplate from "../templates/ChatTemplate";
import ChatSocketIo from "../../pages/ChatSocketIO";

const router = createBrowserRouter([
  {
    element: <ChatTemplate />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
      {
        path: "/socket-io",
        element: <ChatSocketIo />,
      },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
