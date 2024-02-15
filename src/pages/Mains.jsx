import React from "react";
import "./main.css";
import Header from "../Components/Header";
import Feeftwo from "../Components/Feeftwo";

function Mains() {
  return (
    <div style={{ minHeight: "800px" }} className="cl">
      <Header />

      <div>
        <Feeftwo/>
      </div>
    </div>
  );
}

export default Mains;
