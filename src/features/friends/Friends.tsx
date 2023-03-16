import React from "react";
import "src/assets/scss/global.scss";
import classes from "./Friends.module.scss";
import Friend from "./friend/Friend";
import clsx from "clsx";
import Pending from "./request/Pending";
import Outgoing from "./outgoing/Outgoing";
import { friends, pending, outgoing } from "./Friends.mock";

const Friends = () => {
  return (
    <div className="main-container">
      <div className="container">
        <div className="chapter">Friends</div>
        <div className={clsx(classes["send-request"], "module")}>
          <input type="text" placeholder="Enter user email" />
          <button className="blue-button">Send request</button>
        </div>
        <div className="title">PENDING</div>
        {pending.map((pending) => (
          <Pending
            key={pending.id}
            name={`${pending.name} ${pending.surname}`}
          />
        ))}{" "}
        <div className="title">OUTGOING</div>
        {outgoing.map((outgoing) => (
          <Outgoing
            key={outgoing.id}
            name={`${outgoing.name} ${outgoing.surname}`}
          />
        ))}
        <div className="title">FRIENDS</div>
        {friends.map((friend) => (
          <Friend key={friend.id} name={`${friend.name} ${friend.surname}`} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
