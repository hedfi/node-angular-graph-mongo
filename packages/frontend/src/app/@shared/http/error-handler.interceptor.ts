import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '@env/environment';
import { Logger } from '../../@services/logger.service';
import { AuthenticationService } from '@app/@services/authentication.service';
import { User } from '@app/@models/user';
import { Error } from '@app/@models/error';

const log = new Logger('ErrorHandlerInterceptor');
/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    const error = _.findIndex(response['error']['errors'], function (err: Error) {
      return err.message == 'You must be authorized.';
    });
    if (error !== -1) {
      this.authenticationService.logout();
    }
    if (response['error']['errors'].include)
      if (!environment.production) {
        // Do something with the error

        log.error('Request error', response);
      }
    throw response;
  }
}
