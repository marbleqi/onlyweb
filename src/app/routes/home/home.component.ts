import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Layout, _HttpClient, SettingsService, MenuService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class HomeComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(_HttpClient);
  private readonly settingSrv = inject(SettingsService);
  private menuSrv = inject(MenuService);
  checked = true;
  constructor() {
    this.settingSrv.notify.subscribe(res => {
      console.debug('notify', res);
    });
  }

  ngOnInit(): void {
    console.debug('页面初始化');

    this.settingSrv.setLayout('hideAside', true);

    // this.settingSrv.setLayout({
    //   layout: Layout.Sidebar,
    //   sidebar: {
    //     theme: 'dark',
    //     collapsed: false
    //   }
    // });
  }
}
