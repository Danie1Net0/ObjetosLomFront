import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent} from './users/users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersResolverGuard } from './users-resolver.guard';
import { RequestsComponent } from './registration-requests/requests/requests.component';
import { ViewRequestComponent } from './registration-requests/view-request/view-request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listar',
        component: UsersComponent
      },
      {
        path: 'editar/:id',
        component: UsersEditComponent,
        resolve: {
          user: UsersResolverGuard
        }
      },
      {
        path: 'solicitacoes',
        component: RequestsComponent
      },
      {
        path: 'solicitacoes/:id',
        component: ViewRequestComponent,
        resolve: {
          user: UsersResolverGuard
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
