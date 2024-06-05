import { Injectable, inject } from '@angular/core';
import { MenuService, SettingsService } from '@delon/theme';

@Injectable()
export class ApisixInstanceService {
  private settingSrv = inject(SettingsService);

  private menuSrv = inject(MenuService);

  id!: number;

  type!: 'route' | 'ssl';

  dataMap: Map<number, any>;

  /**构造函数 */
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

  /**获取实例列表 */
  index(): any[] {
    return Array.from(this.dataMap.values()).sort((a, b) => a.id - b.id);
  }

  /**获取实例详情 */
  show(id: number): any {
    return this.dataMap.get(id);
  }

  /**创建实例 */
  create(value: any) {
    const data = Array.from(this.dataMap.keys()).filter(item => !!item && typeof item === 'number');
    const id = data.length ? Math.max(...data) + 1 : 1;
    this.dataMap.set(id, { ...value, create_at: Date.now(), update_at: Date.now(), id });
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }

  /**更新实例 */
  update(id: number, value: any) {
    this.dataMap.set(id, { ...value, update_at: Date.now() });
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }

  /**删除实例 */
  remove(id: number) {
    this.dataMap.delete(id);
    localStorage.setItem('apisix', JSON.stringify(Array.from(this.dataMap.values())));
  }
}
