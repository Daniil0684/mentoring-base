import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { YellowDirective } from "../directives/yellow.directive";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule, TooltipPosition } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { AuthComponent } from "../auth/auth.component";
// import { UserService } from "../services/user.service";
import { Store } from "@ngrx/store";
import { UsersActions } from "../users-list/store/users.actions";
import { IUserRole } from "../interfaces/interfaces"
import { Observable } from "rxjs";
import { selectIsAdmin } from "../users-list/store/users.selectors";

const aboutCompanyFn = (text: string) => text;

const aboutCompany = aboutCompanyFn('О компании');

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map(
  (item) => {
    return item.toUpperCase()
  }
)
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterOutlet,
    RouterLink,
    DatePipe,
    YellowDirective,
    MatIcon,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isShowCatalog = true;
  readonly headerNavItem1 = 'Главная';
  readonly headerNavItem2 = 'О компании';
  readonly headerNavItem3 = 'Каталог';
  readonly aboutCompany = aboutCompany;
  readonly today: Date = new Date()
  private readonly dialog = inject(MatDialog)
  // protected readonly userService = inject(UserService)
  private readonly store = inject(Store)
  menuItems = upperCaseMenuItems;
  isLowerCase = true;
  isAdmin$: Observable<boolean>;

  constructor() {
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      item => this.isLowerCase ? item.toLowerCase() : item.toUpperCase()
    )

    this.isLowerCase = !this.isLowerCase
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '300px', height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        // this.userService.loginAsAdmin()
        this.store.dispatch(UsersActions.loginAsAdmin({ user: { name: 'Admin', email: 'admin@example.com', isAdmin: true }}))
      } else if (result === 'user') {
        // this.userService.loginAsUser()
        this.store.dispatch(UsersActions.loginAsUser({ user: { name: 'Admin', email: 'admin@example.com', isAdmin: false }}))
      } else return
    });
  }

  public logout() {
    // this.userService.logout()
    this.store.dispatch(UsersActions.logout({ user: null}))
  }
}
