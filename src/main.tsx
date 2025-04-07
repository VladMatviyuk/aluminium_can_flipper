import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { init, miniApp } from '@telegram-apps/sdk';

const initApp = async () => {
  try {
    await init();

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      miniApp.setHeaderColor('#10162b');
      console.log(`Mini app start!`)
    }
  } catch (err) {
    console.error(`Ошибка инициализации: ${err}`);
  }
}

initApp();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
