/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 25 Aug 2021
 * Title: employee.interface.ts
*/


import {Item} from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
