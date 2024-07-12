import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
function Layout() {
  return (
    <div className=''>
      <Header />
      <Outlet />
    </div>
  );
}

const appRouting=createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout /> ,
      // children:[
      //   {
      //     path: "/"
      //   }
      // ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={appRouting} />
  );
}

export default App
