import Models from './models';
import Input from './input';
import style from './style.less';

const Prompt = () => (
  // console.log(1111);

  <div className={style['prompt-container']}>
    <Models />
    <h1 className="bg">AI Bot</h1>
    <Input />
  </div>
);
export default Prompt;
