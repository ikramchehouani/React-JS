import React, { useEffect, useState } from "react";
import Capsules from "./Component/capsules/capsules";
import Launches from "./Component/launches/launches";
import { TableProvider } from "./TableContext";
import CapsulesOffline from "./Component/capsules/capsulesOffline";
import LaunchesOffline from "./Component/launches/launchesOffline";

import "./App.css";

const App = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOfflineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("offline", handleOfflineStatus);
    window.addEventListener("online", handleOfflineStatus);

    return () => {
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOfflineStatus);
    };
  }, []);

  return (
    <div className="App">
      <TableProvider>
        {isOffline ? <CapsulesOffline /> : <Capsules />}
        {isOffline ? <LaunchesOffline /> : <Launches />}
      </TableProvider>
    </div>
  );
};

export default App;
