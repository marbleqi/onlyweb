import { Routes } from '@angular/router';

import { AliyunService } from './aliyun.service';
import { AliyunInstanceComponent } from './instance/instance.component';

export const routes: Routes = [{ path: 'instance', component: AliyunInstanceComponent }];
