import { Injectable, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable, Subject, map, pipe } from 'rxjs';

import { ApisixInstanceService } from '..';

@Injectable()
export class ApisixSslService {
  private readonly http = inject(_HttpClient);
  private readonly instanceSrv = inject(ApisixInstanceService);

  /**
   * 获取证书列表
   * @param iid 实例ID
   * @returns 路由列表
   */
  index(iid: number): Observable<any> {
    const instance = this.instanceSrv.show(iid);
    return this.http.get(`${instance.url}/apisix/admin/ssls`, {}, { headers: { 'X-API-KEY': instance.key } });
  }

  show(iid: number, id: string): Observable<any> {
    const instance = this.instanceSrv.show(iid);
    return this.http.get(`${instance.url}/apisix/admin/ssls/${id}`, {}, { headers: { 'X-API-KEY': instance.key } });
  }

  create(iid: number, value: any): Observable<any> {
    const instance = this.instanceSrv.show(iid);
    return this.http.post(`${instance.url}/apisix/admin/ssls`, value, {}, { headers: { 'X-API-KEY': instance.key } });
  }

  update(iid: number, id: string, value: any): Observable<any> {
    const instance = this.instanceSrv.show(iid);
    return this.http.patch(`${instance.url}/apisix/admin/ssls/${id}`, value, {}, { headers: { 'X-API-KEY': instance.key } });
  }

  remove(iid: number, id: string): Observable<any> {
    const instance = this.instanceSrv.show(iid);
    return this.http.delete(`${instance.url}/apisix/admin/ssls/${id}`, {}, { headers: { 'X-API-KEY': instance.key } });
  }
}
