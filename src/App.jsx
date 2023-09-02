import { useState, lazy, Suspense, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const Home = lazy(() => import("./components/Home/Home"));
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./Page/Loader/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext } from "react";
import { useSelector } from "react-redux";
import PageNotFound from "./Page/pageNotFound/PageNotFound"
import ReportPage from "./components/ReportPage/ReportPage";

export const ReactContext = createContext();

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportPage />} />
            <Route
              exact
              path="*"
              element={<PageNotFound title="Page Not Found" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
