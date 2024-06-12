import { Injectable, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class SettingUserService {
  private readonly http = inject(_HttpClient);
}
