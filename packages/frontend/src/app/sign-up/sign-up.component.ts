import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/@services/authentication.service';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  error: string | undefined;
  signUpForm!: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      ],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.signUpForm.controls;
  }
  signUp() {
    this.isLoading = true;
    if (this.signUpForm.invalid) {
      this.isLoading = false;
      return;
    }
    console.log(this.signUpForm.value);
    this.authenticationService
      .signUp(this.signUpForm.value)
      .pipe(
        finalize(() => {
          this.signUpForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials} successfully logged in`);
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }
}
