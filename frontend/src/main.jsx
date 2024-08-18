import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <NotificationContainer />
  </React.StrictMode>,
)
