import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Routes } from "./routes";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => setIsSideBarOpen(!isSideBarOpen);

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content">
        <Routes />
        <Sidebar isSideBarOpen={isSideBarOpen} />
      </div>
    </div>
  );
}

export default App;
