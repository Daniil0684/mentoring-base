import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ITodo } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {
  readonly apiService = inject(HttpClient)

  private readonly jsonUrl  = 'https://jsonplaceholder.typicode.com/todos';
  getTodos() {
    return this.apiService.get<ITodo[]>(this.jsonUrl)
  }
}
