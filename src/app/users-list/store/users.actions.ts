import { createActionGroup, props } from "@ngrx/store";
import { IUser, IUserRole } from "../../interfaces/interfaces";

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'set': props<{ users: IUser[] }>(),
    'edit': props<{ user: IUser }>(),
    'create': props<{ user: IUser }>(),
    'delete': props<{ id: number }>(),
    'login As Admin': props<{ user: IUserRole }>(),
    'login As User': props<{ user: IUserRole }>(),
    'logout': props<{ user: null }>(),
  }
})
