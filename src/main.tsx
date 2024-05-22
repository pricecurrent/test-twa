import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://pricecurrent.github.io/test-twa/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
