/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 25 Aug 2021
 * Title: home.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { TaskService } from '../../shared/services/task.service';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'),10);

    /**
     * Make a call to our taskService function findAllTasks
     */

    this.taskService.findAllTasks(this.empId).subscribe(res =>{  //response back from the api call
      console.log( '--Server response from findAllTasks API--');
      console.log(res);

      this.employee= res; //bind to employee object

      console.log('--Employee object--');   //console.log messages for error troubleshooting
      console.log(this.employee);
    }, err=> {
      console.log('--Server error--');
      console.log(err);
    }, () => {
      console.log('--onComplete of the findAllTasks service call--')

      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('--Todo tasks--');
      console.log(this.todo);

      console.log('--Done tasks--');
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  openCreateTaskDialog(){  // opens new dialog window to add new task
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data=> {
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res =>{ //response from database
          this.employee = res;
        }, err =>{    //error handling
          console.log('--onError of the creatTasks service call--');
          console.log(err);
        }, () => {
          this.todo = this.employee.todo; //rebind the response data from createTask call
          this.done = this.employee.done;
        })
      }
    })
  }
}
