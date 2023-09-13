import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaShare, FaRegCommentAlt } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import "./card.css";
// import { types } from "util";

export const Card = ({ post, socket, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (type) => {
    // setIsLiked(!isLiked);
    setIsLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        <div className="cardIcon" onClick={() => handleLikeClick(1)}>
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
        </div>
        <div className="cardIcon" onClick={() => handleLikeClick(2)}>
          <FaRegCommentAlt />
        </div>
        <div className="cardIcon" onClick={() => handleLikeClick(3)}>
          <FaShare />
        </div>
        <div className="cardIcon infoIcon" onClick={() => handleLikeClick(4)}>
          <GrCircleInformation />
        </div>
      </div>
    </div>
  );
};
