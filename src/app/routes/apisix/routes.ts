import { Routes } from '@angular/router';

import { ApisixInstanceService, ApisixInstanceComponent, ApisixInstanceEditComponent } from '.';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [ApisixInstanceService],
    children: [
      { path: '', redirectTo: 'instance', pathMatch: 'full' },
      { path: 'instance', component: ApisixInstanceComponent },
      { path: 'instance/add', component: ApisixInstanceEditComponent, data: { type: 'add' } },
      { path: 'instance/edit/:id', component: ApisixInstanceEditComponent, data: { type: 'edit' } },
      { path: 'instance/copy/:id', component: ApisixInstanceEditComponent, data: { type: 'copy' } }
    ]
  }
];
