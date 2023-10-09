import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoginContainer from "./containers/login.container";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundContainer from "./containers/not-found.container";
import SplashContainer from "./containers/splash.container";
import { RouteProvider } from "./providers/route.provider";
import LandingContainer from "./containers/landing.container";
import AppContainer from "./containers/app.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProvider>
        <LandingContainer />
      </RouteProvider>
    ),
  },
  {
    path: "/app",
    element: (
      <RouteProvider>
        <AppContainer />
      </RouteProvider>
    ),
  },
  {
    path: "/auth",
    element: (
      <RouteProvider>
        <LoginContainer />
      </RouteProvider>
    ),
  },
  {
    path: "/*",
    element: (
      <RouteProvider>
        <NotFoundContainer />
      </RouteProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="h-screen w-screen bg-[#203D5B]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
