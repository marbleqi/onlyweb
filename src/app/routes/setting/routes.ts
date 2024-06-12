import { Routes } from '@angular/router';

import { SettingService, SettingUserComponent, SettingAppComponent } from '.';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    providers: [SettingService],
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: SettingUserComponent, data: { reuse: false } },
      { path: 'app', component: SettingAppComponent, data: { reuse: false } }
    ]
  }
];
