import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { manifest } from '@ant-design/icons-angular';
import { Layout, _HttpClient, SettingsService, MenuService } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class DashboardComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(_HttpClient);
  private readonly settingSrv = inject(SettingsService);
  private menuSrv = inject(MenuService);
  allIcons: string[];
  constructor() {
    this.settingSrv.notify.subscribe(res => {
      console.debug('notify', res);
    });
    this.allIcons = manifest['outline'].sort((a, b) => a.localeCompare(b));
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
