import { useMemo, useState } from 'react';
import Models from './models';
import Input from './input';
import List from './list';
import style from './style.less';

const Prompt = () => {
  const [message] = useState([1]);

  const renderItem = useMemo(
    () =>
      message.length === 0 ? (
        <>
          <Models />
          <h1 className="bg">AI Assistant</h1>
        </>
      ) : (
        <List />
      ),
    [message.length === 0],
  );

  return (
    <div className={style['prompt-container']}>
      {renderItem}
      <Input />
    </div>
  );
};
export default Prompt;
