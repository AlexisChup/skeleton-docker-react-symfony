import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  let navigate = useNavigate();
  return (
    <footer>
      <div>
        <span>Copyright © 2022</span>
        <a onClick={() => navigate("/terms-of-service")}> Terms of Service </a>
        <a onClick={() => navigate("/privacy-and-cookies")}>
          Privacy and Cookies
        </a>
      </div>
    </footer>
  );
}
