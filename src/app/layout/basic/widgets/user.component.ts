import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      <nz-avatar [nzSrc]="user.avatar" nzSize="small" class="mr-sm" />
      {{ user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/setting/app">
          <i nz-icon nzType="tool" class="mr-sm"></i>
          应用配置
        </div>
        <div nz-menu-item routerLink="/setting/user">
          <i nz-icon nzType="user" class="mr-sm"></i>
          个人设置
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...SHARED_IMPORTS]
})
export class HeaderUserComponent implements OnInit {
  /**cdr */
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly settingSrv = inject(SettingsService);

  user!: User;

  ngOnInit(): void {
    this.user = this.settingSrv.user;
    this.settingSrv.notify.subscribe(res => {
      if (res.type === 'user') {
        this.user = res.value;
        this.cdr.detectChanges();
      }
    });
  }
}
