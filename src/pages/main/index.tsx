import { Layout } from 'antd';
import Prompt from '@/components/prompt';
import Chat from '@/components/chat';
import style from './style.less';

const { Sider, Content } = Layout;

const Index = () => (
  <Layout className={style['layout-container']}>
    <Sider width="260" className="layout-left-slider">
      <Chat />
    </Sider>
    <Content className="layout-content">
      <Prompt />
    </Content>
  </Layout>
);

export default Index;
