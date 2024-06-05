import type { SFWidgetProvideConfig } from '@delon/form';

import { AtWidget } from './at/at.widget';
import { ListWidget } from './list/list.widget';
import { TestWidget } from './test/test.widget';

export const SF_WIDGETS: SFWidgetProvideConfig[] = [
  { KEY: AtWidget.KEY, type: AtWidget },
  { KEY: ListWidget.KEY, type: ListWidget },
  { KEY: TestWidget.KEY, type: TestWidget }
];
