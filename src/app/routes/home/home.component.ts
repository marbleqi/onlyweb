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
  hidden = false;
  moduleHidden: string[] = [];
  ngOnInit(): void {
    this.settingSrv.setLayout('hideAside', true);
    if (this.settingSrv.getData('moduleHidden')) {
      this.moduleHidden = this.settingSrv.getData('moduleHidden');
    } else {
      this.settingSrv.setData('moduleHidden', this.moduleHidden);
    }
  }

  getHiding(module: string): boolean {
    return this.moduleHidden.includes(module);
  }

  hideChange(module: string, hidden: boolean) {
    if (hidden) {
      this.moduleHidden.push(module);
    } else {
      this.moduleHidden = this.moduleHidden.filter(item => item !== module);
    }
    this.settingSrv.setData('moduleHidden', this.moduleHidden);
  }
}
