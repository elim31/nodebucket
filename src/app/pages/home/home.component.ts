/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 2 Sept 2021
 * Title: home.component.ts
 */

 import { Component, OnInit } from '@angular/core';
 import { MatDialog } from '@angular/material/dialog';
 import { CookieService } from 'ngx-cookie-service';
 import { Employee } from '../../shared/models/employee.interface';
 import { Item } from '../../shared/models/item.interface';
 import { TaskService } from '../../shared/services/task.service';
 import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';
 import { CdkDragDrop,  moveItemInArray,  transferArrayItem,} from '@angular/cdk/drag-drop';

 @Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
 })
 export class HomeComponent implements OnInit {
   employee: Employee;
   todo: Item[];
   done: Item[];
   empId: number;

   constructor(
     private taskService: TaskService,
     private cookieService: CookieService,
     private dialog: MatDialog
   ) {
     this.empId = parseInt(this.cookieService.get('session_user'), 10);

     /**
      * Make a call to our taskService function findAllTasks
      */

     this.taskService.findAllTasks(this.empId).subscribe(res => {
         //response back from the api call
         console.log('--Server response from findAllTasks API--');
         console.log(res);

         this.employee = res; //bind to employee object

         console.log('--Employee object--'); //console.log messages for error troubleshooting
         console.log(this.employee);
       }, (err) => {                           //error handling
         console.log('--Server error--');
         console.log(err);
       },
       () => {
         console.log('--onComplete of the findAllTasks service call--');

         this.todo = this.employee.todo;
         this.done = this.employee.done;

         console.log('--Todo tasks--');
         console.log(this.todo);

         console.log('--Done tasks--');
         console.log(this.done);
       }
     );
   }

   ngOnInit(): void {}

   openCreateTaskDialog() {
     // opens new dialog window to add new task
     const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
       disableClose: true,
     });

     dialogRef.afterClosed().subscribe((data) => {     //add new task call after closed dialog
       if (data) {
         this.taskService.createTask(this.empId, data.text).subscribe(res => {
             //response from database
             this.employee = res;
           },
           err => {
             //error handling
             console.log('--onError of the creatTasks service call--');
             console.log(err);
           },
           () => {
             this.todo = this.employee.todo; //rebind the response data from createTask if successful call
             this.done = this.employee.done;
           }
         );
       }
     });
   }
   /**
    * Drag and drop function. Reorganizing the array in the container data when an item is moved.
    * Reordering items within the current array. need to know the previous item index to update the array
    */

   drop(event: CdkDragDrop<any[]>) {
     if (event.previousContainer === event.container) {
       moveItemInArray(
         event.container.data,
         event.previousIndex,
         event.currentIndex
       );

       console.log('Reordered the existing list of task items.');

       this.updateTaskList(this.empId, this.todo, this.done);  //updates the list of new items in todo list
     } else {
       //transferring items in the two arrays. containers are the arrays
       transferArrayItem(
         event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex
       );

       console.log('Moved task item into the other container');

       this.updateTaskList(this.empId, this.todo, this.done); //updates the list of new items in todo list
     }
   }

   /**
    *
    * @param taskId
    * Deleting a task and asking for confirmation before doing so
    */

   deleteTask(taskId: string): void
   {
     /**
      * pop up box to confirm delete action
      */
     if (confirm('Are you sure you want to delete this task?'))
     {
       if (taskId)
       {
         //get a task id before calling api
         console.log(`Task item: ${taskId} was deleted`);

         this.taskService.deleteTask(this.empId, taskId).subscribe((res) => {
             this.employee = res.data; //.data from base response
           }, (err) => {           //error handling
             console.log(err);
           },   () => {        //successful call to the server
             this.todo = this.employee.todo;
             this.done = this.employee.done;
           });
       }
     }
   }

   /**
    * @param empId
    * @param todo
    * @param done
    * single function for updateTask calls.
    */
   private updateTaskList(empId: number, todo: Item[], done: Item[]): void {
     this.taskService.updateTask(this.empId, this.todo, this.done).subscribe((res) => {
         this.employee = res.data; //.data from base response
       },
       (err) => {   //error handling
         console.log(err);
       },
       () => {    //successful call to the server
         this.todo = this.employee.todo;
         this.done = this.employee.done;
       });
   }
 }
