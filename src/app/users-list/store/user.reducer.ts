import { IUser, IUserRole } from "../../interfaces/interfaces";
import { createReducer, on } from "@ngrx/store";
import { UsersActions } from "./users.actions";

interface UserState {
  users: IUser[];
  currentUser: IUserRole | null
}

const initialState: UserState = {
  users: [],
  currentUser: null
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, payload) =>({
    ...state,
    users: payload.users,
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === payload.user.id ? payload.user : user
    )
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id)
  })),
  on(UsersActions.loginAsAdmin, (state, payload) => ({
    ...state,
    currentUser: { ...payload.user, isAdmin: true }
  })),
  on(UsersActions.loginAsUser, (state, payload) => ({
    ...state,
    currentUser: { ...payload.user, isAdmin: false }
  })),
  on(UsersActions.logout, (state, payload) => ({
    ...state,
    currentUser: null,
  }))
)
