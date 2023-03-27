import { useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import type { MenuItemType, SelectEventHandler } from 'node_modules/.pnpm/rc-menu@9.8.2_biqbaboplfbrettd7655fr4n2y/node_modules/rc-menu/lib/interface';
import style from './style.less';

type MenuItemTypeEx = MenuItemType & {
  key: string;
};
const items: MenuItemTypeEx[] = [
  {
    key: 'gpt-3.5-turbo',
    label: 'GTP-3.5',
  },
  {
    key: 'gpt-4',
    label: 'GTP-4(coming soon)',
    disabled: true,
  },
  {
    key: 'gpt-4-32k',
    label: 'GTP-4-32K(coming soon)',
    disabled: true,
  },
];

const Models = () => {
  const [selected, setSelected] = useState([items[0]!.key]);

  const selectLabel = useMemo(() => items.find(item => item.key === selected[0])?.label || '', [selected]);
  const selectHandler: SelectEventHandler = info => {
    setSelected(info.selectedKeys);
  };

  return (
    <Button className={style['model-container']}>
      <Dropdown
        trigger={['click']}
        getPopupContainer={() => document.getElementsByClassName(style['model-container'])[0] as HTMLElement}
        menu={{
          items,
          selectable: true,
          selectedKeys: selected,
          onSelect: selectHandler,
        }}
      >
        <div className="select-label">
          <div className="select-tips">Model</div>
          {selectLabel}
          <DownOutlined />
        </div>
      </Dropdown>
    </Button>
  );
};

export default Models;
