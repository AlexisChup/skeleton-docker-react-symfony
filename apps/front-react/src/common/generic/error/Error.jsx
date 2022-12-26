import React from "react";
import "./Error.css";
import { FaHouseUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Error() {
  let navigate = useNavigate();

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div>
          <h1>Error 404: Page not found</h1>
        </div>
        <div>
          <Button size="sm" onClick={() => navigate("/")}>
            <FaHouseUser className="mr-1" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
