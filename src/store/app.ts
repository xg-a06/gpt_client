/* eslint-disable @typescript-eslint/no-unused-vars */
import createModel from '@/store/util';

type Model = {
  key: string;
  label: string;
  disabled: boolean;
};

type Dialogue = {
  role: 'user' | 'assistant';
  content: string;
};

type Chat = {
  id: string;
  title: string;
  model: string;
  system: string;
  dialogues: Dialogue[];
};

// type Chats = {
//   [key: string]: Chat;
// };

type Chats = Chat[];

interface Store {
  key: string;
  models: Model[];
  chats: Chats;
  currentChat: string;
  addChat(chat: Omit<Chat, 'id'>): void;
  removeChat(id: string): void;
  // updateTodo(id: number, value: boolean): void;
  // toggleFilter(filter: Filter): void;
}

let index = 1;
const model = createModel<Store>({
  key: 'app',
  models: [],
  chats: [],
  currentChat: '0',
  addChat(chat) {
    this.chats.push({
      ...chat,
      id: String(index++),
    });
  },
  removeChat(id) {
    this.chats = this.chats.filter(chat => chat.id !== id);
  },
  // removeTodo(id) {
  //   this.todos = this.todos.filter(todo => todo.id !== id);
  // },
  // updateTodo(id, value) {
  //   const todo = this.todos.find((todo: any) => todo.id === id);
  //   if (todo) {
  //     todo.completed = value;
  //   }
  // },
  // toggleFilter(filter) {
  //   this.filter = filter;
  // },
});

export default model;
