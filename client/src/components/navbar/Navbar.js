import "./navbar.css";
import React, { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
export const Navbar = ({ socket }) => {
  const [notifications, setNotification] = useState([]);
  const [open,setOpen] = useState(false)

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared  ";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };
  const handleRead = () => {
    setNotification([]);
    setOpen(false)
  }

  return (
    <div className="navbar">
      <span className="logo">Dosthi</span>
      <div className="icons">
        <div className="icon" onClick={()=>setOpen(!open)}>
          <div className="iconImg">
            {" "}
            <GrNotification />
            {
              notifications.length > 0 &&
          <div className="counter">{notifications.length}</div>
            }
          </div>
        </div>
        <div className="icon" onClick={()=>setOpen(!open)}>
          <div className="iconImg">
            {" "}
            <BiMessageSquareAdd />
          </div>
          {/* <div className="counter">2</div> */}
        </div>
        <div className="icon" onClick={()=>setOpen(!open)}>
          <div className="iconImg">
            {" "}
            <IoIosSettings />
          </div>
          {/* <div className="counter">2</div> */}
        </div>
      </div>
      {open && (

        <div className="notifications">
        {notifications.map((n) => displayNotification(n))}
        <button className="button" onClick={handleRead}> Mark as read</button>
      </div>
        )}
    </div>
  );
};
