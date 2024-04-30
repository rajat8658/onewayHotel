import React from 'react'
import { useState, CSSProperties } from "react";
import RiseLoader from "react-spinners/RiseLoader";
const override= CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
function Loader() {
    
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div style={{marginTop:'280px'}}>
       <div className="sweet-loading text-center">
     

      <RiseLoader
        color="rgb(255,55,0)"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader
