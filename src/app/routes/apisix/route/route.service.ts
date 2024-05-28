import { Injectable, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable, Subject, map, pipe } from 'rxjs';

import { ApisixInstanceService } from '..';

@Injectable()
export class ApisixRouteService {
  private readonly http = inject(_HttpClient);
  private readonly instanceSrv = inject(ApisixInstanceService);

  /**
   * 获取实例列表
   */
  index(id: number): Observable<any> {
    const instance = this.instanceSrv.show(id);
    return this.http.get(`${instance.url}/apisix/admin/routes`, {}, { headers: { 'X-API-KEY': instance.key } });
  }
}
