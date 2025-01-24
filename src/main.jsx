// Main imports
import React from "react";  //? React library to build user interfaces with components.
import { BrowserRouter as Router } from "react-router"; //? Enables routing in your React app
import ReactDOM from "react-dom/client"; //? Provides methods to render React components into the DOM
import { StrictMode } from "react"; //? For better debugging

// CSS styles
import "./index.scss";
import "macro-css";

// App import
import App from "./App.jsx";

//? This is where the React app will be mounted and rendered.
const root = document.getElementById("root");

//? This initializes a React root for the root DOM element and starts rendering the React application.
ReactDOM.createRoot(root).render(
  <>
    <Router>
      <App />
    </Router>
  </>
);
