import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent, NgbdModalContent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, ReactiveFormsModule, NgbModule],
  declarations: [HomeComponent, NgbdModalContent],
})
export class HomeModule {}
