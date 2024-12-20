import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgForOf } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { MatIcon } from "@angular/material/icon";
import { MatMiniFabButton } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CreateTodoDialogComponent } from "./create-todo-dialog/create-todo-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface  Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface CreateTodo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
}
@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    NgForOf,
    TodoCardComponent,
    AsyncPipe,
    CreateTodoDialogComponent,
    MatIcon,
    MatMiniFabButton,
    MatDialogModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService)
  readonly todosService = inject(TodosService)
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.todosApiService.getTodos().subscribe(
      (response: any) => {
        this.todosService.setTodos(response)
      }
    )

  }

  deleteTodo(id:number) {
    this.todosService.deleteTodo(id);
  }
  public editTodo(todo: Todo) {
    this.todosService.editTodo(todo)
  }

  public createTodo(formTodo: CreateTodo) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formTodo.title,
      userId: formTodo.userId,
      completed: formTodo.completed
    })
  }
  openCreateTodoDialog() {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((createResult: Todo) => {
      if (createResult) {
        this.createTodo(createResult)
      }
    })
  };
}

