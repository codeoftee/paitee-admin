import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ConnectivityService} from '../../services/conn/connectivity.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private conn: ConnectivityService, private auth: AuthService, private router: Router) {
	}

	intercept(request, next) {
		// Handle response
		return next.handle(request).pipe(
			catchError(error => {
				console.log(error);
				// handle specific errors
				if (error.status === 401) {
					console.log('auth error intercept');
					this.auth.signOut();
					// this.router.navigate(['/login'])
					console.log('current token ', this.conn.jwt);
				}
				// default case: print, log, toast, etc...
				return throwError(error.message || error);
			})
		);
	}
}
