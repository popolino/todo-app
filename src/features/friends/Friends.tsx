import React from "react";
import "src/assets/scss/global.scss";
import classes from "./Friends.module.scss";
import Request from "./request/Request";
import Friend from "./friend/Friend";
import clsx from "clsx";

type TRequests = {
  id: string;
  name: string;
};
const requests: TRequests[] = [
  { id: "1", name: "Peter Parker" },
  { id: "2", name: "Tony Soprano" },
  { id: "3", name: "Stan Lee" },
];
const friends: TRequests[] = [
  { id: "1", name: "Joy Mitchell" },
  { id: "2", name: "Richard Sapogov" },
  { id: "3", name: "Vlad is Love" },
  { id: "4", name: "Gordon Freeman" },
];

const Friends = () => {
  return (
    <div className="main-container">
      <div className="container">
        <div className="chapter">Friends</div>
        <div className={clsx(classes["send-request"], "module")}>
          <input type="text" placeholder="Enter user email" />
          <button className="blue-button">Send request</button>
        </div>
        <div className="title">REQUESTS</div>
        {requests.map((request) => (
          <Request key={request.id} name={request.name} />
        ))}
        <div className="title">FRIENDS</div>
        {friends.map((friend) => (
          <Friend key={friend.id} name={friend.name} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
