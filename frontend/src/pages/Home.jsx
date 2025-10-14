import React from "react";
import { Navbar } from "../components/Navbar";

function Home() {
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Navbar></Navbar>
      </div>
    </div>
  );
}

export default Home;
