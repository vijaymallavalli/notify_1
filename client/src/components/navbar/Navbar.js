import "./navbar.css";
import React, { useEffect,useState } from "react";
import { GrNotification } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
export const Navbar = ({socket}) => {
  const[notifications,setNotification] = useState([])

  useEffect(()=> {
     socket.on("getNotification",data=> {
      setNotification( (prev)=>[...prev,data]);
     });
  },[socket]);

  console.log(notifications);
  return (
    <div className="navbar">
      <span className="logo">Dosthi</span>
      <div className="icons">
        <div className="icon">
          <div className="iconImg">
            {" "}
            <GrNotification />
          </div>
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <div className="iconImg">
            {" "}
            <BiMessageSquareAdd />
          </div>
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <div className="iconImg">
            {" "}
            <IoIosSettings />
          </div>
          <div className="counter">2</div>
        </div>
      </div>
    </div>
  );
};
