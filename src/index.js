import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Home";
import About from "./About";
import Error from "./Error";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
