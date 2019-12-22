import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    loadChildren: () => import('./components/panel/pages/pages.module').then(module => module.PagesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
