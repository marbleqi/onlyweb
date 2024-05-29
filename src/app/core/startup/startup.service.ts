import { APP_INITIALIZER, Injectable, Provider, inject } from '@angular/core';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { Observable, of } from 'rxjs';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
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
  private menuSrv = inject(MenuService);
  private settingSrv = inject(SettingsService);
  private titleSrv = inject(TitleService);

  load(): Observable<void> {
    const app: any = {
      name: `NG-ALAIN`,
      description: `NG-ZORRO admin panel front-end framework`
    };
    // Application information: including site name, description, year
    this.settingSrv.setApp(app);
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789'
    };
    // User information: including name, avatar, email address
    this.settingSrv.setUser(user);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuSrv.add([
      {
        text: 'Main',
        group: false,
        children: [
          {
            text: 'Dashboard',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: 'APISIX',
            link: '/apisix',
            icon: { type: 'icon', value: 'appstore' }
          }
        ]
      }
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleSrv.suffix = app.name;
    return of(undefined);
  }
}
