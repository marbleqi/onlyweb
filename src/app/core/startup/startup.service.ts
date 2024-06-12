import { APP_INITIALIZER, Injectable, Provider, inject } from '@angular/core';
import { SettingsService, TitleService } from '@delon/theme';
import { Observable, of } from 'rxjs';

export function provideStartup(): Provider[] {
  return [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.load(),
      deps: [StartupService],
      multi: true
    }
  ];
}

@Injectable()
export class StartupService {
  private settingSrv = inject(SettingsService);
  private titleSrv = inject(TitleService);

  load(): Observable<void> {
    let app: any = this.settingSrv.getData('app');
    if (app) {
      this.settingSrv.setApp(app);
      this.titleSrv.suffix = app.name;
    } else {
      this.settingSrv.setApp({
        name: `运维小工具`,
        description: `纯浏览器版运维工具`,
        create_at: Date.now(),
        update_at: Date.now()
      });
      this.titleSrv.suffix = '运维小工具';
    }
    let user: any = this.settingSrv.getData('user');
    if (user) {
      this.settingSrv.setUser(user);
    } else {
      this.settingSrv.setUser({
        name: '运维管理员',
        avatar: './assets/tmp/img/avatar.jpg',
        email: 'cipchk@qq.com',
        token: '123456789'
      });
    }
    // 设置标题后缀
    return of(undefined);
  }
}
