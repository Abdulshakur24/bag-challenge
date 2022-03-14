import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home/HomeScreen";
import Registration from "./Registration/Registration";
import { AnimatePresence } from "framer-motion";

function App() {
  const user = useSelector((state) => state.user.data);
  const navigator = useNavigate();
  const location = useLocation();

  // Redirect user to login page if not logged.
  useEffect(() => {
    if (!user) return navigator("/", { replace: true });
  }, [user, navigator]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route index path="/home/*" element={<Home />} />
        <Route path="/" element={<Registration />} />
        <Route path="*" element={<h1>Page not found.</h1>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
