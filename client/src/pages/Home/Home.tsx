import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "src/redux/store";

function Home() {
  const { data: user } = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user) return;
    navigator("/", { replace: true });
  }, [user, pathname, navigator]);

  return <Outlet />;
}

export default Home;
