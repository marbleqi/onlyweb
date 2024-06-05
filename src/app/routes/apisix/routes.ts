import { Routes } from '@angular/router';

import {
  ApisixInstanceService,
  ApisixDashboardService,
  ApisixRouteService,
  ApisixSslService,
  ApisixInstanceComponent,
  ApisixDashboardComponent,
  ApisixRouteComponent,
  ApisixSslComponent,
  ApisixInstanceEditComponent,
  ApisixRouteEditComponent,
  ApisixSslEditComponent
} from '.';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [ApisixInstanceService, ApisixDashboardService, ApisixRouteService, ApisixSslService],
    children: [
      { path: '', redirectTo: 'instance', pathMatch: 'full' },
      { path: 'instance', component: ApisixInstanceComponent },
      { path: 'instance/add', component: ApisixInstanceEditComponent, data: { type: 'add' } },
      { path: 'instance/edit/:id', component: ApisixInstanceEditComponent, data: { type: 'edit' } },
      { path: 'instance/copy/:id', component: ApisixInstanceEditComponent, data: { type: 'copy' } },
      { path: 'dashboard/:iid', component: ApisixDashboardComponent },
      { path: 'route/:iid', component: ApisixRouteComponent },
      { path: 'route/:iid/add', component: ApisixRouteEditComponent, data: { type: 'add' } },
      { path: 'route/:iid/edit/:id', component: ApisixRouteEditComponent, data: { type: 'edit' } },
      { path: 'route/:iid/copy/:id', component: ApisixRouteEditComponent, data: { type: 'copy' } },
      { path: 'ssl/:iid', component: ApisixSslComponent },
      { path: 'ssl/:iid/add', component: ApisixSslEditComponent, data: { type: 'add' } },
      { path: 'ssl/:iid/edit/:id', component: ApisixSslEditComponent, data: { type: 'edit' } },
      { path: 'ssl/:iid/copy/:id', component: ApisixSslEditComponent, data: { type: 'copy' } }
    ]
  }
];
