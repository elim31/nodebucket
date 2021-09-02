/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 25 Aug 2021
 * Title: task.service.ts
*/


import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  /**
   * findAllTasks API calls the Node.js server URL /api/employees/:empID/tasks
   * @param empId
   * @returns 501 MongoDB Exception; 500 Server Exception; employee document with assigned task objects
   */
  findAllTasks(empId: number): Observable<any>{
    return this. http.get('/api/employees/' + empId + '/tasks'); //building the web address
  }

   /**
   *
   * @param empId
   * @param create task
   * @returns dialog box to create task for the signed in empId
   */
  createTask(empId: number, task: string): Observable<any>{

    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task  //employee-api.js passing the request
    })
  }

  /**
   *
   * @param empId
   * @param todo
   * @param done
   * @returns
   */
  updateTask(empId: number, todo: Item[], done: Item []): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}

