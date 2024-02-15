import React from "react";
import Feed from "../Components/Feed";
import Header from "../Components/Header";
import './main.css'

function Main() {
  return (
    
    <div style={{minHeight:'800px'}} className="cl">
    <Header/>
    
     <div>
        
      <Feed/>
    </div>
    </div>
   
  );
}

export default Main;
