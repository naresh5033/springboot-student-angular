import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InstructorStudentGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe( 
      take(1),
      map((user) => {
        if ( // if the user role is instructor and no id in the route param then create a url for the instructor 
          user?.roles.includes('Instructor') &&
          Number(route.params['id']) !== user?.instructor?.instructorId
        ) {
          return this.router.createUrlTree([
            '/instructor-courses/' + user?.instructor?.instructorId,
          ]);
        } else if (
          user?.roles.includes('Student') &&
          Number(route.params['id']) !== user?.student?.studentId
        ) {
          return this.router.createUrlTree([
            '/student-courses/' + user?.student?.studentId,
          ]);
        }
        return true;
      })
    );
  }
}
