/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 25 Aug 2021
 * Title: task.service.ts
*/


import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  /**
   * @param empId
   * @returns tasks of the signed in empId
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
}

