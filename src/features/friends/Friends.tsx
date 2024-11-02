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
  fetchFriends,
  friendsActions,
  fetchRelationsAsync,
} from "./Friends.slice";
import Pending from "./pending/Pending";
import Outgoing from "./outgoing/Outgoing";
import { useSnackbar } from "notistack";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
const allActions = {
  deleteFriendAsync,
  acceptFriendAsync,
  fetchFriends,
  addFriendAsync,
  fetchRelationsAsync,
  ...friendsActions,
};

const Friends = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const friends = useAppSelector((state) => state.friendsReducer.friends);
  const pending = useAppSelector((state) => state.friendsReducer.pending);
  const outgoing = useAppSelector((state) => state.friendsReducer.outgoing);
  // const allUsers = useAppSelector((state) => state.friendsReducer.allUsers);
  const message = useAppSelector((state) => state.friendsReducer.message);
  const status = useAppSelector((state) => state.friendsReducer.status);

  const [searchInput, setSearchInput] = useState<string>("");

  const handleDelete = (id: string) => boundActions.deleteFriendAsync(id);
  const acceptFriend = (id: string) => boundActions.acceptFriendAsync(id);
  const addFriend = async (email: string) => {
    await boundActions.addFriendAsync(email).unwrap();
    setSearchInput("");
  };
  // useEffect(() => {
  //   boundActions.fetchFriends();
  //   boundActions.fetchAllUsersAsync();
  // }, []);

  useEffect(() => {
    boundActions.fetchRelationsAsync();
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
          {pending.map((user) =>
            pending.length > 0 ? (
              <Collapse key={user.id}>
                <Pending
                  name={`${user.name} ${user.surname}`}
                  picture={user.picture}
                  onAcceptFriend={() => acceptFriend(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              </Collapse>
            ) : (
              <Collapse>
                <div>no data</div>
              </Collapse>
            ),
          )}
        </TransitionGroup>
        <div className="title">OUTGOING</div>
        <TransitionGroup>
          {outgoing.map((user) =>
            outgoing.length > 0 ? (
              <Collapse key={user.id}>
                <Outgoing
                  name={`${user.name} ${user.surname}`}
                  picture={user.picture}
                  onClick={() => handleDelete(user.id)}
                />
              </Collapse>
            ) : (
              <Collapse>
                <div>no data</div>
              </Collapse>
            ),
          )}
        </TransitionGroup>
        <div className="title">FRIENDS</div>
        <TransitionGroup>
          {friends.map((user) =>
            friends.length > 0 ? (
              <Collapse key={user.id}>
                <Friend
                  name={`${user.name} ${user.surname}`}
                  picture={user.picture}
                  onClick={() => handleDelete(user.id)}
                />
              </Collapse>
            ) : (
              <Collapse>
                <div>no data</div>
              </Collapse>
            ),
          )}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Friends;
