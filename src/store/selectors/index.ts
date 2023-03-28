import { useMemo } from 'react';
import appModel from '@/store/app';
import type { App } from '@/store/app';
import { useModel } from '@/store/util';

export const useCurrentChat = () => {
  const { currentChat, chats } = useModel(appModel);

  const ret = useMemo(() => {
    const r = chats.find(chat => chat.id === currentChat);
    return r || ({} as App['chats'][number]);
  }, [currentChat, chats]);

  return ret;
};
