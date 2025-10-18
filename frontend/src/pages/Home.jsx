import React from "react";
import { Navbar } from "../components/Navbar";
import home from "../assets/home1.jpg";
function Home() {
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Navbar></Navbar>
        <img
          src={home}
          alt="IntelliLMS Home"
          className="object-cover md:object-fill w-[100%] lg-[100%] h-[50vh]"
        />
      </div>
    </div>
  );
}

export default Home;
