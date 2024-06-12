import { Routes } from '@angular/router';

import { SettingAppComponent } from './app/app.component';
import { SettingUserComponent } from './user/user.component';

export const routes: Routes = [
  { path: 'app', component: SettingAppComponent },
  { path: 'user', component: SettingUserComponent }
];
