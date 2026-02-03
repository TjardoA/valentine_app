import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SenderPage from "./pages/SenderPage.jsx";
import ValentinePage from "./pages/ValentinePage.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    { path: "/", element: <SenderPage /> },
    { path: "/valentine", element: <ValentinePage /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  />
);
