"use client";

import React from "react";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions";

function Logout() {
  async function doLogout() {
    await logoutAction();
  }

  return <Button onClick={doLogout}>Logout</Button>;
}

export default Logout;
