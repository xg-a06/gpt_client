import type { KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';
// import { SendOutlined } from '@ant-design/icons';
import { Button, Input as Temp } from 'antd';
import style from './style.less';

const { TextArea } = Temp;

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
          {/* <SendOutlined /> */}
          <Dot />
        </Button>
      </div>
    </div>
  );
};

export default Input;
