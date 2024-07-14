import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import Store from './utils/store.jsx';
function Layout() {
  return (
    <div  className="montserrat-medium">
      <Provider store={Store}>
      <Header />
      <Outlet />
      </Provider>

    </div>
  );
}

const appRouting=createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout /> ,
      children:[
        {
          path: "/login",
          element: <Login />
        }
      ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={appRouting} />
  );
}

export default App
