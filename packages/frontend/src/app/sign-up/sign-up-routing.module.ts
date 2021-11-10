import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{ path: 'sign-up', component: SignUpComponent, data: { title: marker('Login') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SignUpRoutingModule {}
