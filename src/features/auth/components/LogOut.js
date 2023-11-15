import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { resetCartAfterLogout } from "../../cart/CartSlice";
import Cookies from "js-cookie";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  Cookies.remove("token");
  function clearTokenCookie() {
    Cookies.remove("jwt_token");
    dispatch(logoutUserAsync());
  }

  useEffect(() => {
    dispatch(resetCartAfterLogout());
    clearTokenCookie();
  });
  return <>{!user && <Navigate to="/login" replace={true} />}</>;
};

export default LogOut;
