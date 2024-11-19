import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { IUserRole } from "../interfaces/user-role";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUserRole | null>(null);
  public readonly user$ = this.userSubject$.asObservable(); // если он нигде не используется зачем он тут нужен вообще?

  private user: IUserRole = {
    name: 'Ильнур',
    email: 'Ряжапов',
    isAdmin: null
  }

 public loginAsAdmin() {
    this.userSubject$.next({...this.user, isAdmin: true})
 };

  public loginAsUser() {
    this.userSubject$.next({...this.user, isAdmin: false})
  };

  public logout() {
    this.userSubject$.next(null)
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  // get isLogged() {
  //   return this.userSubject$.value !== null;
  // } ни где не используется, зачем он нужен ?

}