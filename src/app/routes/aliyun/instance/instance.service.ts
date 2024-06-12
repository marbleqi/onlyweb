import { Injectable, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AliyunInstanceService {
  private readonly http = inject(_HttpClient);
}
