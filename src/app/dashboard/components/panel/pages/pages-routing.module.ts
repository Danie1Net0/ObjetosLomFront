import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../../shared/services/auth-guard';

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'objetos',
    loadChildren: () => import('./learning-objects/learning-objects.module').then(module => module.LearningObjectsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
