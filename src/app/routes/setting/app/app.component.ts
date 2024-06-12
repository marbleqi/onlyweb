import { Component, OnInit, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';

import { SettingAppService } from './app.service';

@Component({
  selector: 'app-setting-app',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './app.component.html',
  providers: [SettingAppService]
})
export class SettingAppComponent implements OnInit {
  private readonly http = inject(_HttpClient);

  ngOnInit(): void {
    console.debug('SettingAppComponent');
  }
}
