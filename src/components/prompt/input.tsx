/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC, KeyboardEvent } from 'react';
import type { TextAreaRef } from 'rc-textarea';
import type { Updater } from 'use-immer';
import type { Chat, Dialogue } from '@/store/app';
import { useState, useEffect, useRef, memo } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Button, Input as Temp } from 'antd';
import { getAnswer } from '@/services/api/stream';
import style from './style.less';

const { TextArea } = Temp;

type PropTypes = {
  handleChange: Updater<Chat>;
};

const Dot = () => {
  const dotsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const intervalId = setInterval(
      (function target() {
        dotsRef.current.forEach((dot, index) => {
          setTimeout(() => {
            dot.classList.remove('invisible');
          }, 500 * (index + 1));
        });
        dotsRef.current.forEach(dot => {
          dot.classList.add('invisible');
        });
        return target;
      })(),
      1500,
    );

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={style.loading_wrap}>
      <div className="loading">
        <span>·</span>
        <span ref={el => (dotsRef.current[0] = el!)} className="dot invisible">
          ·
        </span>
        <span ref={el => (dotsRef.current[1] = el!)} className="dot invisible">
          ·
        </span>
      </div>
    </div>
  );
};

const Input: FC<PropTypes> = ({ handleChange }) => {
  const [fetching, setFetching] = useState(false);

  const txt = useRef<TextAreaRef>(null);

  const clickHandler = () => {
    const value = txt.current?.resizableTextArea?.textArea?.value;
    if (value && !fetching) {
      setTimeout(() => {
        txt.current!.resizableTextArea!.textArea!.value = '';
      }, 100);
      handleChange(draft => {
        draft.dialogues.push({ role: 'user', content: value });
      });
      handleChange(draft => {
        draft.dialogues.push({ role: 'assistant', content: '' });
      });
      setFetching(true);
      getAnswer(value).then(res => {
        if (!res) {
          // 处理错误
        } else {
          const getStream = (reader: ReadableStreamDefaultReader<Uint8Array>) =>
            reader.read().then(result => {
              // 如果数据已经读取完毕，直接返回
              if (result.done) {
                setFetching(false);
                return;
              }
              // 取出本段数据（二进制格式）
              const chunk = result.value;
              const decoder = new TextDecoder('utf-8');
              const text = decoder.decode(chunk);
              handleChange(draft => {
                const { length } = draft.dialogues;
                draft.dialogues[length - 1].content += text;
              });
              getStream(reader);
            });
          getStream(res);
        }
      });
    }
  };

  const pressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      clickHandler();
    }
  };

  return (
    <div className={style['input-container']}>
      <div className="input-wrapper">
        <TextArea ref={txt} bordered={false} autoSize={{ minRows: 1, maxRows: 8 }} onPressEnter={pressEnterHandler} />
        <Button className="input-icon" onClick={clickHandler}>
          {fetching ? <Dot /> : <SendOutlined />}
        </Button>
      </div>
    </div>
  );
};

export default memo(Input);
