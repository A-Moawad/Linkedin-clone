import { useState } from "react";
import Topbar from "../components/common/Topbar";
import Connections from "../Pages/Connections";

function ConnectionsLayout() {
  return (
    <div>
      <Topbar
      />
      <Connections />
    </div>
  );
}

export default ConnectionsLayout;
