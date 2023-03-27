import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.global.css';
import App from './app';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(<App />);
