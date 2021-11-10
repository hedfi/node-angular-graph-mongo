import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';

import { CredentialsService } from './credentials.service';
import { SIGN_IN, SIGN_UP } from '@app/@apollo/user';
import { LoginContext, signIn, SignInContext, signUp } from '@app/@models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router, private apollo: Apollo, private credentialsService: CredentialsService) {}

  login(context: LoginContext) {
    return this.apollo
      .mutate({
        mutation: SIGN_IN,
        variables: {
          email: context.email,
          password: context.password,
        },
      })
      .pipe(
        map((result) => {
          const currentData = result.data as signIn;
          this.credentialsService.setCredentials(currentData.signIn, true);
          return of(currentData.signIn);
        })
      );
  }
  signUp(context: SignInContext) {
    return this.apollo
      .mutate({
        mutation: SIGN_UP,
        variables: {
          email: context.email,
          password: context.password,
          firstName: context.firstName,
          lastName: context.lastName,
        },
      })
      .pipe(
        map((result) => {
          const currentData = result.data as signUp;
          this.credentialsService.setCredentials(currentData.signUp, true);
          return of(currentData.signUp);
        })
      );
  }

  logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    this.router.navigate(['/sign-in']);
    return of(true);
  }
}
