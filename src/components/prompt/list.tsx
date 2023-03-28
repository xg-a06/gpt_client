import type { FC } from 'react';
import type { Dialogue } from '@/store/app';
import ReactMarkdown from 'react-markdown';
import rehypeMathjax from 'rehype-mathjax';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import CodeBlock from './codeBlock';
import style from './style.less';

// const markdown = `你好！有什么可以帮助你的吗？
// 用js实现一个斐波那契数列

// 当然可以，以下是用JavaScript实现斐波那契数列的一种方法：

// \`\`\`javascript
// function fibonacci(n) {
//   if (n === 0) return 0;
//   if (n === 1) return 1;

//   let fib1 = 0, fib2 = 1, result;
//   for (let i = 2; i <= n; i++) {
//     result = fib1 + fib2;
//     fib1 = fib2;
//     fib2 = result;
//   }

//   return result;
// }
// \`\`\`

// 你可以通过调用这个函数来计算斐波那契数列中任意一项的值。例如，如果你想计算斐波那契数列中第 10 个数字的值，你可以这样调用函数：

// \`\`\`javascript
// console.log(fibonacci(10)); // 输出：55
// \`\`\`

// 这将输出55

// 以下是一个简单的表格示例：

// | 水果 | 数量 | 价格 |
// | --- | --- | --- |
// | 苹果 | 10 | 2.5 元/个 |
// | 橙子 | 5 | 3 元/个 |
// | 香蕉 | 8 | 1.5 元/个 |

// 在这个表格中，第一列为水果的名称，第二列为每种水果的数量，第三列为每个水果的价格。表格使用了 Markdown 格式来创建，可以在 Markdown 编辑器中直接显示。
// `;
type PropTypes = {
  modelLabel: string;
  dialogues: Dialogue[];
};

const List: FC<PropTypes> = ({ modelLabel, dialogues }) => (
  <div className={style['list-container']}>
    <div className="select-tips">{modelLabel}</div>
    {dialogues.map((dialogue, index) => (
      <div key={index} className={`list-item list-item-${dialogue.role}`}>
        <div className="list-item-avatar">{dialogue.role === 'user' ? <UserOutlined /> : <RobotOutlined />}</div>
        <div className="list-item-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeMathjax]}
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? <CodeBlock language={match[1]}>{String(children).replace(/\n$/, '')}</CodeBlock> : <code className={className}>{children}</code>;
              },
              table({ children }) {
                return <table className="markdown-table">{children}</table>;
              },
              th({ children }) {
                return <th className="markdown-th">{children}</th>;
              },
              td({ children }) {
                return <td className="markdown-td">{children}</td>;
              },
            }}
          >
            {dialogue.content}
          </ReactMarkdown>
        </div>
      </div>
    ))}
  </div>
);

export default List;
