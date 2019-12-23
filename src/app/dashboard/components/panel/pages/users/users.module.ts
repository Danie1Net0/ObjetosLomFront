import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbListModule, NbSpinnerModule, NbUserModule } from '@nebular/theme';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { RequestsComponent } from './registration-requests/requests/requests.component';
import { ViewRequestComponent } from './registration-requests/view-request/view-request.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersEditComponent,
    RequestsComponent,
    ViewRequestComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NbCardModule,
    NbListModule,
    NbSpinnerModule,
    NbUserModule,
    NbIconModule,
  ]
})
export class UsersModule { }
