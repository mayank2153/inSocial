import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import toast, { Toaster } from 'react-hot-toast';
import 'react-notifications/lib/notifications.css';
import { Provider } from 'react-redux';
import { store } from './utils/store.jsx';
import { SocketProvider } from './components/context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
    <SocketProvider url={import.meta.env.VITE_BASE_URL} options={{withCredentials: true}}>
    <App />
    <Toaster
        toastOptions={{
          // Default toast options
          duration: 4000,
          // Styling for different toast types
          success: {
            style: {
              background: "#4caf50", // Green background for success
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#f44336", // Red background for error
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#ff9800", // Orange background for loading
              color: "#fff",
            },
          },
        }}
      />
    </SocketProvider>
    </Provider>
  </React.StrictMode>,
)
