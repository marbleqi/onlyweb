import { Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { SettingUserService } from './user.service';

@Component({
  selector: 'app-setting-user',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './user.component.html',
  providers: [SettingUserService]
})
export class SettingUserComponent implements OnInit {
  private readonly http = inject(_HttpClient);

  ngOnInit(): void {
    console.debug('SettingUserComponent');
  }
}
