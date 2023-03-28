import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import style from './style.less';

interface PropTypes {
  children: string;
  language: string;
}

const CodeBlock: FC<PropTypes> = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (isCopied) {
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = children as string;
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={style['code-container']}>
      <div className="code-header">
        <span>{language}</span>
        {isCopied ? (
          <Button type="text" size="small" icon={<CheckOutlined />} onClick={copyToClipboard}>
            Copied!
          </Button>
        ) : (
          <Button type="text" size="small" icon={<CopyOutlined />} onClick={copyToClipboard}>
            Copy code
          </Button>
        )}
      </div>
      <SyntaxHighlighter style={oneDark} language={language} PreTag="div">
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
