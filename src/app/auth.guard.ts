import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
// import { UserService } from "./services/user.service";
import { Store } from "@ngrx/store";
import { selectIsAdmin } from "./users-list/store/users.selectors";
import { map, take } from "rxjs";


export const authGuard: CanActivateFn = () => {
  const store = inject(Store)
  const router = inject(Router)
  return store.select(selectIsAdmin).pipe(
    take(1),
    map((isAdmin) => {
      if (isAdmin) {
        return true;
      } else {
        return router.createUrlTree(['users']);
      }
    })
  )
};
