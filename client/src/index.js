import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewDetails from "./pages/ViewDetails";
import Agents from "./pages/Agents";
import AddProperty from "./pages/AddProperty";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/view/:id" element={<ViewDetails />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/add-property" element={<AddProperty />} />
    </Routes>
  </BrowserRouter>
);
