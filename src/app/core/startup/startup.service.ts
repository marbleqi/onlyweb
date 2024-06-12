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
    let app: any = this.settingSrv.getApp();
    if (!app) {
      app = {
        name: `运维小工具`,
        description: `纯浏览器版运维工具`
      };
      this.settingSrv.setApp(app);
    }
    let user: any = this.settingSrv.getUser();
    if (!user) {
      user = {
        name: '运维管理员',
        avatar: './assets/tmp/img/avatar.jpg',
        email: 'cipchk@qq.com',
        token: '123456789'
      };
      this.settingSrv.setUser(user);
    }
    // 设置标题后缀
    this.titleSrv.suffix = app.name;
    return of(undefined);
  }
}
