import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { IGNORE_BASE_URL, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable, of, throwError, mergeMap } from 'rxjs';

import { ReThrowHttpError, checkStatus, getAdditionalHeaders } from './helper';

function handleData(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  checkStatus(injector, ev);
  // 业务处理：一些通用操作
  switch (ev.status) {
    case 200:
      break;
    case 401:
    case 403:
    case 404:
    case 500:
      break;
    default:
      if (ev instanceof HttpErrorResponse) {
        console.warn('未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng-alain.com/docs/server 解决跨域问题', ev);
      }
      break;
  }
  if (ev instanceof HttpErrorResponse) {
    return throwError(() => ev);
  } else if ((ev as unknown as ReThrowHttpError)._throw === true) {
    return throwError(() => (ev as unknown as ReThrowHttpError).body);
  } else {
    return of(ev);
  }
}

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  // 统一加上服务端前缀
  let url = req.url;
  if (!req.context.get(IGNORE_BASE_URL) && !url.startsWith('https://') && !url.startsWith('http://')) {
    const { baseUrl } = environment.api;
    url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
  }
  const newReq = req.clone({ url, setHeaders: getAdditionalHeaders(req.headers) });
  const injector = inject(Injector);

  return next(newReq).pipe(
    mergeMap(ev => {
      // 允许统一对请求错误处理
      if (ev instanceof HttpResponseBase) {
        return handleData(injector, ev, newReq, next);
      }
      // 若一切都正常，则后续操作
      return of(ev);
    })
    // catchError((err: HttpErrorResponse) => handleData(injector, err, newReq, next))
  );
};
