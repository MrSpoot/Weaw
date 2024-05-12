import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./containers/login.container";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import RegisterContainer from "./containers/register.container";
import NotFoundContainer from "./containers/not-found.container";
import AppContainer from "./containers/app.container";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="flex bg-white w-screen h-screen">
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<AppContainer />} />
          <Route path="auth/login" element={<LoginContainer />} />
          <Route path="auth/register" element={<RegisterContainer />} />
          <Route path="*" element={<NotFoundContainer />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
