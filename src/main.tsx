import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Movies from "./pages/Movies.tsx";

import { MantineProvider } from "@mantine/core";

import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import axios from "axios";
import Movie from "./pages/Movie.tsx";
import Genres from "./pages/Genres.tsx";
import Genre from "./pages/Genre.tsx";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDRkMDVlNzlmM2U3NjVjYmM3M2IyN2ZmMWEzZDEyNiIsInN1YiI6IjYyYjlhYjBmMzU2YTcxMDA2MWRiN2I2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B7UyrZVqJRbKPFTnqQMnMKwUxWMZZwLdJEq3x4ivlYw";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movies/:id",
    element: <Movie />,
  },
  {
    path: "/genres",
    element: <Genres />,
  },
  {
    path: "/genres/:id",
    element: <Genre />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
