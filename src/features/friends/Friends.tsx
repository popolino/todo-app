import React, { useEffect, useState } from "react";
import "src/assets/scss/global.scss";
import classes from "./Friends.module.scss";
import Friend from "./friend/Friend";
import clsx from "clsx";

import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import {
  addFriendAsync,
  deleteFriendAsync,
  fetchFriends,
  friendsActions,
} from "./Friends.slice";
import Pending from "./pending/Pending";
import Outgoing from "./outgoing/Outgoing";
import { useSnackbar } from "notistack";
import { TTask } from "../main/tasks/Tasks.types";
import { TUser } from "./Friends.types";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { getUsers } from "./friends.utils";
const allActions = {
  deleteFriendAsync,
  addFriendAsync,
  fetchFriends,
  ...friendsActions,
};

const Friends = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const users = useAppSelector((state) => state.friendsReducer.users);
  const message = useAppSelector((state) => state.friendsReducer.message);
  const status = useAppSelector((state) => state.friendsReducer.status);

  const handleDelete = (id: string) => boundActions.deleteFriendAsync(id);
  const addFriend = (id: string) => boundActions.addFriendAsync(id);

  useEffect(() => {
    boundActions.fetchFriends();
  }, []);
  useEffect(() => {
    message &&
      enqueueSnackbar(message, {
        variant: status !== "failed" ? "info" : "error",
      });
  }, [message]);
  return (
    <div className="main-container">
      <div className="container">
        <div className="chapter">Friends</div>
        <div className={clsx(classes["send-pending"], "module")}>
          <input type="text" placeholder="Enter user email" />
          <button className="blue-button">Send request</button>
        </div>
        <div className="title">PENDING</div>
        <TransitionGroup>
          {getUsers(users, "pending").length > 0 ? (
            getUsers(users, "pending").map((pending) => (
              <Collapse key={pending.id}>
                <Pending
                  name={`${pending.name} ${pending.surname}`}
                  picture={pending.picture}
                  onAddFriend={() => addFriend(pending.id)}
                  onDelete={() => handleDelete(pending.id)}
                />
              </Collapse>
            ))
          ) : (
            <Collapse>
              <div>no data</div>
            </Collapse>
          )}
        </TransitionGroup>
        <div className="title">OUTGOING</div>
        <TransitionGroup>
          {getUsers(users, "outgoing").length > 0 ? (
            getUsers(users, "outgoing").map((outgoing) => (
              <Collapse key={outgoing.id}>
                <Outgoing
                  name={`${outgoing.name} ${outgoing.surname}`}
                  picture={outgoing.picture}
                  onClick={() => handleDelete(outgoing.id)}
                />
              </Collapse>
            ))
          ) : (
            <Collapse>
              <div>no data</div>
            </Collapse>
          )}
        </TransitionGroup>
        <div className="title">FRIENDS</div>
        <TransitionGroup>
          {getUsers(users, "friends").length > 0 ? (
            getUsers(users, "friends").map((friend) => (
              <Collapse key={friend.id}>
                <Friend
                  name={`${friend.name} ${friend.surname}`}
                  picture={friend.picture}
                  onClick={() => handleDelete(friend.id)}
                />
              </Collapse>
            ))
          ) : (
            <Collapse>
              <div>no data</div>
            </Collapse>
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Friends;
