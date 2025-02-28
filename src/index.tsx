import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/index.scss';
import { App } from './components/app';// Подключаем главный компонент приложения

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(// Рендерим компонент в строгом режиме для выявления потенциальных проблем
    <StrictMode>
        <App />
    </StrictMode>
);
