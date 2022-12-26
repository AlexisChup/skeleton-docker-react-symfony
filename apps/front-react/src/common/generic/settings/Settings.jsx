import React, { useState } from "react";

import Logout from "../logout/Logout";
import "./Settings.css";
import ResetPassword from "./reset-password/ResetPassword";

export default function Settings() {
  let [isRequesting, setIsRequesting] = useState(false);

  return (
    <div className="">
      <h2>Settings</h2>
      <ResetPassword
        isRequesting={isRequesting}
        setIsRequesting={setIsRequesting}
      />
      <Logout isRequesting={isRequesting} />
    </div>
  );
}
