import type { Chat } from '@/store/app';
import { useMemo, memo } from 'react';
import { useImmer } from 'use-immer';
import appModel from '@/store/app';
import { useModel } from '@/store/util';
// import { useCurrentChat } from '@/store/selectors';
import Models from './models';
import Input from './input';
import List from './list';
import style from './style.less';

const Prompt = () => {
  const [chat, setChat] = useImmer<Chat>({ system: '', model: '', title: '', dialogues: [] } as unknown as Chat);

  const { models } = useModel(appModel);

  const modelLabel = useMemo(() => models.find(model => model.key === chat.model)?.label || '', [chat.model]);
  // const currentChat = useCurrentChat();

  // console.log(currentChat);

  const renderItem = useMemo(
    () =>
      chat.dialogues?.length > 0 ? (
        <List modelLabel={modelLabel} dialogues={chat.dialogues} />
      ) : (
        <>
          <Models models={models} modelLabel={modelLabel} currentModel={chat.model} handleChange={setChat} />
          <h1 className="bg">AI Assistant</h1>
        </>
      ),
    [chat],
  );

  return (
    <div className={style['prompt-container']}>
      {renderItem}
      <Input handleChange={setChat} />
    </div>
  );
};
export default memo(Prompt);
