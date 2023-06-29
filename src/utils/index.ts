import { AnyAction } from "@reduxjs/toolkit";
import { colors, TColors } from "../consts/colors";
import { PendingAction, RejectedAction, FulfilledAction } from "../types";

export const getColor = (color: TColors) =>
  colors.find((clr) => clr.name === color)?.hex || "red";

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith("/pending");
export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith("/rejected");
export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => action.type.endsWith("/fulfilled");
