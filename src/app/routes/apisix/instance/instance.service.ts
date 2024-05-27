import { Injectable, inject } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class ApisixInstanceService {
  dataMap: Map<number, any>;
  constructor() {
    this.dataMap = new Map<number, any>();
    const data = localStorage.getItem('apisix');
    const result = data ? (JSON.parse(data) as any[]) : [];
    if (result.length) {
      for (const item of result) {
        this.dataMap.set(item.id, item);
      }
    }
  }

  /**
   * 获取实例列表
   */
  index(): any[] {
    return Array.from(this.dataMap.values()).sort((a, b) => a.id - b.id);
  }

  show(id: number): any {
    return this.dataMap.get(id);
  }

  create(value: any) {
    const data = Array.from(this.dataMap.keys());
    const id = data.length ? Math.max(...data) + 1 : 1;
    console.debug('id', id);
    this.dataMap.set(id, { ...value, id });
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }

  update(id: number, value: any) {
    this.dataMap.set(id, value);
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }

  remove(id: number) {
    this.dataMap.delete(id);
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }
}
