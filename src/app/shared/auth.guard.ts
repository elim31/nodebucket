/**
 * code attribution
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private router: Router, private cookieService: CookieService)
  {

  }
  /**
   *
   * @param route Code comments
   * @param state
   * @returns
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const sessionUser = this.cookieService.get('session_user');
    /** if returns object or data means user logged in */

    if (sessionUser)
    {
          return true; //user logged in
  }
  else
  {
    this.router.navigate(['/session/signin']);  //takes to sign in page if not authorized
    return false;
  }
  }

}
/** checking for cookie if auth or not. */
