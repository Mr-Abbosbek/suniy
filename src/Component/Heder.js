import React, { useEffect } from "react";
import MyButton from "./UI/Button/MyButton";
// import { FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillMoonFill } from "react-icons/bs";

function Heder({selectMode}) {
  let bodyColor = document.querySelector("body");

  useEffect(() => {
    if (selectMode === true) {
      bodyColor.classList.add("bodyColor");
    } else {
      bodyColor.classList.remove("bodyColor");
    }
  }, [selectMode, bodyColor]);

  function BtnClick() {
    bodyColor.classList.toggle("bodyColor");
  }
  return (
    <div className="blog-container">
      <div className="d-flex px-xl-3 px-lg-0 px-md-0 px-sm-2 px-0 justify-content-xl-between justify-content-lg-between justify-content-md-between justify-content-sm-between flex-wrap align-items-center header-div">
        <h2><Link to='/' className="world fw-bold">Where in the world?</Link></h2>
        <MyButton className="pt-0 pb-0 border-0 darkBtn" onClick={BtnClick} style={{background: "#ffff"}}>
        <BsFillMoonFill className="luna" /> <span className="span1">Dark mode</span> <span className="span2">White mode</span>
        </MyButton>
      </div>
    </div>
  );
}

export default Heder;
