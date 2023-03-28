import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import style from './style.less';

const Chat = () => (
  <div className={style['chat-container']}>
    <Button disabled icon={<PlusOutlined />}>
      New chat(coming soon)
    </Button>
  </div>
);

export default Chat;
