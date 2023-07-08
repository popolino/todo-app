import React, { useEffect, useState } from "react";
import "src/assets/scss/global.scss";
import classes from "./Friends.module.scss";
import Friend from "./friend/Friend";
import clsx from "clsx";

import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import {
  acceptFriendAsync,
  addFriendAsync,
  deleteFriendAsync,
  fetchAllUsersAsync,
  fetchFriends,
  friendsActions,
} from "./Friends.slice";
import Pending from "./pending/Pending";
import Outgoing from "./outgoing/Outgoing";
import { useSnackbar } from "notistack";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { getUsers } from "./friends.utils";
const allActions = {
  deleteFriendAsync,
  acceptFriendAsync,
  fetchFriends,
  fetchAllUsersAsync,
  addFriendAsync,
  ...friendsActions,
};

const Friends = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const users = useAppSelector((state) => state.friendsReducer.users);
  const allUsers = useAppSelector((state) => state.friendsReducer.allUsers);
  const message = useAppSelector((state) => state.friendsReducer.message);
  const status = useAppSelector((state) => state.friendsReducer.status);

  const [searchInput, setSearchInput] = useState<string>("");

  const handleDelete = (id: string) => boundActions.deleteFriendAsync(id);
  const acceptFriend = (id: string) => boundActions.acceptFriendAsync(id);
  const addFriend = async (email: string) => {
    await boundActions.addFriendAsync(email).unwrap();
    setSearchInput("");
  };
  useEffect(() => {
    boundActions.fetchFriends();
    boundActions.fetchAllUsersAsync();
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
          <input
            type="text"
            placeholder="Enter user email"
            value={searchInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(event.target.value)
            }
          />
          <button
            className="blue-button"
            onClick={() => addFriend(searchInput)}
          >
            Send request
          </button>
        </div>
        <div className="title">PENDING</div>
        <TransitionGroup>
          {getUsers(users, "pending").length > 0 ? (
            getUsers(users, "pending").map((pending) => (
              <Collapse key={pending.id}>
                <Pending
                  name={`${pending.name} ${pending.surname}`}
                  picture={pending.picture}
                  onAcceptFriend={() => acceptFriend(pending.id)}
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
