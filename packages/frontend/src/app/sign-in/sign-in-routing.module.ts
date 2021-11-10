import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { SignInComponent } from './sign-in.component';

const routes: Routes = [{ path: 'sign-in', component: SignInComponent, data: { title: marker('sign-in') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SignInRoutingModule {}
