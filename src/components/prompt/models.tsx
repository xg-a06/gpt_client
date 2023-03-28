import type { FC } from 'react';
import type { Updater } from 'use-immer';
import type { SelectEventHandler } from 'rc-menu/lib/interface';
import type { App, Chat } from '@/store/app';
import { useState, useEffect, memo } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import style from './style.less';

type PropTypes = {
  models: App['models'];
  modelLabel: string;
  currentModel: string;
  handleChange: Updater<Chat>;
};

const Models: FC<PropTypes> = ({ models, modelLabel, currentModel, handleChange }) => {
  const [selected, setSelected] = useState([models[0]?.key || '']);

  useEffect(() => {
    if (currentModel) {
      setSelected([currentModel]);
    } else {
      handleChange(draft => {
        const [value] = selected;
        draft.model = value;
      });
    }
  }, [currentModel]);

  const selectHandler: SelectEventHandler = info => {
    handleChange(draft => {
      const [value] = info.selectedKeys;
      draft.model = value;
    });
  };

  return (
    <Button className={style['model-container']}>
      <Dropdown
        trigger={['click']}
        getPopupContainer={() => document.getElementsByClassName(style['model-container'])[0] as HTMLElement}
        menu={{
          items: models,
          selectable: true,
          selectedKeys: selected,
          onSelect: selectHandler,
        }}
      >
        <div className="select-label">
          <div className="select-tips">Model</div>
          {modelLabel}
          <DownOutlined />
        </div>
      </Dropdown>
    </Button>
  );
};

export default memo(Models);
