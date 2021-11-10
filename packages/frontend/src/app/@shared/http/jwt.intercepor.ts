import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/@services/credentials.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.credentialsService.isAuthenticated()) {
      const currentToken = this.credentialsService.credentials?.token;
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${currentToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
