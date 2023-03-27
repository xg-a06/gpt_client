import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import style from './style.less';

const Chat = () => (
  <div className={style['chat-container']}>
    <Button icon={<PlusOutlined />}>New chat</Button>
  </div>
);

export default Chat;
