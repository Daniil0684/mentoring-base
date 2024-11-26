import { IUser, IUserRole } from "../../interfaces/interfaces";
import { createSelector } from "@ngrx/store";

interface UserState {
  users: IUser[];
  currentUser: IUserRole | null
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users
)

export const selectCurrentUser = createSelector(
  selectUsersFeature,
  (state: UserState) => state.currentUser
)

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.isAdmin || false
)
// @ts-ignore
export const selectIsLogged = createSelector(
  selectCurrentUser,
  (currentUser) =>!!currentUser
)
