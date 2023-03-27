import type { KeyboardEvent } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Button, Input as Temp } from 'antd';
import style from './style.less';

const { TextArea } = Temp;
const Input = () => {
  const pressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className={style['input-container']}>
      <div className="input-wrapper">
        <TextArea bordered={false} autoSize={{ minRows: 1, maxRows: 8 }} onPressEnter={pressEnterHandler} />
        <Button className="input-icon">
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Input;
